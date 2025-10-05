"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCollegeUpdates } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageSquareText } from "lucide-react";
import CollegeUpdateCard from "@/components/CollegeUpdateCard";
import AddCollegeUpdateForm from "@/components/AddCollegeUpdateForm";
import { CollegeUpdate } from "@/lib/types";

const COLLEGE_UPDATES_STORAGE_KEY = "collegeUpdates";

const CollegeNetwork = () => {
  const [updates, setUpdates] = useState<CollegeUpdate[]>([]);

  useEffect(() => {
    // Load updates from local storage, falling back to mock data if none exist
    const storedUpdates = localStorage.getItem(COLLEGE_UPDATES_STORAGE_KEY);
    if (storedUpdates) {
      setUpdates(JSON.parse(storedUpdates));
    } else {
      setUpdates(mockCollegeUpdates);
      localStorage.setItem(COLLEGE_UPDATES_STORAGE_KEY, JSON.stringify(mockCollegeUpdates));
    }
  }, []);

  const handleNewUpdate = (newUpdate: CollegeUpdate) => {
    setUpdates(prevUpdates => [newUpdate, ...prevUpdates]);
    // The AddCollegeUpdateForm already saves to local storage, so no need to do it here again.
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center gradient-text">College Network</h2>
      <p className="text-center text-muted-foreground mb-8">
        Connect with students and stay updated on events, news, and announcements from various colleges.
      </p>

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
    </div>
  );
};

export default CollegeNetwork;