"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageSquareText, Users, Code } from "lucide-react";
import { mockColleges, mockChatRooms, mockChatMessages, ChatRoom } from "@/lib/data";
import ChatRoomDisplay from "@/components/ChatRoomDisplay";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHAT_MESSAGES_STORAGE_KEY = "mockChatMessages";
const CHAT_ROOMS_STORAGE_KEY = "mockChatRooms";

const CollegeChats = () => {
  const [allChatRooms, setAllChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);

  useEffect(() => {
    // Initialize chat messages in local storage if not present
    if (!localStorage.getItem(CHAT_MESSAGES_STORAGE_KEY)) {
      localStorage.setItem(CHAT_MESSAGES_STORAGE_KEY, JSON.stringify(mockChatMessages));
    }

    // Generate dynamic branch chat rooms and combine with mockChatRooms
    const dynamicBranchRooms: ChatRoom[] = [];
    mockColleges.forEach(college => {
      college.details.availableBranches.forEach(branch => {
        const roomId = `chat-${college.id}-${branch.code.toLowerCase()}`;
        // Check if this specific branch chat room already exists in mockChatRooms
        const exists = mockChatRooms.some(room => room.id === roomId);
        if (!exists) {
          dynamicBranchRooms.push({
            id: roomId,
            name: `${college.name} - ${branch.name}`,
            type: "branch",
            collegeId: college.id,
            branchCode: branch.code,
            description: `Chat for ${branch.name} students at ${college.name}.`,
          });
        }
      });
    });

    const combinedRooms = [...mockChatRooms, ...dynamicBranchRooms];
    setAllChatRooms(combinedRooms);

    // Set a default selected room if none is selected
    if (!selectedRoom && combinedRooms.length > 0) {
      setSelectedRoom(combinedRooms[0]);
    }
  }, [selectedRoom]);

  const collegeChatRooms = useMemo(() => allChatRooms.filter(room => room.type === "college"), [allChatRooms]);
  const branchChatRooms = useMemo(() => allChatRooms.filter(room => room.type === "branch"), [allChatRooms]);

  return (
    <div className="flex h-[calc(100vh-100px)] max-w-6xl mx-auto">
      <Card className="w-1/3 flex flex-col shadow-lg mr-4">
        <CardHeader className="border-b p-4">
          <CardTitle className="flex items-center text-2xl font-bold">
            <MessageSquareText className="h-6 w-6 mr-2 text-app-purple" /> College Chats
          </CardTitle>
          <p className="text-sm text-muted-foreground">Join discussions with other students.</p>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Users className="h-4 w-4 mr-2 text-app-blue" /> General College Chats
              </h3>
              <div className="grid gap-2 mb-6">
                {collegeChatRooms.map((room) => (
                  <Button
                    key={room.id}
                    variant="ghost"
                    className={cn(
                      "justify-start text-left h-auto p-3",
                      selectedRoom?.id === room.id && "bg-app-light-blue/50 dark:bg-app-blue/20 text-app-purple font-semibold"
                    )}
                    onClick={() => setSelectedRoom(room)}
                  >
                    {room.name}
                    <p className="text-xs text-muted-foreground ml-auto">{room.type}</p>
                  </Button>
                ))}
              </div>

              <Separator className="my-4 bg-app-light-blue/50 dark:bg-app-blue/30" />

              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Code className="h-4 w-4 mr-2 text-app-blue" /> Branch-wise Chats
              </h3>
              <div className="grid gap-2">
                {branchChatRooms.map((room) => (
                  <Button
                    key={room.id}
                    variant="ghost"
                    className={cn(
                      "justify-start text-left h-auto p-3",
                      selectedRoom?.id === room.id && "bg-app-light-blue/50 dark:bg-app-blue/20 text-app-purple font-semibold"
                    )}
                    onClick={() => setSelectedRoom(room)}
                  >
                    {room.name}
                    <p className="text-xs text-muted-foreground ml-auto">{room.branchCode}</p>
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex-1">
        {selectedRoom ? (
          <ChatRoomDisplay chatRoom={selectedRoom} />
        ) : (
          <Card className="h-full flex items-center justify-center text-center text-muted-foreground shadow-lg">
            <p>Select a chat room to start chatting!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CollegeChats;