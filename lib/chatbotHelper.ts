import { client } from "@/sanity/lib/client";

export interface ProductInfo {
  name: string;
  price: number;
  discount: number;
  description?: string;
  stock?: number;
  brand?: string;
  category?: string;
  slug?: string;
}

/**
 * Search products by name or description
 */
export async function searchProducts(query: string): Promise<ProductInfo[]> {
  try {
    const searchQuery = `*[_type == "product" && (
      name match $searchTerm || 
      description match $searchTerm ||
      intro match $searchTerm
    )][0...5]{
      name,
      price,
      discount,
      description,
      intro,
      stock,
      "brand": brand->name,
      "category": categories[0]->title,
      "slug": slug.current
    }`;

    const products = await client.fetch<ProductInfo[]>(searchQuery, {
      searchTerm: `*${query}*`,
    });

    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  categoryName: string
): Promise<ProductInfo[]> {
  try {
    const categoryQuery = `*[_type == "product" && references(*[_type == "category" && title match $category]._id)][0...5]{
      name,
      price,
      discount,
      description,
      intro,
      stock,
      "brand": brand->name,
      "category": categories[0]->title,
      "slug": slug.current
    }`;

    const products = await client.fetch<ProductInfo[]>(categoryQuery, {
      category: `*${categoryName}*`,
    });

    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

/**
 * Get featured or popular products
 */
export async function getFeaturedProducts(): Promise<ProductInfo[]> {
  try {
    const featuredQuery = `*[_type == "product" && isFeatured == true][0...5]{
      name,
      price,
      discount,
      description,
      intro,
      stock,
      "brand": brand->name,
      "category": categories[0]->title,
      "slug": slug.current
    }`;

    const products = await client.fetch<ProductInfo[]>(featuredQuery);

    return products;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

/**
 * Get product by slug
 */
export async function getProductBySlug(
  slug: string
): Promise<ProductInfo | null> {
  try {
    const productQuery = `*[_type == "product" && slug.current == $slug][0]{
      name,
      price,
      discount,
      description,
      intro,
      stock,
      "brand": brand->name,
      "category": categories[0]->title,
      "slug": slug.current
    }`;

    const product = await client.fetch<ProductInfo | null>(productQuery, { slug });

    return product || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<string[]> {
  try {
    const categoriesQuery = `*[_type == "category"]{
      title
    }`;

    const categories = await client.fetch<{ title: string }[]>(categoriesQuery);

    return categories.map((cat: { title: string }) => cat.title);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Format products for AI context
 */
export function formatProductsForAI(products: ProductInfo[]): string {
  if (products.length === 0) {
    return "No products found.";
  }

  return products
    .map((product) => {
      const finalPrice = product.price - product.discount;
      const inStock = product.stock && product.stock > 0;

      return `- **${product.name}**
  Price: KSh ${finalPrice.toLocaleString()} ${product.discount > 0 ? `(${product.discount} KSh discount)` : ""}
  ${product.brand ? `Brand: ${product.brand}` : ""}
  ${product.category ? `Category: ${product.category}` : ""}
  ${product.description ? `Description: ${product.description}` : ""}
  Stock: ${inStock ? "In Stock" : "Out of Stock"}
  ${product.slug ? `URL: /product/${product.slug}` : ""}`;
    })
    .join("\n\n");
}

/**
 * Get general store information for AI context
 */
export function getStoreContext(): string {
  return `You are a helpful shopping assistant for EcoTech Solutions, an electronics e-commerce store based in Nairobi, Kenya.

Store Information:
- Company: ${process.env.NEXT_PUBLIC_COMPANY_NAME || "EcoTech Solutions"}
- Email: ${process.env.NEXT_PUBLIC_COMPANY_EMAIL || "support@ecotech.org"}
- Phone: ${process.env.NEXT_PUBLIC_COMPANY_PHONE || "+254712345678"}
- Location: ${process.env.NEXT_PUBLIC_COMPANY_CITY || "Nairobi, Kenya"}
- Business Hours: ${process.env.NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKDAY || "Monday - Friday: 9AM - 7PM"}, ${process.env.NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKEND || "Saturday: 10AM - 4PM"}
- Currency: KSh (Kenyan Shillings)

Your role:
- Help customers find products they're looking for
- Answer questions about products, pricing, and availability
- Provide product recommendations based on their needs
- Assist with general shopping inquiries
- Be friendly, professional, and concise
- If you don't know something, direct them to contact support

Important:
- All prices are in KSh (Kenyan Shillings)
- Always mention if a product is in stock or out of stock
- Provide product URLs when recommending specific products`;
}
