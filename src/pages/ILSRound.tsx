"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockILSRounds } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Info, CalendarDays, IndianRupee, Link as LinkIcon } from "lucide-react"; // Added icons

const ILSRound = () => {
  const handleVisitWebsite = (collegeName: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(collegeName + " official website")}`;
    window.open(searchUrl, "_blank");
  };

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
          <div className="mt-6">
            <video controls className="w-full rounded-lg shadow-md" poster="/placeholder.svg">
              <source src="/The BEST 3D Explainer Video Example - Cargoz.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Watch this video to understand the ILS Round process better.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <CalendarDays className="h-6 w-6 mr-2 text-app-purple" /> Upcoming ILS Rounds
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mockILSRounds.length > 0 ? (
            <div className="grid gap-4">
              {mockILSRounds.map((ils, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-md bg-app-light-blue/20 dark:bg-app-blue/10">
                    <div>
                      <h3 className="text-lg font-semibold text-app-purple">{ils.collegeName}</h3>
                      <p className="text-muted-foreground flex items-center text-sm mt-1">
                        <CalendarDays className="h-3 w-3 mr-1" /> Date: {ils.date}
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
                  {index < mockILSRounds.length - 1 && <Separator className="my-2 bg-app-light-blue/50 dark:bg-app-blue/30" />}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground p-4">No upcoming ILS rounds found at the moment. Please check back later.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ILSRound;