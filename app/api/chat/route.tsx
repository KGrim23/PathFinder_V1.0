import OpenAI from "openai";
import fetch from "node-fetch";

async function loadCoachingData() {
  const response = await fetch(
    "https://huggingface.co/api/datasets/fabiancelik/coachingllm",
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

// Initialize xAI client
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

    // Load a sample from the Hugging Face dataset
    const coachingData = await loadCoachingData();
    const randomIndex = Math.floor(Math.random() * coachingData.length);
    const contextSample =
      coachingData[randomIndex]?.content || "Sample coaching advice";

    const stream = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        {
          role: "system",
          content: `
            You are a professional advisor or a coach who offers friendly, supportive, and practical advice. Here’s a context example from real coaching: ${contextSample}.
            Continue helping the user based on the conversation so far:
          `,
        },
        ...updatedChatHistory,
      ],
      stream: true,
      temperature: 1,
      max_tokens: 2000,
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
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
            await new Promise((resolve) => setTimeout(resolve, 100));
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

// import OpenAI from "openai";
// import fetch from "node-fetch";

// async function loadCoachingData() {
//   const response = await fetch(
//     "https://huggingface.co/api/datasets/fabiancelik/coachingllm",
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//       },
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Failed to load dataset from Hugging Face");
//   }
//   const data = await response.json();
//   return data;
// }

// // Initialize xAI client
// const openai = new OpenAI({
//   apiKey: process.env.XAI_API_KEY,
//   baseURL: "https://api.x.ai/v1",
// });

// export async function POST(req: Request) {
//   const { message, chatHistory } = await req.json();

//   try {
//     const updatedChatHistory = [
//       ...(Array.isArray(chatHistory) ? chatHistory : []),
//       { role: "user", content: message },
//     ];

//     // Load coaching data and fetch a sample for context
//     const coachingData = await loadCoachingData();
//     const randomIndex = Math.floor(Math.random() * coachingData.length);
//     const contextSample =
//       coachingData[randomIndex]?.content || "Sample coaching advice";

//     const stream = await openai.chat.completions.create({
//       model: "grok-beta",
//       messages: [
//         {
//           role: "system",
//           content: `
//             You are a professional advisor or a coach who offers friendly, supportive, and practical advice. Here’s a context example from real coaching: ${contextSample}.
//             Continue helping the user based on the conversation so far:
//           `,
//         },
//         ...updatedChatHistory,
//       ],
//       stream: true,
//       temperature: 1,
//       max_tokens: 2000,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });

//     const readableStream = new ReadableStream({
//       async start(controller) {
//         for await (const chunk of stream) {
//           const text = chunk.choices[0]?.delta?.content || "";
//           if (text) {
//             controller.enqueue(new TextEncoder().encode(text));
//             await new Promise((resolve) => setTimeout(resolve, 100));
//           }
//         }
//         controller.close();
//       },
//     });

//     return new Response(readableStream, {
//       headers: {
//         "Content-Type": "text/markdown; charset=utf-8",
//         "Transfer-Encoding": "chunked",
//       },
//     });
//   } catch (error) {
//     console.error("OpenAI API error:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to get response from AI." }),
//       { status: 500 }
//     );
//   }
// }
