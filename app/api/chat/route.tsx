import OpenAI from "openai";
import fetch from "node-fetch";

interface CoachingDataItem {
  content: string;
}

interface RequestBody {
  message: string;
  chatHistory: { role: string; content: string }[];
}

// Define a function to load data from Hugging Face dataset
async function loadCoachingData(): Promise<CoachingDataItem[]> {
  const response = await fetch(
    "https://huggingface.co/api/datasets/fabiancelik/coachingllm",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY ?? ""}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to load dataset from Hugging Face");
  }
  const data: CoachingDataItem[] = await response.json();
  return data;
}

// Initialize OpenAI client with types
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

export async function POST(req: Request): Promise<Response> {
  const { message, chatHistory }: RequestBody = await req.json();

  try {
    const updatedChatHistory = [
      ...(Array.isArray(chatHistory) ? chatHistory : []),
      { role: "user", content: message },
    ];

    // Load a sample from the Hugging Face dataset
    const coachingData = await loadCoachingData();
    const randomIndex = Math.floor(Math.random() * coachingData.length);
    const contextSample =
      coachingData[randomIndex]?.content || "Sample coaching advice";

    const stream = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: `
          You are a professional advisor and coach who offers friendly, supportive, and practical advice in the area of soft skills. 
            You may embody various roles, such as Communication Coach, Emotional Intelligence Advisor, Conflict Resolution Specialist, Leadership Mentor and University Guidance Counselor. 
            Always start with a conversational approach before recommending a step-by-step guide.
            Your goal is to help users navigate their paths, make informed decisions, and find fulfillment in their lives.
            Ensure that every response relates directly to the last user message, using the full conversation history to create a personal and consistent flow. If the user gives a short or simple response (e.g., "yes", "no", "new to me"), respond in a way that acknowledges their previous answers and continues the conversation smoothly. Make sure to stay on the topic and avoid digressing into unrelated topics.
            Use memory of the chat history to keep track of previous questions and responses, so that the conversation remains personal and relevant to the user's needs.
            Response should be in a conversational tone, and should not be too long.

            You can also use the following context to provide additional information:
            ${contextSample}
          `,
        },
        ...updatedChatHistory.map((msg) => ({
          role: msg.role as "user" | "assistant" | "system",
          content: msg.content,
        })),
      ],
      stream: true,
      temperature: 1,
      max_tokens: 2500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Add a custom source tag
    const sourceTag = contextSample ? "Hugging Face dataset" : "xAI";
    console.log("Response source:", sourceTag);

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices?.[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
            await new Promise((resolve) => setTimeout(resolve, 150));
          }
        }
        controller.close();
      },
    });

    // Return response with source metadata
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Transfer-Encoding": "chunked",
        connection: "keep-alive",
        "X-Response-Source": sourceTag, // custom header to indicate response source
      },
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get response from AI." }),
      { status: 500 }
    );
  }
}
