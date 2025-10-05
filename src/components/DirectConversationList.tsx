"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DirectConversation, User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquareText, UserPlus, UserCircle2, Search } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import { getAllUsers } from "@/utils/auth";
import { toast } from "sonner";
import { formatDistanceToNowStrict } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DirectConversationListProps {
  conversations: DirectConversation[];
  onSelectConversation: (conversation: DirectConversation) => void;
  onCreateNewConversation: (newConversation: DirectConversation) => void;
  selectedConversationId: string | null;
}

const DirectConversationList: React.FC<DirectConversationListProps> = ({
  conversations,
  onSelectConversation,
  onCreateNewConversation,
  selectedConversationId,
}) => {
  const { user } = useAuth();
  const allUsers = useMemo(() => getAllUsers(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false);

  const getOtherParticipant = (conversation: DirectConversation): User | undefined => {
    if (!user) return undefined;
    const otherParticipantId = conversation.participants.find((p) => p !== user.id);
    return allUsers.find((u) => u.id === otherParticipantId);
  };

  const filteredUsersForNewConversation = useMemo(() => {
    if (!user) return [];
    const existingParticipantIds = new Set(
      conversations.flatMap((conv) => conv.participants.filter((p) => p !== user.id))
    );

    return allUsers.filter(
      (u) =>
        u.id !== user.id &&
        !existingParticipantIds.has(u.id) &&
        u.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allUsers, conversations, user, searchQuery]);

  const handleStartNewConversation = (targetUser: User) => {
    if (!user) {
      toast.error("You must be logged in to start a conversation.");
      return;
    }

    const newConversation: DirectConversation = {
      id: `dm-conv-${Date.now()}-${user.id}-${targetUser.id}`,
      participants: [user.id, targetUser.id],
      lastMessageContent: "Say hello!",
      lastMessageTimestamp: new Date().toISOString(),
    };

    onCreateNewConversation(newConversation);
    onSelectConversation(newConversation);
    setIsNewConversationDialogOpen(false);
    setSearchQuery("");
    toast.success(`Started new conversation with ${targetUser.username}`);
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="border-b p-4">
        <CardTitle className="flex items-center text-2xl font-bold">
          <MessageSquareText className="h-6 w-6 mr-2 text-app-purple" /> Direct Messages
        </CardTitle>
        <p className="text-sm text-muted-foreground">Your private conversations.</p>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <div className="p-4 border-b">
          <Dialog open={isNewConversationDialogOpen} onOpenChange={setIsNewConversationDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full gradient-button">
                <UserPlus className="h-4 w-4 mr-2" /> New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Start New Conversation</DialogTitle>
                <DialogDescription>
                  Select a user to start a new direct message conversation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-[200px]">
                  <div className="grid gap-2">
                    {filteredUsersForNewConversation.length > 0 ? (
                      filteredUsersForNewConversation.map((targetUser) => (
                        <Button
                          key={targetUser.id}
                          variant="ghost"
                          className="justify-start h-auto p-2"
                          onClick={() => handleStartNewConversation(targetUser)}
                        >
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${targetUser.username}`} alt={targetUser.username} />
                            <AvatarFallback><UserCircle2 className="h-5 w-5" /></AvatarFallback>
                          </Avatar>
                          {targetUser.username}
                        </Button>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground text-sm">
                        {searchQuery ? "No users found." : "No other users available to chat with."}
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <ScrollArea className="h-[calc(100%-60px)]"> {/* Adjust height based on "New Message" button */}
          <div className="p-2">
            {conversations.length === 0 ? (
              <p className="text-center text-muted-foreground p-4">
                No conversations yet. Click "New Message" to start one!
              </p>
            ) : (
              conversations.map((conv) => {
                const otherParticipant = getOtherParticipant(conv);
                if (!otherParticipant) return null; // Should not happen if data is consistent

                const timeAgo = formatDistanceToNowStrict(new Date(conv.lastMessageTimestamp), { addSuffix: true });

                return (
                  <Button
                    key={conv.id}
                    variant="ghost"
                    className={`w-full justify-start h-auto p-3 mb-1 ${
                      selectedConversationId === conv.id
                        ? "bg-app-light-blue/50 dark:bg-app-blue/20 text-app-purple font-semibold"
                        : ""
                    }`}
                    onClick={() => onSelectConversation(conv)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${otherParticipant.username}`} alt={otherParticipant.username} />
                      <AvatarFallback><UserCircle2 className="h-6 w-6" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{otherParticipant.username}</p>
                      <p className="text-xs text-muted-foreground truncate">{conv.lastMessageContent}</p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">{timeAgo}</span>
                  </Button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DirectConversationList;