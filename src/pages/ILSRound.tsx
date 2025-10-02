"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockILSRounds } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"; // Ensure Button is imported

const ILSRound = () => {
  const handleVisitWebsite = (collegeName: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(collegeName + " official website")}`;
    window.open(searchUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">ILS Round Information</h2>

      <Card>
        <CardHeader>
          <CardTitle>What is an ILS Round?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The Institute Level Seats (ILS) Round, also known as the Spot Admission Round, is conducted by individual colleges for seats that remain vacant after the Centralized Admission Process (CAP) rounds. These seats typically include management quota seats, NRI seats, or any CAP seats that were not filled.
          </p>
          <p className="mb-4">
            Students who did not get an allotment in CAP rounds, or wish to change their allotted college/branch, can participate in ILS rounds. The eligibility criteria and admission process for ILS rounds are determined by the respective colleges, usually based on MHT-CET scores, JEE Main scores, or HSC marks.
          </p>
          <p>
            It's crucial to regularly check the official websites of the colleges you are interested in for their specific ILS round announcements, dates, eligibility, and required documents.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming ILS Rounds</CardTitle>
        </CardHeader>
        <CardContent>
          {mockILSRounds.length > 0 ? (
            <div className="grid gap-4">
              {mockILSRounds.map((ils, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="text-lg font-semibold">{ils.collegeName}</h3>
                      <p className="text-muted-foreground">Date: {ils.date}</p>
                      <p className="text-muted-foreground">Estimated Fees: {ils.estimatedFees}</p>
                      <p className="text-sm mt-2">{ils.details}</p>
                    </div>
                    <Button variant="outline" className="mt-2 md:mt-0" onClick={() => handleVisitWebsite(ils.collegeName)}>
                      Visit College Website
                    </Button>
                  </div>
                  {index < mockILSRounds.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <p>No upcoming ILS rounds found at the moment. Please check back later.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ILSRound;