"use client";

import React from "react";
import { College, CasteCategory } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ShortlistedCollegesDisplayProps {
  shortlistedColleges: College[];
  casteCategory: CasteCategory;
}

const ShortlistedCollegesDisplay: React.FC<ShortlistedCollegesDisplayProps> = ({
  shortlistedColleges,
  casteCategory,
}) => {
  if (shortlistedColleges.length === 0) {
    return <p className="text-center text-muted-foreground">No colleges have been shortlisted yet.</p>;
  }

  return (
    <ScrollArea className="h-[70vh] p-4">
      <h3 className="text-2xl font-bold mb-4">Your Shortlisted Colleges for Option Filling</h3>
      <p className="text-muted-foreground mb-6">
        Based on your MHT-CET percentile and {casteCategory} category.
      </p>
      <div className="grid gap-6">
        {shortlistedColleges.map((college, index) => (
          <Card key={college.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">{college.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{college.city}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Your Category Cutoff:</strong> {college.percentileCutoff[casteCategory]}%</p>
              <p><strong>Highlights:</strong> {college.details.highlights.join(", ")}</p>
              {/* You can add more details here, e.g., specific branches if available in mock data */}
              <p className="text-sm text-gray-500">
                *Remember to verify branch-specific cutoffs and availability on the official college website.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ShortlistedCollegesDisplay;