"use client";

import React from "react";
import { College, CasteCategory } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, GraduationCap, TrendingUp, Home, UtensilsCrossed, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CollegeComparisonDisplayProps {
  colleges: College[];
  casteCategory: CasteCategory;
}

const StarRatingDisplay = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-current" />
      ))}
      {halfStar && <Star key="half" className="h-4 w-4 fill-current opacity-50" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">({rating.toFixed(1)})</span>
    </div>
  );
};

const CollegeComparisonDisplay: React.FC<CollegeComparisonDisplayProps> = ({ colleges, casteCategory }) => {
  if (colleges.length === 0) {
    return <p className="text-center text-muted-foreground p-8">No colleges selected for comparison.</p>;
  }

  return (
    <ScrollArea className="h-[80vh] p-4">
      <h3 className="text-2xl font-bold mb-4 text-center gradient-text">College Comparison</h3>
      <p className="text-center text-muted-foreground mb-6">
        Compare key features of your shortlisted colleges side-by-side.
      </p>
      <div className="overflow-x-auto">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-app-light-blue/30 dark:bg-app-blue/20">
              <TableHead className="w-[150px] sticky left-0 bg-app-light-blue/30 dark:bg-app-blue/20 z-10">Feature</TableHead>
              {colleges.map((college) => (
                <TableHead key={college.id} className="text-center font-semibold text-app-purple">
                  {college.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                <div className="flex items-center"><GraduationCap className="h-4 w-4 mr-2 text-app-blue" /> CET Code</div>
              </TableCell>
              {colleges.map((college) => (
                <TableCell key={college.id} className="text-center">{college.cetCollegeCode}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                <div className="flex items-center"><TrendingUp className="h-4 w-4 mr-2 text-app-blue" /> Overall Cutoff ({casteCategory})</div>
              </TableCell>
              {colleges.map((college) => (
                <TableCell key={college.id} className="text-center font-bold text-app-purple">
                  {college.percentileCutoff[casteCategory]}%
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                <div className="flex items-center"><TrendingUp className="h-4 w-4 mr-2 text-app-blue" /> Avg. Package</div>
              </TableCell>
              {colleges.map((college) => (
                <TableCell key={college.id} className="text-center">{college.details.placementData.averagePackage}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                <div className="flex items-center"><TrendingUp className="h-4 w-4 mr-2 text-app-blue" /> Highest Package</div>
              </TableCell>
              {colleges.map((college) => (
                <TableCell key={college.id} className="text-center">{college.details.placementData.highestPackage}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                <div className="flex items-center"><Code className="h-4 w-4 mr-2 text-app-blue" /> Top Branches</div>
              </TableCell>
              {colleges.map((college) => (
                <TableCell key={college.id} className="text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    {college.details.availableBranches.slice(0, 3).map((branch, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{branch.code}</Badge>
                    ))}
                    {college.details.availableBranches.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{college.details.availableBranches.length - 3}</Badge>
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                <div className="flex items-center"><Home className="h-4 w-4 mr-2 text-app-blue" /> Hostel Rating</div>
              </TableCell>
              {colleges.map((college) => (
                <TableCell key={college.id} className="text-center">
                  {college.details.hostelInfo ? (
                    <StarRatingDisplay rating={college.details.hostelInfo.rating} />
                  ) : (
                    <span className="text-muted-foreground text-sm">N/A</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                <div className="flex items-center"><UtensilsCrossed className="h-4 w-4 mr-2 text-app-blue" /> Mess Rating</div>
              </TableCell>
              {colleges.map((college) => (
                <TableCell key={college.id} className="text-center">
                  {college.details.hostelInfo ? (
                    <StarRatingDisplay rating={college.details.hostelInfo.messRating} />
                  ) : (
                    <span className="text-muted-foreground text-sm">N/A</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                <div className="flex items-center"><Home className="h-4 w-4 mr-2 text-app-blue" /> Hostel Distance</div>
              </TableCell>
              {colleges.map((college) => (
                <TableCell key={college.id} className="text-center">
                  {college.details.hostelInfo ? (
                    college.details.hostelInfo.distanceFromCollege
                  ) : (
                    <span className="text-muted-foreground text-sm">N/A</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};

export default CollegeComparisonDisplay;