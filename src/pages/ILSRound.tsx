"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockILSRounds } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Info, CalendarDays, IndianRupee, Link as LinkIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, formatDate } from "@/lib/utils";

const ILSRound = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleVisitWebsite = (collegeName: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(collegeName + " official website")}`;
    window.open(searchUrl, "_blank");
  };

  // Extract unique ILS dates for marking on the calendar
  const ilsDates = useMemo(() => {
    const dates = new Set<string>();
    mockILSRounds.forEach(round => {
      dates.add(round.date);
    });
    return Array.from(dates).map(d => new Date(d));
  }, []);

  // Filter ILS rounds based on the selected date
  const filteredILSRounds = useMemo(() => {
    if (!date) {
      return mockILSRounds;
    }
    const selectedDateString = formatDate(date, "yyyy-MM-dd");
    return mockILSRounds.filter(round => formatDate(round.date, "yyyy-MM-dd") === selectedDateString);
  }, [date]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center gradient-text">ILS Round Information</h2>
      <p className="text-center text-muted-foreground mb-8">
        Stay updated on Institute Level Seats (ILS) rounds for MHT-CET admissions.
      </p>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <Info className="h-6 w-6 mr-2 text-app-purple" /> What is an ILS Round?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            The Institute Level Seats (ILS) Round, also known as the Spot Admission Round, is conducted by individual colleges for seats that remain vacant after the Centralized Admission Process (CAP) rounds. These seats typically include management quota seats, NRI seats, or any CAP seats that were not filled.
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Students who did not get an allotment in CAP rounds, or wish to change their allotted college/branch, can participate in ILS rounds. The eligibility criteria and admission process for ILS rounds are determined by the respective colleges, usually based on MHT-CET scores, JEE Main scores, or HSC marks.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            It's crucial to regularly check the official websites of the colleges you are interested in for their specific ILS round announcements, dates, eligibility, and required documents.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <CalendarDays className="h-6 w-6 mr-2 text-app-purple" /> Upcoming ILS Rounds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {date ? formatDate(date) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  modifiers={{
                    highlighted: ilsDates,
                  }}
                  modifiersStyles={{
                    highlighted: {
                      backgroundColor: "hsl(var(--app-purple))",
                      color: "white",
                      borderRadius: "0.375rem", // rounded-md
                    },
                  }}
                />
              </PopoverContent>
            </Popover>
            {date && (
              <Button variant="outline" onClick={() => setDate(undefined)} className="w-full sm:w-auto">
                Clear Date Filter
              </Button>
            )}
          </div>

          {filteredILSRounds.length > 0 ? (
            <div className="grid gap-4">
              {filteredILSRounds.map((ils, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-md bg-app-light-blue/20 dark:bg-app-blue/10">
                    <div>
                      <h3 className="text-lg font-semibold text-app-purple">{ils.collegeName}</h3>
                      <p className="text-muted-foreground flex items-center text-sm mt-1">
                        <CalendarDays className="h-3 w-3 mr-1" /> Date: {formatDate(ils.date)}
                      </p>
                      <p className="text-muted-foreground flex items-center text-sm">
                        <IndianRupee className="h-3 w-3 mr-1" /> Estimated Fees: {ils.estimatedFees}
                      </p>
                      <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{ils.details}</p>
                    </div>
                    <Button variant="outline" className="mt-4 md:mt-0 flex items-center gap-1" onClick={() => handleVisitWebsite(ils.collegeName)}>
                      <LinkIcon className="h-4 w-4" /> Visit College Website
                    </Button>
                  </div>
                  {index < filteredILSRounds.length - 1 && <Separator className="my-2 bg-app-light-blue/50 dark:bg-app-blue/30" />}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground p-4">
              {date ? `No ILS rounds found for ${formatDate(date)}.` : "No upcoming ILS rounds found at the moment. Please check back later."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ILSRound;