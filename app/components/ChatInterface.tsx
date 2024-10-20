"use client";

import React, { useState } from "react"; // Import useState
import { ThumbsUp, ThumbsDown, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeContext";
import ChatInput from "./ChatInput";

type MessageType = {
  type: "user" | "ai"; // Removed 'system' type
  content:
    | string
    | {
        heading: string;
        subheading: string;
        steps: string[];
      };
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

type ChatInterfaceProps = {
  messages: MessageType[];
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Ensure this returns a Promise
  handleOptionClick: (option: string) => void;
  handleFeedback: (index: number, type: "liked" | "disliked" | "sound") => void;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleOptionClick,
  handleFeedback,
}) => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false); // State for loading

  // Function to handle sending messages
  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setInputMessage("");

    await handleSendMessage(e);

    setIsLoading(false);
  };

  // Render options only if no messages have been sent
  const renderOptions = () => {
    if (messages.length === 0) {
      return (
        <div
          className={`mb-2 rounded-lg p-4 ${
            isDarkMode ? "bg-black" : "bg-muted"
          }`}
        >
          <h2 className="mb-6 text-lg font-semibold">
            How can I assist you today?
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Emotional Support",
              "Career Advice",
              "Personal Growth",
              "Stress Management",
              "Time Management",
              "Work-Life Balance",
            ].map((option) => (
              <Button
                key={option}
                variant="outline"
                size="sm"
                className={`rounded-button ${isDarkMode ? "white-border" : ""}`}
                onClick={() => handleOptionClick(option)}
              >
                <span className="mr-2">
                  {option === "Emotional Support"
                    ? "💬"
                    : option === "Career Advice"
                    ? "🎯"
                    : option === "Personal Growth"
                    ? "🌱"
                    : option === "Stress Management"
                    ? "🧘"
                    : option === "Time Management"
                    ? "⏳"
                    : "⚖️"}
                </span>
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Function to render AI message content (structured)
  const renderAIMessageContent = (content: any) => {
    let parsedContent;

    // Check if the content is a string and needs to be parsed as JSON
    if (typeof content === "string") {
      try {
        parsedContent = JSON.parse(content);
      } catch (error) {
        console.error("Failed to parse AI message content", error);
        return <p>{content}</p>; // Fallback to displaying as plain text
      }
    } else {
      parsedContent = content;
    }

    // Render the structured content
    if (
      parsedContent &&
      parsedContent.heading &&
      parsedContent.subheading &&
      parsedContent.steps
    ) {
      return (
        <div>
          <h3 className="font-semibold text-lg mb-2">
            {parsedContent.heading}
          </h3>
          <p className="mb-2 text-md italic">{parsedContent.subheading}</p>
          <ul className="ml-6 mb-2 list-disc">
            {parsedContent.steps.map((step: string, index: number) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>{content}</p>; // If content isn't structured, show it as plain text
    }
  };

  // Function to render user message content (as string)
  const renderUserMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3 key={index} className="font-semibold text-lg mb-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-2 list-disc">
            {line.replace(/^- /, "")}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <li key={index} className="ml-6 mb-2 list-decimal">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      } else {
        return (
          <p key={index} className="mb-2 last:mb-0">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div
      className={`flex flex-col h-full ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {renderOptions()}
      <div className="flex-1 overflow-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-xl shadow-md transition-transform ${
                message.type === "user"
                  ? isDarkMode
                    ? "bg-blue-950 text-white" // User message background in dark mode
                    : "bg-blue-200 text-black" // User message background in light mode
                  : isDarkMode
                  ? "bg-gray-900 text-white" // AI message background in dark mode
                  : "bg-gray-100 text-black" // AI message background in light mode
              }`}
              style={{
                maxWidth: "95%",
                wordWrap: "break-word",
              }}
            >
              <div className="text-md leading-relaxed">
                {message.type === "user"
                  ? renderUserMessageContent(message.content as string)
                  : renderAIMessageContent(message.content)}
              </div>
            </div>
            {message.type === "ai" && (
              <div className="mt-2 flex items-center space-x-2">
                <Button
                  variant={message.feedback?.liked ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback(index, "liked")}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  variant={message.feedback?.disliked ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback(index, "disliked")}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                <Button
                  variant={message.feedback?.sound ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback(index, "sound")}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}

        {/* Display loading indicator */}
        {isLoading && (
          <div className="flex justify-center mt-4">
            <p className="text-lg">Loading...</p>
          </div>
        )}
      </div>
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleMessageSend} // Use new handler
      />
    </div>
  );
};

export default ChatInterface;

// "use client";

// import React, { useState } from "react"; // Import useState
// import { ThumbsUp, ThumbsDown, Volume2 } from "lucide-react";
// import { Button } from "@/components/ui/button";

// import { useTheme } from "./ThemeContext";
// import ChatInput from "./ChatInput";

// type MessageType = {
//   type: "user" | "ai";
//   content:
//     | string
//     | {
//         heading: string;
//         subheading: string;
//         steps: string[];
//       };
//   feedback?: {
//     liked: boolean;
//     disliked: boolean;
//     sound: boolean;
//   };
// };

// type ChatInterfaceProps = {
//   messages: MessageType[];
//   inputMessage: string;
//   setInputMessage: React.Dispatch<React.SetStateAction<string>>;
//   handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Ensure this returns a Promise
//   handleOptionClick: (option: string) => void;
//   handleFeedback: (index: number, type: "liked" | "disliked" | "sound") => void;
// };

// const ChatInterface: React.FC<ChatInterfaceProps> = ({
//   messages,
//   inputMessage,
//   setInputMessage,
//   handleSendMessage,
//   handleOptionClick,
//   handleFeedback,
// }) => {
//   const { isDarkMode } = useTheme();
//   const [isLoading, setIsLoading] = useState(false); // State for loading

//   // Function to handle sending messages
//   const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setIsLoading(true);
//     const previousInput = inputMessage;
//     setInputMessage("");

//     await handleSendMessage(e);

//     setIsLoading(false);
//   };

//   // Render options only if no messages have been sent
//   const renderOptions = () => {
//     if (messages.length === 0) {
//       return (
//         <div
//           className={`mb-2 rounded-lg p-4 ${
//             isDarkMode ? "bg-black" : "bg-muted"
//           }`}
//         >
//           <h2 className="mb-6 text-lg font-semibold">
//             How can I assist you today?
//           </h2>
//           <div className="flex flex-wrap gap-2">
//             {[
//               "Emotional Support",
//               "Career Advice",
//               "Personal Growth",
//               "Stress Management",
//               "Time Management",
//               "Work-Life Balance",
//             ].map((option) => (
//               <Button
//                 key={option}
//                 variant="outline"
//                 size="sm"
//                 className={`rounded-button ${isDarkMode ? "white-border" : ""}`}
//                 onClick={() => handleOptionClick(option)}
//               >
//                 <span className="mr-2">
//                   {option === "Emotional Support"
//                     ? "💬"
//                     : option === "Career Advice"
//                     ? "🎯"
//                     : option === "Personal Growth"
//                     ? "🌱"
//                     : option === "Stress Management"
//                     ? "🧘"
//                     : option === "Time Management"
//                     ? "⏳"
//                     : "⚖️"}
//                 </span>
//                 {option}
//               </Button>
//             ))}
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Function to render AI message content (structured)
//   const renderAIMessageContent = (content: any) => {
//     let parsedContent;

//     // Check if the content is a string and needs to be parsed as JSON
//     if (typeof content === "string") {
//       try {
//         parsedContent = JSON.parse(content);
//       } catch (error) {
//         console.error("Failed to parse AI message content", error);
//         return <p>{content}</p>; // Fallback to displaying as plain text
//       }
//     } else {
//       parsedContent = content;
//     }

//     // Render the structured content
//     if (
//       parsedContent &&
//       parsedContent.heading &&
//       parsedContent.subheading &&
//       parsedContent.steps
//     ) {
//       return (
//         <div>
//           <h3 className="font-semibold text-lg mb-2">
//             {parsedContent.heading}
//           </h3>
//           <p className="mb-2 text-md italic">{parsedContent.subheading}</p>
//           <ul className="ml-6 mb-2 list-disc">
//             {parsedContent.steps.map((step: string, index: number) => (
//               <li key={index} className="mb-2">
//                 {step}
//               </li>
//             ))}
//           </ul>
//         </div>
//       );
//     } else {
//       return <p>{content}</p>; // If content isn't structured, show it as plain text
//     }
//   };

//   // Function to render user message content (as string)
//   const renderUserMessageContent = (content: string) => {
//     const lines = content.split("\n");
//     return lines.map((line, index) => {
//       if (line.startsWith("**") && line.endsWith("**")) {
//         return (
//           <h3 key={index} className="font-semibold text-lg mb-2">
//             {line.replace(/\*\*/g, "")}
//           </h3>
//         );
//       }
//       if (line.startsWith("- ")) {
//         return (
//           <li key={index} className="ml-6 mb-2 list-disc">
//             {line.replace(/^- /, "")}
//           </li>
//         );
//       }
//       if (line.match(/^\d+\.\s/)) {
//         return (
//           <li key={index} className="ml-6 mb-2 list-decimal">
//             {line.replace(/^\d+\.\s/, "")}
//           </li>
//         );
//       } else {
//         return (
//           <p key={index} className="mb-2 last:mb-0">
//             {line}
//           </p>
//         );
//       }
//     });
//   };

//   return (
//     <div
//       className={`flex flex-col h-full ${
//         isDarkMode ? "bg-black text-white" : "bg-white text-black"
//       }`}
//     >
//       {renderOptions()}
//       <div className="flex-1 overflow-auto mb-4">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`mb-4 ${
//               message.type === "user" ? "text-right" : "text-left"
//             }`}
//           >
//             <div
//               className={`inline-block p-3 rounded-lg ${
//                 message.type === "user"
//                   ? "bg-primary text-primary-foreground"
//                   : isDarkMode
//                   ? "bg-black"
//                   : "bg-muted"
//               } shadow-md transition-transform`}
//               style={{
//                 maxWidth: "80%",
//                 wordWrap: "break-word",
//               }}
//             >
//               <div className="text-md leading-relaxed">
//                 {message.type === "user"
//                   ? renderUserMessageContent(message.content as string)
//                   : renderAIMessageContent(message.content)}
//               </div>
//             </div>
//             {message.type === "ai" && (
//               <div className="mt-2 flex items-center space-x-2">
//                 <Button
//                   variant={message.feedback?.liked ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => handleFeedback(index, "liked")}
//                 >
//                   <ThumbsUp className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant={message.feedback?.disliked ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => handleFeedback(index, "disliked")}
//                 >
//                   <ThumbsDown className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant={message.feedback?.sound ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => handleFeedback(index, "sound")}
//                 >
//                   <Volume2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             )}
//           </div>
//         ))}

//         {/* Display loading indicator */}
//         {isLoading && (
//           <div className="flex justify-center mt-4">
//             <p className="text-lg">Loading...</p>{" "}
//             {/* You can replace this with a spinner */}
//           </div>
//         )}
//       </div>
//       <ChatInput
//         inputMessage={inputMessage}
//         setInputMessage={setInputMessage}
//         handleSendMessage={handleMessageSend} // Use new handler
//       />
//     </div>
//   );
// };

// export default ChatInterface;
