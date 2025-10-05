"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { DirectMessage, DirectConversation, User } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, UserCircle2 } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllUsers } from "@/utils/auth";
import UserYearTagDisplay, { yearTagConfig } from "./UserYearTagDisplay"; // Import the new component and yearTagConfig

interface DirectMessageDisplayProps {
  conversation: DirectConversation;
  onSendMessage: (message: DirectMessage) => void;
}

const DIRECT_MESSAGES_STORAGE_KEY = "mockDirectMessages";
const DIRECT_CONVERSATIONS_STORAGE_KEY = "mockDirectConversations";

const DirectMessageDisplay: React.FC<DirectMessageDisplayProps> = ({
  conversation,
  onSendMessage,
}) => {
  const { user } = useAuth();
  const allUsers = useMemo(() => getAllUsers(), []);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [newMessageContent, setNewMessageContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherParticipant = useMemo(() => {
    if (!user) return undefined;
    const otherParticipantId = conversation.participants.find((p) => p !== user.id);
    return allUsers.find((u) => u.id === otherParticipantId);
  }, [conversation, user, allUsers]);

  useEffect(() => {
    // Load messages for the current conversation from local storage
    const storedMessages = JSON.parse(localStorage.getItem(DIRECT_MESSAGES_STORAGE_KEY) || "[]");
    const convMessages = storedMessages.filter(
      (msg: DirectMessage) => msg.conversationId === conversation.id
    );
    setMessages(convMessages);
  }, [conversation.id]);

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !otherParticipant) {
      toast.error("You must be logged in to send messages or the recipient is invalid.");
      return;
    }
    if (newMessageContent.trim() === "") {
      return;
    }

    const newMsg: DirectMessage = {
      id: `dm-msg-${Date.now()}`,
      conversationId: conversation.id,
      senderId: user.id,
      receiverId: otherParticipant.id,
      content: newMessageContent.trim(),
      timestamp: new Date().toISOString(),
    };

    // Update local state immediately for UI responsiveness
    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessageContent("");

    // Update local storage with the new message
    const allStoredMessages: DirectMessage[] = JSON.parse(
      localStorage.getItem(DIRECT_MESSAGES_STORAGE_KEY) || "[]"
    );
    const updatedAllMessages = [...allStoredMessages, newMsg];
    localStorage.setItem(DIRECT_MESSAGES_STORAGE_KEY, JSON.stringify(updatedAllMessages));

    // Update the last message content and timestamp in the conversation list
    const allStoredConversations: DirectConversation[] = JSON.parse(
      localStorage.getItem(DIRECT_CONVERSATIONS_STORAGE_KEY) || "[]"
    );
    const updatedAllConversations = allStoredConversations.map((conv) =>
      conv.id === conversation.id
        ? {
            ...conv,
            lastMessageContent: newMsg.content,
            lastMessageTimestamp: newMsg.timestamp,
          }
        : conv
    );
    localStorage.setItem(DIRECT_CONVERSATIONS_STORAGE_KEY, JSON.stringify(updatedAllConversations));

    onSendMessage(newMsg); // Notify parent about the new message
  };

  if (!otherParticipant) {
    return (
      <Card className="h-full flex items-center justify-center text-center text-muted-foreground shadow-lg">
        <p>Error: Could not find the other participant for this conversation.</p>
      </Card>
    );
  }

  const otherParticipantTextColorClass = otherParticipant.yearTag ? yearTagConfig[otherParticipant.yearTag].textColor : "";

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="border-b p-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${otherParticipant.username}`} alt={otherParticipant.username} />
            <AvatarFallback><UserCircle2 className="h-6 w-6" /></AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <span className={otherParticipantTextColorClass}>{otherParticipant.username}</span>
            {otherParticipant.yearTag && <UserYearTagDisplay yearTag={otherParticipant.yearTag} />}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground">Say hello to {otherParticipant.username}!</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.senderId === user?.id ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.senderId !== user?.id && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${otherParticipant.username}`} alt={otherParticipant.username} />
                      <AvatarFallback><UserCircle2 className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.senderId === user?.id
                        ? "bg-gradient-to-r from-app-light-blue to-app-light-purple text-black rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className={`text-xs font-semibold mb-1 ${msg.senderId === user?.id ? "" : otherParticipantTextColorClass}`}>
                      {msg.senderId === user?.id ? "You" : otherParticipant.username}
                    </p>
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs text-gray-700 text-right mt-1">
                      {format(new Date(msg.timestamp), "p")}
                    </p>
                  </div>
                  {msg.senderId === user?.id && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} alt={user.username} />
                      <AvatarFallback><UserCircle2 className="h-5 w-5" /></AvatarFallback>
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
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            disabled={!user}
          />
          <Button type="submit" size="icon" disabled={!user || newMessageContent.trim() === ""}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default DirectMessageDisplay;