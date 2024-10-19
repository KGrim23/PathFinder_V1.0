import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a career advisor who offers friendly, supportive, and practical advice. Your goal is to help users navigate their career paths, make informed decisions, and find fulfillment in their professional lives. Always use a warm and approachable tone. Your responses should be concise, actionable, and easy to understand. Remember to provide actionable steps and resources whenever possible.",
        },
        {
          role: "user",
          content: message,
        },
        {
          role: "system",
          content:
            "You are a motivational coach who provides uplifting and inspiring advice. Your goal is to encourage users to achieve their goals, boost their confidence, and maintain a positive mindset. Always communicate in a supportive and energetic tone.",
        },
        {
          role: "user",
          content: message,
        },
        {
          role: "system",
          content:
            "You are an emotional support companion who provides empathetic and understanding advice. Your goal is to help users express their feelings, navigate emotional challenges, and find comfort. Always communicate in a warm, compassionate, and non-judgmental tone.",
        },
        {
          role: "user",
          content: message,
        },
      ],

      max_tokens: 300, // Increased token limit for more complex responses
    });

    const aiMessage = response.choices[0].message.content;

    return NextResponse.json({ response: aiMessage }, { status: 200 });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI." },
      { status: 500 }
    );
  }
}
