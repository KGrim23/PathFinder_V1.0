// SavedChatsPage.tsx

import React, { useEffect, useState } from "react";
import { MessageType } from "./Dashboard";

const SavedChatsPage: React.FC<{ messages: MessageType[] }> = () => {
  const [savedChats, setSavedChats] = useState<MessageType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedChats");
    if (saved) {
      setSavedChats(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Chats</h2>
      {savedChats.length === 0 ? (
        <p>No saved chats found.</p>
      ) : (
        <div>
          {savedChats.map((message, index) => (
            <div key={index} className="mb-4">
              <div
                className={`inline-block p-3 rounded-xl ${
                  message.type === "user"
                    ? "bg-blue-200 text-black"
                    : "bg-gray-100 text-black"
                }`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedChatsPage;
