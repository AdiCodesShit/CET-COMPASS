"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChatMessage, ChatRoom } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, UserCircle2 } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatRoomDisplayProps {
  chatRoom: ChatRoom;
}

const CHAT_MESSAGES_STORAGE_KEY = "mockChatMessages";

const ChatRoomDisplay: React.FC<ChatRoomDisplayProps> = ({ chatRoom }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load messages for the current chat room from local storage
    const storedMessages = JSON.parse(localStorage.getItem(CHAT_MESSAGES_STORAGE_KEY) || "[]");
    const roomMessages = storedMessages.filter((msg: ChatMessage) => msg.roomId === chatRoom.id);
    setMessages(roomMessages);
  }, [chatRoom.id]);

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to send messages.");
      return;
    }
    if (newMessage.trim() === "") {
      return;
    }

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId: chatRoom.id,
      userId: user.id,
      username: user.username,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");

    // Save all messages back to local storage
    const allStoredMessages = JSON.parse(localStorage.getItem(CHAT_MESSAGES_STORAGE_KEY) || "[]");
    const updatedAllMessages = [...allStoredMessages.filter((msg: ChatMessage) => msg.roomId !== chatRoom.id), newMsg];
    localStorage.setItem(CHAT_MESSAGES_STORAGE_KEY, JSON.stringify(updatedAllMessages));
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b p-4">
        <CardTitle className="text-xl font-bold">{chatRoom.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{chatRoom.description}</p>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground">No messages yet. Be the first to say something!</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.userId === user?.id ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.userId !== user?.id && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <UserCircle2 className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.userId === user?.id
                        ? "bg-app-purple text-white rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1">
                      {msg.userId === user?.id ? "You" : msg.username}
                    </p>
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs text-white/70 dark:text-muted-foreground text-right mt-1">
                      {format(new Date(msg.timestamp), "p")}
                    </p>
                  </div>
                  {msg.userId === user?.id && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <UserCircle2 className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!user}
          />
          <Button type="submit" size="icon" disabled={!user || newMessage.trim() === ""}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatRoomDisplay;