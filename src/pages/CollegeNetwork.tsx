"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCollegeUpdates, mockMeetUps } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageSquareText, Users, CalendarDays } from "lucide-react";
import CollegeUpdateCard from "@/components/CollegeUpdateCard";
import AddCollegeUpdateForm from "@/components/AddCollegeUpdateForm";
import AddMeetUpForm from "@/components/AddMeetUpForm"; // Import the new MeetUp form
import MeetUpCard from "@/components/MeetUpCard"; // Import the new MeetUp card
import { CollegeUpdate, MeetUp } from "@/lib/types";

const COLLEGE_UPDATES_STORAGE_KEY = "collegeUpdates";
const MEET_UPS_STORAGE_KEY = "meetUps"; // New storage key for meet-ups

const CollegeNetwork = () => {
  const [updates, setUpdates] = useState<CollegeUpdate[]>([]);
  const [meetUps, setMeetUps] = useState<MeetUp[]>([]); // New state for meet-ups

  useEffect(() => {
    // Load updates from local storage, falling back to mock data if none exist
    const storedUpdates = localStorage.getItem(COLLEGE_UPDATES_STORAGE_KEY);
    if (storedUpdates) {
      setUpdates(JSON.parse(storedUpdates));
    } else {
      setUpdates(mockCollegeUpdates);
      localStorage.setItem(COLLEGE_UPDATES_STORAGE_KEY, JSON.stringify(mockCollegeUpdates));
    }

    // Load meet-ups from local storage, falling back to mock data if none exist
    const storedMeetUps = localStorage.getItem(MEET_UPS_STORAGE_KEY);
    if (storedMeetUps) {
      setMeetUps(JSON.parse(storedMeetUps));
    } else {
      setMeetUps(mockMeetUps);
      localStorage.setItem(MEET_UPS_STORAGE_KEY, JSON.stringify(mockMeetUps));
    }
  }, []);

  const handleNewUpdate = (newUpdate: CollegeUpdate) => {
    setUpdates(prevUpdates => [newUpdate, ...prevUpdates]);
  };

  const handleNewMeetUp = (newMeetUp: MeetUp) => {
    setMeetUps(prevMeetUps => [newMeetUp, ...prevMeetUps]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center gradient-text">College Network</h2>
      <p className="text-center text-muted-foreground mb-8">
        Connect with students and stay updated on events, news, announcements, and meet-ups from various colleges.
      </p>

      {/* College Updates Section */}
      <AddCollegeUpdateForm onNewUpdate={handleNewUpdate} />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <MessageSquareText className="h-6 w-6 mr-2 text-app-purple" /> Latest College Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {updates.length > 0 ? (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="grid gap-6">
                {updates.map((update) => (
                  <CollegeUpdateCard key={update.id} update={update} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-center text-muted-foreground p-4">No college updates available yet.</p>
          )}
        </CardContent>
      </Card>

      <Separator className="my-8 bg-app-light-blue/50 dark:bg-app-blue/30" />

      {/* Meet-Up Section */}
      <AddMeetUpForm onNewMeetUp={handleNewMeetUp} />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <CalendarDays className="h-6 w-6 mr-2 text-app-purple" /> Upcoming Meet-Ups & Parties
          </CardTitle>
        </CardHeader>
        <CardContent>
          {meetUps.length > 0 ? (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="grid gap-6">
                {meetUps.map((meetUp) => (
                  <MeetUpCard key={meetUp.id} meetUp={meetUp} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-center text-muted-foreground p-4">No meet-ups or parties planned yet. Be the first to create one!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeNetwork;