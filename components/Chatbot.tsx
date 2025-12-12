"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Loader2 } from "lucide-react";
import ChatMessage, { Message } from "./ChatMessage";
import ChatInput from "./ChatInput";
import { cn } from "@/lib/utils";

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! 👋 I'm your shopping assistant. How can I help you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call chatbot API
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          userQuery: content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "Sorry, I encountered an error. Please try again or contact support if the issue persists.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show chatbot on authentication pages or Sanity Studio
  if (pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up") || pathname?.startsWith("/studio")) {
    return null;
  }

  return (
    <>
      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 flex flex-col bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out",
          isOpen
            ? "w-[380px] h-[600px] opacity-100 scale-100"
            : "w-0 h-0 opacity-0 scale-95 pointer-events-none",
          "max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-2xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base">EcoBot</h3>
              <p className="text-xs text-green-100">Online now</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin text-green-600" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder={isLoading ? "Waiting for response..." : "Ask me anything..."}
        />
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        
        {/* Notification Badge (optional - can be used for unread messages) */}
        {/* <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
          !
        </div> */}
      </button>
    </>
  );
}
