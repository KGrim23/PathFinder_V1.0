import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message, chatHistory } = await req.json();

  try {
    // Ensure chatHistory is an array, defaulting to an empty array if it's not provided
    const updatedChatHistory = [
      ...(Array.isArray(chatHistory) ? chatHistory : []),
      { role: "user", content: message }, // Append the user's current message
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            You are an advisor and coach who offers friendly, supportive, and practical advice. 
            Always start with a conversational approach before recommending a step-by-step guide.
            Your goal is to help users navigate their paths, make informed decisions, and find fulfillment in their lives.
            Provide your responses in the following format You are an advisor and coach who offers friendly, supportive, and practical advice. Always start with a conversational approach before recommending a step-by-step guide. 

    Your goal is to help users navigate their paths, make informed decisions, and find fulfillment in their lives. 
    Ensure that every response relates directly to the last user message, staying on point and addressing the user’s specific query, particularly in situations where they ask for an example or technical clarification.
    Provide your responses in the following format without any markdown or special formatting:

    {
      "dialogue": [
        { "speaker": "assistant", "message": "Here's how you can manage stress:" }
      ]
    }without any markdown or special formatting:

            {
              "dialogue": [
                { "speaker": "assistant", "message": "Here's how you can manage stress:" },
              ],
            }
          `,
        },
        ...updatedChatHistory, // Include the full chat history to maintain context
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
