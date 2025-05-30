import { useState } from "react";
import Chat from "./Chat";
import { Bot } from "lucide-react";

export default function ChatWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed md:bottom-12 md:right-12 bottom-5 right-5">
      {!isOpen && (
        <div
          onClick={toggleChat}
          className="bg-primary rounded-sm p-2 cursor-pointer"
        >
          <Bot color="white" />
        </div>
      )}
      {isOpen && (
        <>
          <Chat />
          <div
            onClick={toggleChat}
            className="absolute top-0 right-2 text-xl cursor-pointer"
          >
            ×
          </div>
        </>
      )}
    </div>
  );
}
