"use client";

import React, { useMemo } from "react";
import { College, CasteCategory } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, GraduationCap, TrendingUp, Home, UtensilsCrossed, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

// Helper function to parse package strings like "₹10.2L" into numbers (e.g., 10.2)
const parsePackageToNumber = (packageStr: string): number => {
  if (!packageStr) return 0;
  const numericPart = parseFloat(packageStr.replace(/[₹L]/g, ''));
  return isNaN(numericPart) ? 0 : numericPart;
};

const CollegeComparisonDisplay: React.FC<CollegeComparisonDisplayProps> = ({ colleges, casteCategory }) => {
  if (colleges.length === 0) {
    return <p className="text-center text-muted-foreground p-8">No colleges selected for comparison.</p>;
  }

  const chartData = useMemo(() => {
    return colleges.map((college) => ({
      name: college.name,
      averagePackage: parsePackageToNumber(college.details.placementData.averagePackage),
      highestPackage: parsePackageToNumber(college.details.placementData.highestPackage),
    }));
  }, [colleges]);

  return (
    <ScrollArea className="h-[80vh] p-4">
      <h3 className="text-2xl font-bold mb-4 text-center gradient-text">College Comparison</h3>
      <p className="text-center text-muted-foreground mb-6">
        Compare key features of your shortlisted colleges side-by-side.
      </p>

      {/* Placement Data Charts */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-app-purple" /> Average Placement Package (LPA)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => [`₹${value}L`, "Average Package"]}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.375rem' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="averagePackage" fill="hsl(var(--app-blue))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-app-purple" /> Highest Placement Package (LPA)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => [`₹${value}L`, "Highest Package"]}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.375rem' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="highestPackage" fill="hsl(var(--app-purple))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

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