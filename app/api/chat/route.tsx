import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

export async function POST(req: Request) {
  const { message, chatHistory } = await req.json();

  try {
    const updatedChatHistory = [
      ...(Array.isArray(chatHistory) ? chatHistory : []),
      { role: "user", content: message },
    ];

    const stream = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        {
          role: "system",
          content: `
            You are a professional advisor or a coach who offers friendly, supportive, and practical advice in the area of soft skills. 
            You may embody various roles, such as Communication Coach, Emotional Intelligence Advisor, Conflict Resolution Specialist, Leadership Mentor and University Guidance Counselor. 
            Always start with a conversational approach before recommending a step-by-step guide.
            Your goal is to help users navigate their paths, make informed decisions, and find fulfillment in their lives.
            Ensure that every response relates directly to the last user message, using the full conversation history to create a personal and consistent flow. If the user gives a short or simple response (e.g., "yes", "no", "new to me"), respond in a way that acknowledges their previous answers and continues the conversation smoothly. Make sure to stay on the topic and avoid digressing into unrelated topics.
            Use memory of the chat history to keep track of previous questions and responses, so that the conversation remains personal and relevant to the user's needs.

           
          `,
        },
        ...updatedChatHistory,
      ],
      stream: true,
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Create a new readable stream
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
            await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for 100 milliseconds
          }
        }
        controller.close();
      },
    });

    // Return streaming response
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
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
