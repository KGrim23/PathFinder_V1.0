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

// Load coaching data from LMI for All API
async function loadCoursesFromLMI() {
  const response = await fetch(
    "https://api.lmiforall.org.uk/api/v1/hesa/list-courses",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load data from LMI for All API");
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
    // const coachingData = await loadCoachingData();
    // const randomIndex = Math.floor(Math.random() * coachingData.length);
    // const contextSample =
    //   coachingData[randomIndex]?.content || "Sample coaching advice";
    const coachingData = await loadCoachingData();
    const randomIndex =
      coachingData.length > 0
        ? Math.floor(Math.random() * coachingData.length)
        : null;
    const contextSample =
      randomIndex !== null
        ? coachingData[randomIndex]?.content
        : "Extra coaching advice";

    // Load career courses data from LMI for All
    const coursesData = await loadCoursesFromLMI();
    const courseOptions = coursesData?.courses || [];
    const courseMessage =
      courseOptions.length > 0
        ? `Here are some career courses you might be interested in: ${courseOptions.join(
            ", "
          )}`
        : "I couldn't find any course options at the moment.";

    // OpenAI or Grok Prompt
    const systemMessage = `You are a school career advisor who helps students make informed decisions about their education, training, and future careers. Your goal is to assist them in identifying an appropriate career choice. You provide information, advice, and guidance to help people make realistic choices about their next steps. If they use swear words or inappropriate language, provide funny and sarcastic feedback without being rude.

    Always start with a short, friendly conversational approach. If relevant, recommend a clear step-by-step guide or suggest actionable steps. Use the full chat history to keep the conversation personal and relevant to their ongoing journey, ensuring continuity in each response. When a user provides short or simple responses (e.g., "yes," "no," "new to me"), acknowledge their input and respond naturally without digressing. Avoid saying "Hi" or "Hello" multiple times within the same session.

    Incorporate insights from real coaching experiences using the Hugging Face dataset as follows: "${contextSample}" and pair it with the capabilities of the grok model to deliver rich, structured advice. Use these combined resources to offer responses that are empathetic, personalized, and grounded in practical, real-world coaching. Keep responses to a maximum of 100 tokens and do NOT mention where the response or information came from (e.g., "According to Hugging Face or Grok").

    If students ask questions outside the scope of career advice or career guidance, or use inappropriate language, kindly respond with: "I am sorry, I am not able to provide advice on that topic. Please feel free to ask me about career guidance or related topics."

    REMEMBER: You are talking to students aged 14-24 and ONLY answer questions relevant to the United Kingdom's education system.
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

    // Determine the source tag based on available data
    const sourceTag =
      coachingData.length > 0
        ? "Hugging Face dataset"
        : coursesData?.courses?.length > 0
        ? "LMI for All"
        : "xAI";
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

// import OpenAI from "openai";
// import fetch from "node-fetch";

// // Load coaching data from Hugging Face
// async function loadCoachingData() {
//   const response = await fetch(
//     "https://huggingface.co/api/datasets/mb7419/career-guidance-reddit",
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

// // Load coaching data from LMI for All API
// async function loadCoursesFromLMI() {
//   const response = await fetch(
//     "https:///api.lmiforall.org.uk/api/v1/hesa/list-courses",
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to load data from LMI for All API");
//   }

//   const data = await response.json();
//   return data;
// }

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.XAI_API_KEY,
//   baseURL: "https://api.x.ai/v1",
// });

// // Configure as Edge Function for Vercel
// export const runtime = "edge";

// export async function POST(req: Request) {
//   const { message, chatHistory } = await req.json();

//   try {
//     const updatedChatHistory = [
//       ...(Array.isArray(chatHistory) ? chatHistory : []),
//       { role: "user", content: message },
//     ];

//     // Load a random sample from the Hugging Face dataset
//     const coachingData = await loadCoachingData();
//     const randomIndex = Math.floor(Math.random() * coachingData.length);
//     const contextSample =
//       coachingData[randomIndex]?.content || "Sample coaching advice";

//     // Load career courses data from LMI for All
//     const coursesData = await loadCoursesFromLMI();
//     const courseOptions = coursesData?.courses || [];
//     const courseMessage =
//       courseOptions.length > 0
//         ? `Here are some career courses you might be interested in: ${courseOptions.join(
//             ", "
//           )}`
//         : "I couldn't find any course options at the moment.";

//     // OpenAI or Grok Prompt
//     const systemMessage = `You are a school career advisor helps students make informed decisions about their education, training, and future careers. Your goal is to help them to identify appropriate career choice. You provide information, advice and guidance to help people make realistic choices about their next steps. If they use the swear words or any inappropriate language, give funny and sarcastic feedback but dont be rude.

//     Always start by short friendly conversational approach. If relevant, recommend a clear step-by-step guide or suggest actionable steps. Use the full chat history to keep the conversation personal and relevant to their ongoing journey, ensuring continuity in each response. When a user provides short or simple responses (e.g., "yes," "no," "new to me"), acknowledge their input and respond in a way that continues the conversation naturally without digressing. Dont use Hi again or Hello or Hi when it is in same chat session.

//     Incorporate insights from real coaching experiences using the Hugging Face dataset as follows:
//     "${contextSample}" and pair it with the capabilities of the grok model to provide rich, structured advice. Use these combined resources to deliver responses that are empathetic, personalized, and grounded in practical, real-world coaching. Keep the response to a maximum of 100 tokens and DO NOT include where the response or information came from like "Acoording to Huggingface or Grok".
// ß
//     If students ask you questions that was not in scope of career advice or career guidance or use inappropriate language, kindly respond with "I am sorry, I am not able to provide advice on that topic. Please feel free to ask me about career guidance or related topics."

//     REMEMBER: You are talking to a student age 18-24 and ONLY answer the question that are relevant to United Kingdom eduction system.

//     `;

//     const stream = await openai.chat.completions.create({
//       model: "grok-beta",
//       messages: [
//         {
//           role: "system",
//           content: systemMessage,
//         },
//         ...updatedChatHistory,
//       ],
//       stream: true,
//       temperature: 1,
//       max_tokens: 500,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });

//     const sourceTag = contextSample ? "Hugging Face dataset" : "xAI";
//     console.log("Response source:", sourceTag);

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
//         "X-Response-Source": sourceTag,
//       },
//     });
//   } catch (error) {
//     console.error("OpenAI API error:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to get response from AI." }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
