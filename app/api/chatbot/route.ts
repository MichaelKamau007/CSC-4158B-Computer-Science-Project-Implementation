import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  searchProducts,
  getProductsByCategory,
  getFeaturedProducts,
  formatProductsForAI,
  getStoreContext,
  getCategories,
} from "@/lib/chatbotHelper";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { messages, userQuery } = await req.json();

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Gemini API key not configured. Please add GEMINI_API_KEY to your .env file.",
        },
        { status: 500 }
      );
    }

    // Get context about the store
    const storeContext = getStoreContext();

    // Try to detect if user is asking about products
    let productContext = "";
    const lastMessage = messages[messages.length - 1]?.content || userQuery || "";

    // Simple keyword detection for product queries
    const productKeywords = [
      "product",
      "buy",
      "purchase",
      "price",
      "laptop",
      "phone",
      "tablet",
      "gadget",
      "electronics",
      "show me",
      "looking for",
      "need",
      "want",
      "recommend",
      "available",
      "stock",
    ];

    const categoryKeywords = ["category", "categories", "type", "kinds"];

    const isProductQuery = productKeywords.some((keyword) =>
      lastMessage.toLowerCase().includes(keyword)
    );

    const isCategoryQuery = categoryKeywords.some((keyword) =>
      lastMessage.toLowerCase().includes(keyword)
    );

    // Fetch relevant product data if it's a product query
    if (isProductQuery) {
      // Try to find products matching the query
      const products = await searchProducts(lastMessage);

      if (products.length > 0) {
        productContext = `\n\nRelevant products from our catalog:\n${formatProductsForAI(products)}`;
      } else {
        // If no specific products found, show featured products
        const featured = await getFeaturedProducts();
        if (featured.length > 0) {
          productContext = `\n\nNo exact matches found, but here are some of our featured products:\n${formatProductsForAI(featured)}`;
        }
      }
    } else if (isCategoryQuery) {
      // Get available categories
      const categories = await getCategories();
      if (categories.length > 0) {
        productContext = `\n\nAvailable product categories:\n${categories.map((cat) => `- ${cat}`).join("\n")}`;
      }
    }

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
    });

    // Format conversation history for Gemini
    const maxHistory = parseInt(process.env.CHATBOT_MAX_HISTORY || "10", 10);
    const recentMessages = messages.slice(-maxHistory);

    // Build conversation string
    const conversationHistory = recentMessages
      .map((msg: { role: string; content: string }) => {
        const role = msg.role === "user" ? "User" : "Assistant";
        return `${role}: ${msg.content}`;
      })
      .join("\n\n");

    // Create the full prompt
    const fullPrompt = `${storeContext}${productContext}

Previous conversation:
${conversationHistory}

Please respond to the user's latest message in a helpful, friendly, and concise manner. If discussing products, include their prices in KSh and mention availability. Keep responses under 150 words unless providing detailed product information.`;

    // Generate content
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      role: "assistant",
      content: text,
    });
  } catch (error: unknown) {
    console.error("Chatbot API error:", error);

    // Handle specific Gemini errors
    if (error instanceof Error) {
      if (error.message.includes("API key") || error.message.includes("API_KEY")) {
        return NextResponse.json(
          {
            error:
              "Invalid Gemini API key. Please check your configuration at https://makersuite.google.com/app/apikey",
          },
          { status: 500 }
        );
      }

      if (error.message.includes("quota") || error.message.includes("limit")) {
        return NextResponse.json(
          {
            error:
              "API quota exceeded. Please try again later or check your Gemini API limits.",
          },
          { status: 429 }
        );
      }
      
      // Return the actual error message for debugging
      return NextResponse.json(
        {
          error: `Gemini API error: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
