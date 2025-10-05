"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthContext";
import { MeetUp } from "@/lib/types";
import { PlusCircle, Loader2, Calendar, MapPin, Clock } from "lucide-react";
import { mockColleges } from "@/lib/data";
import { Link } from "react-router-dom";

interface AddMeetUpFormProps {
  onNewMeetUp: (meetUp: MeetUp) => void;
}

const AddMeetUpForm: React.FC<AddMeetUpFormProps> = ({ onNewMeetUp }) => {
  const { user, isLoading: authLoading } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create a meet-up.");
      return;
    }

    if (!user.cetCollegeCode) {
      toast.error("Your account does not have a CET College Code. Please update your profile or contact support to add one.");
      return;
    }

    const userCollege = mockColleges.find(
      (college) => college.cetCollegeCode === user.cetCollegeCode
    );

    if (!userCollege) {
      toast.error("Your registered CET College Code does not match any known college. Cannot create meet-up.");
      return;
    }

    if (!title.trim() || !description.trim() || !location.trim() || !date.trim() || !time.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    const newMeetUp: MeetUp = {
      id: `meetup-${Date.now()}`,
      collegeName: userCollege.name,
      cetCollegeCode: user.cetCollegeCode,
      userId: user.id,
      username: user.username,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      date: date.trim(),
      time: time.trim(),
      imageUrl: imageUrl.trim() || undefined,
      timestamp: new Date().toISOString(),
    };

    const existingMeetUps = JSON.parse(localStorage.getItem("meetUps") || "[]");
    const updatedMeetUps = [newMeetUp, ...existingMeetUps];
    localStorage.setItem("meetUps", JSON.stringify(updatedMeetUps));

    onNewMeetUp(newMeetUp);
    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");
    setTime("");
    setImageUrl("");
    setIsSubmitting(false);
    toast.success("Your meet-up has been created!");
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
            <PlusCircle className="h-5 w-5 mr-2 text-app-purple" /> Create a Meet-Up
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          Please <Link to="/login" className="underline text-app-blue hover:text-app-purple">log in</Link> or <Link to="/signup" className="underline text-app-blue hover:text-app-purple">sign up</Link> to create meet-ups.
        </CardContent>
      </Card>
    );
  }

  if (!user.cetCollegeCode) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <PlusCircle className="h-5 w-5 mr-2 text-app-purple" /> Create a Meet-Up
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          To create meet-ups, your account needs a valid CET College Code. Please update your profile or contact support.
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
            <PlusCircle className="h-5 w-5 mr-2 text-app-purple" /> Create a Meet-Up
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          Your registered CET College Code ({user.cetCollegeCode}) does not match any known college. You cannot create meet-ups.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <PlusCircle className="h-5 w-5 mr-2 text-app-purple" /> Create a Meet-Up from {userCollege.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Meet-Up Title</Label>
            <Input
              id="title"
              placeholder="e.g., Study Session for Mid-terms"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell us more about your meet-up..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location" className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-app-blue" /> Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., College Library, Cafeteria"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date" className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-app-blue" /> Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time" className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-app-blue" /> Time
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/meetup-photo.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full gradient-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" /> Create Meet-Up
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMeetUpForm;