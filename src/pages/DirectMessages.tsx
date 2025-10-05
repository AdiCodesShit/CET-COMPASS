"use client";

import React, { useState, useEffect } from "react";
import { DirectConversation, DirectMessage } from "@/lib/types";
import { Card } from "@/components/ui/card";
import DirectConversationList from "@/components/DirectConversationList";
import DirectMessageDisplay from "@/components/DirectMessageDisplay";
import { useAuth } from "@/components/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const DIRECT_CONVERSATIONS_STORAGE_KEY = "mockDirectConversations";

const DirectMessages = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<DirectConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<DirectConversation | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("You need to be logged in to view direct messages.");
      navigate("/login");
      return;
    }

    if (user) {
      const storedConversations: DirectConversation[] = JSON.parse(
        localStorage.getItem(DIRECT_CONVERSATIONS_STORAGE_KEY) || "[]"
      );
      // Filter conversations to only show those involving the current user
      const userConversations = storedConversations.filter((conv) =>
        conv.participants.includes(user.id)
      );
      // Sort conversations by last message timestamp (newest first)
      userConversations.sort((a, b) =>
        new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime()
      );
      setConversations(userConversations);

      // If a conversation was previously selected and still exists, re-select it
      if (selectedConversation) {
        const reSelected = userConversations.find(c => c.id === selectedConversation.id);
        setSelectedConversation(reSelected || null);
      } else if (userConversations.length > 0) {
        // Otherwise, select the newest conversation by default
        setSelectedConversation(userConversations[0]);
      }
    }
  }, [user, authLoading, navigate]); // Re-run when user or authLoading changes

  const handleSelectConversation = (conv: DirectConversation) => {
    setSelectedConversation(conv);
  };

  const handleCreateNewConversation = (newConv: DirectConversation) => {
    setConversations((prev) => {
      const updated = [newConv, ...prev];
      // Ensure the new conversation is saved to local storage
      const allStoredConversations = JSON.parse(localStorage.getItem(DIRECT_CONVERSATIONS_STORAGE_KEY) || "[]");
      localStorage.setItem(DIRECT_CONVERSATIONS_STORAGE_KEY, JSON.stringify([...allStoredConversations, newConv]));
      return updated;
    });
  };

  const handleSendMessage = (message: DirectMessage) => {
    // Update the last message of the conversation in the list
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === message.conversationId
          ? {
              ...conv,
              lastMessageContent: message.content,
              lastMessageTimestamp: message.timestamp,
            }
          : conv
      ).sort((a, b) =>
        new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime()
      )
    );
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <Loader2 className="h-8 w-8 animate-spin text-app-purple" />
        <p className="ml-2 text-muted-foreground">Loading user data...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="flex h-[calc(100vh-100px)] max-w-6xl mx-auto">
      <div className="w-1/3 mr-4">
        <DirectConversationList
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          onCreateNewConversation={handleCreateNewConversation}
          selectedConversationId={selectedConversation?.id || null}
        />
      </div>
      <div className="flex-1">
        {selectedConversation ? (
          <DirectMessageDisplay
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <Card className="h-full flex items-center justify-center text-center text-muted-foreground shadow-lg">
            <p>Select a conversation or start a new one!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DirectMessages;