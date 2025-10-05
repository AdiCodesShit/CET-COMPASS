"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockColleges, mockCollegeUpdates, mockMeetUps } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageSquareText, Users, CalendarDays, ListFilter, ArrowDownWideNarrow } from "lucide-react";
import CollegeUpdateCard from "@/components/CollegeUpdateCard";
import AddCollegeUpdateForm from "@/components/AddCollegeUpdateForm";
import AddMeetUpForm from "@/components/AddMeetUpForm";
import MeetUpCard from "@/components/MeetUpCard";
import { CollegeUpdate, MeetUp } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const COLLEGE_UPDATES_STORAGE_KEY = "collegeUpdates";
const MEET_UPS_STORAGE_KEY = "meetUps";

const CollegeNetwork = () => {
  const [allUpdates, setAllUpdates] = useState<CollegeUpdate[]>([]);
  const [allMeetUps, setAllMeetUps] = useState<MeetUp[]>([]);
  const [selectedCollegeFilter, setSelectedCollegeFilter] = useState<string>("all"); // 'all' or cetCollegeCode
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    const storedUpdates = localStorage.getItem(COLLEGE_UPDATES_STORAGE_KEY);
    if (storedUpdates) {
      setAllUpdates(JSON.parse(storedUpdates));
    } else {
      setAllUpdates(mockCollegeUpdates);
      localStorage.setItem(COLLEGE_UPDATES_STORAGE_KEY, JSON.stringify(mockCollegeUpdates));
    }

    const storedMeetUps = localStorage.getItem(MEET_UPS_STORAGE_KEY);
    if (storedMeetUps) {
      setAllMeetUps(JSON.parse(storedMeetUps));
    } else {
      setAllMeetUps(mockMeetUps);
      localStorage.setItem(MEET_UPS_STORAGE_KEY, JSON.stringify(mockMeetUps));
    }
  }, []);

  const handleNewUpdate = (newUpdate: CollegeUpdate) => {
    setAllUpdates(prevUpdates => [newUpdate, ...prevUpdates]);
  };

  const handleNewMeetUp = (newMeetUp: MeetUp) => {
    setAllMeetUps(prevMeetUps => [newMeetUp, ...prevMeetUps]);
  };

  const handleUpdateMeetUp = (updatedMeetUp: MeetUp) => {
    setAllMeetUps(prevMeetUps =>
      prevMeetUps.map(meetUp => (meetUp.id === updatedMeetUp.id ? updatedMeetUp : meetUp))
    );
  };

  const collegeOptions = useMemo(() => {
    const uniqueColleges = new Map<string, string>(); // cetCollegeCode -> collegeName
    mockColleges.forEach(college => {
      uniqueColleges.set(college.cetCollegeCode, college.name);
    });
    return Array.from(uniqueColleges.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, []);

  const filteredAndSortedUpdates = useMemo(() => {
    let filtered = allUpdates;
    if (selectedCollegeFilter !== "all") {
      filtered = filtered.filter(update => update.cetCollegeCode === selectedCollegeFilter);
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [allUpdates, selectedCollegeFilter, sortOrder]);

  const filteredAndSortedMeetUps = useMemo(() => {
    let filtered = allMeetUps;
    if (selectedCollegeFilter !== "all") {
      filtered = filtered.filter(meetUp => meetUp.cetCollegeCode === selectedCollegeFilter);
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [allMeetUps, selectedCollegeFilter, sortOrder]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center gradient-text">College Network</h2>
      <p className="text-center text-muted-foreground mb-8">
        Connect with students and stay updated on events, news, announcements, and meet-ups from various colleges.
      </p>

      {/* Filter and Sort Controls */}
      <Card className="shadow-lg p-4 mb-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl font-bold flex items-center">
            <ListFilter className="h-5 w-5 mr-2 text-app-purple" /> Filter & Sort
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="college-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by College
            </Label>
            <Select value={selectedCollegeFilter} onValueChange={setSelectedCollegeFilter}>
              <SelectTrigger id="college-filter">
                <SelectValue placeholder="All Colleges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                {collegeOptions.map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name} ({code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort by Date
            </Label>
            <Select value={sortOrder} onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}>
              <SelectTrigger id="sort-order">
                <SelectValue placeholder="Newest First" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* College Updates Section */}
      <AddCollegeUpdateForm onNewUpdate={handleNewUpdate} />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <MessageSquareText className="h-6 w-6 mr-2 text-app-purple" /> Latest College Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAndSortedUpdates.length > 0 ? (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="grid gap-6">
                {filteredAndSortedUpdates.map((update) => (
                  <CollegeUpdateCard key={update.id} update={update} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-center text-muted-foreground p-4">No college updates available yet for the selected filters.</p>
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
          {filteredAndSortedMeetUps.length > 0 ? (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="grid gap-6">
                {filteredAndSortedMeetUps.map((meetUp) => (
                  <MeetUpCard key={meetUp.id} meetUp={meetUp} onUpdateMeetUp={handleUpdateMeetUp} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-center text-muted-foreground p-4">No meet-ups or parties planned yet for the selected filters. Be the first to create one!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeNetwork;