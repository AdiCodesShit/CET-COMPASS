"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, UserCircle2 } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import { updateUserInStorage, getUserById } from "@/utils/auth";
import { UserYearTag, User } from "@/lib/types";
import { toast } from "sonner";

interface UserProfileSettingsProps {
  onClose: () => void; // Callback to close the dialog
}

const UserProfileSettings: React.FC<UserProfileSettingsProps> = ({ onClose }) => {
  const { user, isLoading: authLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [cetCollegeCode, setCetCollegeCode] = useState("");
  const [yearTag, setYearTag] = useState<UserYearTag | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      // Fetch the most up-to-date user data from storage
      const currentUserData = getUserById(user.id);
      if (currentUserData) {
        setUsername(currentUserData.username);
        setCetCollegeCode(currentUserData.cetCollegeCode || "");
        setYearTag(currentUserData.yearTag);
      }
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to update your profile.");
      return;
    }

    if (!username.trim()) {
      toast.error("Username cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    const updatedUser: User = {
      ...user,
      username: username.trim(),
      cetCollegeCode: cetCollegeCode.trim() || undefined,
      yearTag: yearTag,
    };

    try {
      updateUserInStorage(updatedUser);
      toast.success("Profile updated successfully!");
      onClose(); // Close the dialog on success
    } catch (error) {
      console.error("Failed to update user profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <CardContent className="p-6 text-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" /> Loading user data...
      </CardContent>
    );
  }

  if (!user) {
    return (
      <CardContent className="p-6 text-center text-muted-foreground">
        Please log in to view and edit your profile.
      </CardContent>
    );
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <UserCircle2 className="h-6 w-6 mr-2 text-app-purple" /> Edit Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Your Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email (Cannot be changed)</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="cursor-not-allowed bg-muted"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="yearTag">Your Academic Year</Label>
            <Select value={yearTag} onValueChange={(value: UserYearTag) => setYearTag(value)}>
              <SelectTrigger id="yearTag">
                <SelectValue placeholder="Select your academic year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Newcomer">Newcomer</SelectItem>
                <SelectItem value="FirstYear">First Year</SelectItem>
                <SelectItem value="SecondYear">Second Year</SelectItem>
                <SelectItem value="ThirdYear">Third Year</SelectItem>
                <SelectItem value="FinalYear">Final Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cetCollegeCode">Your CET College Code (Optional)</Label>
            <Input
              id="cetCollegeCode"
              type="text"
              placeholder="e.g., EN6006 (COEP)"
              value={cetCollegeCode}
              onChange={(e) => setCetCollegeCode(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              This code helps verify your student status for college reviews.
            </p>
          </div>
          <Button type="submit" className="w-full gradient-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileSettings;