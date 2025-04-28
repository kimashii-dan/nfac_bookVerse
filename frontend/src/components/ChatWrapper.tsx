import { useState } from "react";
import { Button } from "./ui/button";
import Chat from "./Chat";
import { Bot } from "lucide-react";

export default function ChatWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="fixed bottom-15 right-15">
      {!isOpen && (
        <div
          onClick={toggleChat}
          className="bg-primary rounded-sm p-2 cursor-pointer"
        >
          <Bot color="white" />
        </div>
      )}
      {isOpen && (
        <div>
          <Chat />
          <Button onClick={toggleChat} className="mt-2 w-full">
            Close Chat
          </Button>
        </div>
      )}
    </div>
  );
}
