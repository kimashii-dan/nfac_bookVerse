import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { generateResponse } from "../helpers/api";
import { ChatMessage } from "../types";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "libryan",
      content:
        "Hello there! Welcome to the library chat. I'm LiBryan, your friendly librarian assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const mutation = useMutation({
    mutationFn: generateResponse,
    onSuccess: (data) => {
      const geminiResponse: ChatMessage = { role: "libryan", content: data };
      setMessages((prevMessages) => [...prevMessages, geminiResponse]);
    },
    onError: (error) => {
      console.log(error);
      const newGeminiMessage: ChatMessage = {
        role: "libryan",
        content: "Sorry, I encountered an error.",
      };
      setMessages((prevMessages) => [...prevMessages, newGeminiMessage]);
    },
  });

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage: ChatMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput("");
    mutation.mutate(input);
  };

  return (
    <Card className="flex flex-col w-80 h-96 border rounded-md shadow-sm p-0 m-0">
      <ScrollArea className="px-5 pt-5 h-10/12 w-full overflow-hidden">
        {messages.map((message, index) => (
          <Card key={index} className="bg-accent rounded-md mb-3 p-3 gap-0">
            <p
              className={`
              ${
                message.role === "user" ? "text-foreground" : "text-primary"
              } text-sm font-semibold`}
            >
              {message.role === "user" ? "You" : "LiBryan"}
            </p>
            {typeof message.content === "string" ? (
              <p className="text-sm">{message.content}</p>
            ) : (
              <div className="text-sm">
                <p>{message.content.main_text}</p>
                {message.content.books && message.content.books.length > 0 && (
                  <ul className="flex flex-col list-disc pl-5 mt-2 gap-2">
                    {message.content.books.map((book) => (
                      <li key={book.id}>
                        <Link
                          to={`/${book.id}`}
                          className="text-blue-600 underline text-sm"
                        >
                          {book.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </Card>
        ))}
        {mutation.isPending && (
          <div className="p-3 rounded-md bg-gray-100 text-gray-800 self-start">
            <p className="text-sm font-semibold text-primary">LiBryan</p>
            <p className="text-sm animate-pulse">Thinking...</p>
          </div>
        )}
      </ScrollArea>
      <div className="flex items-center w-full gap-1 h-2/12 p-4 border-t">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask LiBryan..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !mutation.isPending && input.trim()) {
              handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage} disabled={mutation.isPending}>
          {mutation.isPending ? "Sending..." : "Send"}
        </Button>
      </div>
    </Card>
  );
}
