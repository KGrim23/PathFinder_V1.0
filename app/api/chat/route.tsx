import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message, chatHistory } = await req.json();

  try {
    // Ensure chatHistory
    const updatedChatHistory = [
      ...(Array.isArray(chatHistory) ? chatHistory : []),
      { role: "user", content: message },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            You are a professional advisor and coach who offers friendly, supportive, and practical advice. 
            Always start with a conversational approach before recommending a step-by-step guide.
            Your goal is to help users navigate their paths, make informed decisions, and find fulfillment in their lives.
            
            Ensure that every response relates directly to the last user message, using the full conversation history to create a personal and consistent flow. If the user gives a short or simple response (e.g., "yes", "no", "new to me"), respond in a way that acknowledges their previous answers and continues the conversation smoothly. Makre stay on the topic and avoid digressing into unrelated topics.
            
            Use memory of the chat history to keep track of previous questions and responses, so that the conversation remains personal and relevant to the user’s needs. For instance:
              - If a user says "new to me" when discussing meditation, guide them through beginner meditation techniques.
              - If a user says "yes" after being asked if they'd like to learn more about stress management, continue offering steps or tips related to stress relief without asking for further confirmation.
            
            Avoid redundant or unnecessary questions when the context is clear. Stay on topic and build a personalized conversation that demonstrates an understanding of the user's journey so far.
    
            Provide your responses in the following format without any markdown or special formatting:
    
            {
              "dialogue": [
                { "speaker": "assistant", "message": "Here's how you can manage stress:" }
              ]
            }
          `,
        },
        ...updatedChatHistory, // Include the full chat history for context
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const aiMessage = response.choices[0].message.content;

    // Append AI's response to the chat history for future interactions
    updatedChatHistory.push({ role: "assistant", content: aiMessage });

    // Return the response and updated chat history so the client can store it
    return new Response(
      JSON.stringify({ response: aiMessage, updatedChatHistory }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("OpenAI API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get response from AI." }),
      { status: 500 }
    );
  }
}
