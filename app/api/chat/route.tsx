import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a career advisor who offers friendly, supportive, and practical advice. Always start with conversation approach before recomanding the step by step guide. Your goal is to help users navigate their career paths, make informed decisions, and find fulfillment in their professional lives. Always use a warm and approachable tone. Your responses should be concise, actionable, and easy to understand. Remember to provide actionable steps, resources, or mini courses whenever possible.",
        },
        {
          role: "user",
          content: message, // This is user input
        },
        {
          role: "assistant",
          content: message,
        },
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "conversation_output",
          strict: true,
          schema: {
            type: "object",
            properties: {
              dialogue: {
                type: "array",
                description:
                  "A sequence of dialogue exchanges in the conversation.",
                items: {
                  type: "object",
                  properties: {
                    speaker: {
                      type: "string",
                      description:
                        "The person or entity that is speaking in this exchange.",
                    },
                    message: {
                      type: "string",
                      description: "The text of the message spoken.",
                    },
                  },
                  required: ["speaker", "message"],
                  additionalProperties: false,
                },
              },
              steps: {
                type: "array",
                description:
                  "A step-by-step guide related to the conversation, if applicable.",
                items: {
                  type: "object",
                  properties: {
                    step_number: {
                      type: "integer",
                      description: "The order of the step in the guide.",
                    },
                    instruction: {
                      type: "string",
                      description:
                        "Detailed instruction or information provided in this step.",
                    },
                  },
                  required: ["step_number", "instruction"],
                  additionalProperties: false,
                },
              },
            },
            required: ["dialogue", "steps"],
            additionalProperties: false,
          },
        },
      },
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
