"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, UserX, Loader2, MessageSquareText } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import { sendFriendRequest, acceptFriendRequest, declineFriendRequest, getUserById } from "@/utils/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface FriendRequestButtonProps {
  targetUserId: string;
  variant?: "icon" | "default";
  onUpdate?: () => void; // Callback to refresh parent state if needed
}

const FriendRequestButton: React.FC<FriendRequestButtonProps> = ({
  targetUserId,
  variant = "icon",
  onUpdate,
}) => {
  const { user, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<
    "not-friends" | "request-sent" | "request-received" | "friends" | "loading"
  >("not-friends");

  useEffect(() => {
    if (authLoading || !user || !targetUserId || user.id === targetUserId) {
      return;
    }

    const currentUser = getUserById(user.id);
    if (!currentUser) {
      // This should ideally not happen if user is logged in, but as a safeguard
      logout();
      navigate("/login");
      return;
    }

    if (currentUser.friendIds.includes(targetUserId)) {
      setStatus("friends");
    } else if (currentUser.sentFriendRequests.includes(targetUserId)) {
      setStatus("request-sent");
    } else if (currentUser.receivedFriendRequests.includes(targetUserId)) {
      setStatus("request-received");
    } else {
      setStatus("not-friends");
    }
  }, [user, targetUserId, authLoading, onUpdate, logout, navigate]);

  const handleSendRequest = () => {
    if (!user) {
      toast.error("You must be logged in to send a friend request.");
      return;
    }
    setStatus("loading");
    const success = sendFriendRequest(user.id, targetUserId);
    if (success) {
      toast.success("Friend request sent!");
      setStatus("request-sent");
      onUpdate?.();
    } else {
      toast.error("Failed to send friend request.");
      setStatus("not-friends"); // Revert status
    }
  };

  const handleAcceptRequest = () => {
    if (!user) {
      toast.error("You must be logged in to accept a friend request.");
      return;
    }
    setStatus("loading");
    const success = acceptFriendRequest(targetUserId, user.id); // senderId, receiverId
    if (success) {
      toast.success("Friend request accepted! You are now friends.");
      setStatus("friends");
      onUpdate?.();
    } else {
      toast.error("Failed to accept friend request.");
      setStatus("request-received"); // Revert status
    }
  };

  const handleDeclineRequest = () => {
    if (!user) {
      toast.error("You must be logged in to decline a friend request.");
      return;
    }
    setStatus("loading");
    const success = declineFriendRequest(targetUserId, user.id); // senderId, receiverId
    if (success) {
      toast.info("Friend request declined.");
      setStatus("not-friends");
      onUpdate?.();
    } else {
      toast.error("Failed to decline friend request.");
      setStatus("request-received"); // Revert status
    }
  };

  if (authLoading || !user || user.id === targetUserId) {
    return null; // Don't show button if loading, not logged in, or trying to add self
  }

  if (status === "loading") {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="sr-only">Loading</span>
      </Button>
    );
  }

  if (status === "friends") {
    return (
      <Button variant="ghost" size="icon" disabled className="text-green-500 cursor-default">
        <UserCheck className="h-4 w-4" />
        <span className="sr-only">Friends</span>
      </Button>
    );
  }

  if (status === "request-sent") {
    return (
      <Button variant="ghost" size="icon" disabled className="text-muted-foreground cursor-default">
        <UserPlus className="h-4 w-4" />
        <span className="sr-only">Request Sent</span>
      </Button>
    );
  }

  if (status === "request-received") {
    return (
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" onClick={handleAcceptRequest} className="text-green-500">
          <UserCheck className="h-4 w-4" />
          <span className="sr-only">Accept Request</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDeclineRequest} className="text-red-500">
          <UserX className="h-4 w-4" />
          <span className="sr-only">Decline Request</span>
        </Button>
      </div>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleSendRequest} className="text-app-blue">
      <UserPlus className="h-4 w-4" />
      <span className="sr-only">Add Friend</span>
    </Button>
  );
};

export default FriendRequestButton;