"use client";

import React from "react";
import { College, CasteCategory } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MapPin, TrendingUp, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ShortlistedCollegesDisplayProps {
  shortlistedColleges: College[];
  casteCategory: CasteCategory;
}

const ShortlistedCollegesDisplay: React.FC<ShortlistedCollegesDisplayProps> = ({
  shortlistedColleges,
  casteCategory,
}) => {
  if (shortlistedColleges.length === 0) {
    return <p className="text-center text-muted-foreground p-8">No colleges have been shortlisted yet.</p>;
  }

  return (
    <ScrollArea className="h-[70vh] p-4">
      <h3 className="text-2xl font-bold mb-4">Your Shortlisted Colleges for Option Filling</h3>
      <p className="text-muted-foreground mb-6">
        Based on your MHT-CET percentile and {casteCategory} category.
      </p>
      <div className="grid gap-6">
        {shortlistedColleges.map((college) => (
          <Card key={college.id} className="shadow-md flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
              <img
                src={college.details.picture}
                alt={college.name}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-xl flex items-center justify-between">
                  {college.name}
                  <Badge variant="secondary" className="ml-2">{college.type}</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" /> {college.city}
                </p>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                  Avg: {college.details.placementData.averagePackage} | Highest: {college.details.placementData.highestPackage}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {college.details.availableBranches.slice(0, 3).map((branch, i) => (
                    <Badge key={i} variant="outline">{branch}</Badge>
                  ))}
                  {college.details.availableBranches.length > 3 && (
                    <Badge variant="outline">+{college.details.availableBranches.length - 3} more</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  *Remember to verify branch-specific cutoffs and availability on the official college website.
                </p>
              </CardContent>
            </div>
            <div className="md:w-1/4 lg:w-1/5 flex-shrink-0 p-4 bg-app-light-blue/30 dark:bg-app-blue/20 flex flex-col justify-center items-center">
              <p className="text-sm text-muted-foreground mb-1">Cut-off</p>
              <p className="text-2xl font-bold text-app-purple">{college.percentileCutoff[casteCategory]}%</p>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ShortlistedCollegesDisplay;