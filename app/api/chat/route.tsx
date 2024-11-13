import OpenAI from "openai";
import fetch from "node-fetch";

// Load coaching data from Hugging Face
async function loadCoachingData() {
  const response = await fetch(
    "https://huggingface.co/api/datasets/mb7419/career-guidance-reddit",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to load dataset from Hugging Face");
  }
  const data = await response.json();
  return data;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

// Configure as Edge Function for Vercel
export const runtime = "edge";

export async function POST(req: Request) {
  const { message, chatHistory } = await req.json();

  try {
    const updatedChatHistory = [
      ...(Array.isArray(chatHistory) ? chatHistory : []),
      { role: "user", content: message },
    ];

    // Load a random sample from the Hugging Face dataset
    const coachingData = await loadCoachingData();
    const randomIndex = Math.floor(Math.random() * coachingData.length);
    const contextSample =
      coachingData[randomIndex]?.content || "Sample coaching advice";

    const systemMessage = `You are a career advisor or a guidence counsellor for High School and University students in United Kingdom. Your goal is to help them to identify appropriate career choice. MAKE SURE YOU ARE TALKING TO A STUDENT.

    Always start by short friendly conversational approach. If relevant, recommend a clear step-by-step guide or suggest actionable steps. Use the full chat history to keep the conversation personal and relevant to their ongoing journey, ensuring continuity in each response. When a user provides short or simple responses (e.g., "yes," "no," "new to me"), acknowledge their input and respond in a way that continues the conversation naturally without digressing. Dont use Hi again or Hello or Hi when it is in same chat session.

    Incorporate insights from real coaching experiences using the Hugging Face dataset as follows:
    "${contextSample}" and pair it with the capabilities of the grok model to provide rich, structured advice. Use these combined resources to deliver responses that are empathetic, personalized, and grounded in practical, real-world coaching. Keep the response to a maximum of 150 tokens and DO NOT include where the response or information came from like "Acoording to Huggingface or Grok".

    Your primary aim is to help students offering insights and actionable advice relevant to their immediate needs and context.
    If students ask you questions that was not in scope of career advice or career guidance or use imappropriate   language, kindly respond with "I am sorry, I am not able to provide advice on that topic. Please feel free to ask me about career guidance or related topics."

    `;

    const stream = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        ...updatedChatHistory,
      ],
      stream: true,
      temperature: 1,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const sourceTag = contextSample ? "Hugging Face dataset" : "xAI";
    console.log("Response source:", sourceTag);

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Response-Source": sourceTag,
      },
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get response from AI." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
