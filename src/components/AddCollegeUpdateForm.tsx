"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthContext";
import { CollegeUpdate } from "@/lib/types";
import { PlusCircle, Loader2 } from "lucide-react";
import { mockColleges } from "@/lib/data"; // To validate CET College Code

interface AddCollegeUpdateFormProps {
  onNewUpdate: (update: CollegeUpdate) => void;
}

const AddCollegeUpdateForm: React.FC<AddCollegeUpdateFormProps> = ({ onNewUpdate }) => {
  const { user, isLoading: authLoading } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to post an update.");
      return;
    }

    if (!user.cetCollegeCode) {
      toast.error("Your account does not have a CET College Code. Please update your profile or contact support to add one.");
      return;
    }

    // Validate if the user's CET College Code matches an existing college
    const userCollege = mockColleges.find(
      (college) => college.cetCollegeCode === user.cetCollegeCode
    );

    if (!userCollege) {
      toast.error("Your registered CET College Code does not match any known college. Cannot post update.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    const newUpdate: CollegeUpdate = {
      id: `update-${Date.now()}`,
      collegeName: userCollege.name,
      cetCollegeCode: user.cetCollegeCode,
      userId: user.id,
      username: user.username,
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim() || undefined,
      timestamp: new Date().toISOString(),
    };

    // In a real app, this would be an API call to save the update
    // For now, we'll pass it up to the parent component and store locally
    const existingUpdates = JSON.parse(localStorage.getItem("collegeUpdates") || "[]");
    const updatedUpdates = [newUpdate, ...existingUpdates];
    localStorage.setItem("collegeUpdates", JSON.stringify(updatedUpdates));

    onNewUpdate(newUpdate);
    setTitle("");
    setContent("");
    setImageUrl("");
    setIsSubmitting(false);
    toast.success("Your college update has been posted!");
  };

  if (authLoading) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-6 text-center text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" /> Loading user data...
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <PlusCircle className="h-5 w-5 mr-2 text-app-purple" /> Post a College Update
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          Please <Link to="/login" className="underline text-app-blue hover:text-app-purple">log in</Link> or <Link to="/signup" className="underline text-app-blue hover:text-app-purple">sign up</Link> to share updates from your college.
        </CardContent>
      </Card>
    );
  }

  if (!user.cetCollegeCode) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <PlusCircle className="h-5 w-5 mr-2 text-app-purple" /> Post a College Update
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          To post updates, your account needs a valid CET College Code. Please update your profile or contact support.
        </CardContent>
      </Card>
    );
  }

  const userCollege = mockColleges.find(
    (college) => college.cetCollegeCode === user.cetCollegeCode
  );

  if (!userCollege) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <PlusCircle className="h-5 w-5 mr-2 text-app-purple" /> Post a College Update
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          Your registered CET College Code ({user.cetCollegeCode}) does not match any known college. You cannot post updates.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <PlusCircle className="h-5 w-5 mr-2 text-app-purple" /> Post an Update from {userCollege.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Update Title</Label>
            <Input
              id="title"
              placeholder="e.g., Our college is hosting a hackathon!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Share details about the event, news, or announcement..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/event-poster.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full gradient-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" /> Post Update
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCollegeUpdateForm;