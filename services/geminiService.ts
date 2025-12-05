
/// <reference types="vite/client" />
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define the interface that matches ChatAssistant's usage
// chatRef.current.sendMessage({ message: userMsg }) -> result.text
export interface StylistChat {
    sendMessage: (params: { message: string }) => Promise<{ text: string }>;
}

// Mock image generation functions to satisfy build and provide demo functionality
export const generateFashionDesign = async (prompt: string, size: string): Promise<string | null> => {
    console.log("Generating fashion design for:", prompt, size);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Return a mock result since we don't have a real image generation backend connected
    return "https://placehold.co/1024x1024/2d2d2d/FFF?text=AI+Design+Generated";
};

export const generateProductImage = async (productName: string): Promise<string | null> => {
    console.log("Generating product image for:", productName);
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "https://placehold.co/600x800/f1f5f9/94a3b8?text=AI+Product+Image";
};

export const editProductImage = async (imageUrl: string, prompt: string): Promise<string | null> => {
    console.log("Editing product image:", imageUrl, "with prompt:", prompt);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "https://placehold.co/600x800/e2e8f0/475569?text=Edited+Version";
};

export const createStylistChat = (): StylistChat => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("Gemini API key is missing");
        // Return a mock or error-throwing implementation if key is missing
        // to prevent immediate crash, but it will fail on send
        return {
            sendMessage: async () => {
                throw new Error("Gemini API Key is not configured");
            }
        };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "You are a helpful fashion stylist assistant for AhmedHub. Your name is Stylist AI. Help users with outfit advice, product recommendations, and fashion tips. Keep your responses concise, friendly, and helpful." }],
            },
            {
                role: "model",
                parts: [{ text: "Hi! I'm your AhmedHub AI Stylist. Looking for outfit ideas or something specific?" }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });

    // Wrapper to match expected interface
    return {
        sendMessage: async ({ message }: { message: string }) => {
            try {
                const result = await chat.sendMessage(message);
                const response = await result.response;
                const text = response.text();
                return { text };
            } catch (error) {
                console.error("Gemini chat error:", error);
                throw error;
            }
        },
    };
};
