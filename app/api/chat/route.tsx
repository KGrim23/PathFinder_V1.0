import OpenAI from "openai";

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
          content: `
            You are an advisor and coach who offers friendly, supportive, and practical advice. 
            Always start with a conversational approach before recommending a step-by-step guide.
            Your goal is to help users navigate their paths, make informed decisions, and find fulfillment in their lives.
            Provide your responses in the following format without any markdown or special formatting:
            Provide responses in the following format:

            {
              "dialogue": [
                { "speaker": "assistant", "message": "Here's how you can manage stress:" },
              ],
            }
          `,
        },
        {
          role: "user",
          content: message, // User input
        },
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const aiMessage = response.choices[0].message.content;

    console.log("AI Response:", aiMessage);
    return new Response(JSON.stringify({ response: aiMessage }), {
      status: 200,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get response from AI." }),
      { status: 500 }
    );
  }
}
