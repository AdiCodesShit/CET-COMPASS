"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { mockColleges, CasteCategory, College, CollegeType } from "@/lib/data";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShortlistedCollegesDisplay from "@/components/ShortlistedCollegesDisplay";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Star, Users, Lightbulb, CheckCircle, GraduationCap } from "lucide-react";
import { Label } from "@/components/ui/label"; // Import Label component

interface CollegeDetailProps {
  college: College;
}

const CollegeDetail: React.FC<CollegeDetailProps> = ({ college }) => (
  <ScrollArea className="h-[80vh] p-0">
    <div className="relative h-60 w-full">
      <img src={college.details.picture} alt={college.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
        <Badge className="absolute top-4 left-4 bg-white/80 text-black">{college.type}</Badge>
        <h3 className="text-3xl font-bold text-white mb-1">{college.name}</h3>
        <p className="text-white/90 flex items-center">
          <MapPin className="h-4 w-4 mr-2" /> {college.city}
        </p>
      </div>
    </div>
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Lightbulb className="h-5 w-5 mr-2 text-app-purple" /> Main Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              {college.details.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2 text-app-purple" /> Campus Life
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{college.details.campusLife}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Star className="h-5 w-5 mr-2 text-app-purple" /> Student Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {college.details.studentReviews.map((review, i) => (
              <div key={i} className="border-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                  <span>{review.name} ({review.year})</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    {review.rating}/5
                  </div>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-app-light-blue/30 dark:bg-app-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="h-5 w-5 mr-2 text-app-purple" /> Placement Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Average Package</p>
              <p className="text-2xl font-bold text-app-purple">{college.details.placementData.averagePackage}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Highest Package</p>
              <p className="text-2xl font-bold text-app-purple">{college.details.placementData.highestPackage}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Top Recruiters</p>
              <div className="flex flex-wrap gap-2">
                {college.details.placementData.topRecruiters.map((recruiter, i) => (
                  <Badge key={i} variant="secondary">{recruiter}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <GraduationCap className="h-5 w-5 mr-2 text-app-purple" /> Cut-off Percentiles
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {Object.entries(college.details.cutOffPercentiles).map(([category, cutoff]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm font-medium">{category}</span>
                <span className="text-sm text-app-purple font-semibold">{cutoff}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <CheckCircle className="h-5 w-5 mr-2 text-app-purple" /> Available Branches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {college.details.availableBranches.map((branch, i) => (
                <Badge key={i} variant="outline">{branch}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </ScrollArea>
);

const cityOptions = ["Mumbai", "Pune", "Aurangabad", "Nagpur", "Nashik", "Sangli", "Kolhapur", "Thane", "Navi Mumbai"];
const collegeTypeFilters: (CollegeType | "All")[] = ["All", "Government", "Autonomous", "Private"];

const CollegeFinder = () => {
  const [percentile, setPercentile] = useState<string>("");
  const [casteCategory, setCasteCategory] = useState<CasteCategory>("OPEN");
  const [cityPreferences, setCityPreferences] = useState<string[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [shortlistedColleges, setShortlistedColleges] = useState<string[]>(() => {
    const storedShortlist = localStorage.getItem('shortlistedColleges');
    return storedShortlist ? JSON.parse(storedShortlist) : [];
  });
  const [showShortlistDialog, setShowShortlistDialog] = useState(false);
  const [activeTypeFilter, setActiveTypeFilter] = useState<CollegeType | "All">("All");

  useEffect(() => {
    localStorage.setItem('shortlistedColleges', JSON.stringify(shortlistedColleges));
  }, [shortlistedColleges]);

  const handleSearch = () => {
    const userPercentile = parseFloat(percentile);
    if (isNaN(userPercentile) || userPercentile < 0 || userPercentile > 100) {
      toast.error("Please enter a valid percentile between 0 and 100.");
      return;
    }

    let results = mockColleges.filter(college => {
      const cutoff = college.percentileCutoff[casteCategory];
      return userPercentile >= cutoff;
    });

    // Apply type filter
    if (activeTypeFilter !== "All") {
      results = results.filter(college => college.type === activeTypeFilter);
    }

    // Sort by city preference first, then by cutoff
    results.sort((a, b) => {
      const aIsPreferredCity = cityPreferences.includes(a.city);
      const bIsPreferredCity = cityPreferences.includes(b.city);

      if (aIsPreferredCity && !bIsPreferredCity) return -1;
      if (!aIsPreferredCity && bIsPreferredCity) return 1;

      // If both or neither are preferred city, sort by cutoff (descending)
      return b.percentileCutoff[casteCategory] - a.percentileCutoff[casteCategory];
    });

    setFilteredColleges(results);
    if (results.length === 0) {
      toast.info("No colleges found matching your criteria.");
    } else {
      toast.success(`${results.length} colleges found!`);
    }
  };

  const handleShortlistToggle = (collegeId: string) => {
    setShortlistedColleges(prev => {
      const newShortlist = prev.includes(collegeId)
        ? prev.filter(id => id !== collegeId)
        : [...prev, collegeId];
      // Update the count in the Layout component (if it were using context)
      // For now, this will trigger the useEffect in Layout to re-read localStorage
      return newShortlist;
    });
  };

  const handleCityPreferenceToggle = (city: string) => {
    setCityPreferences(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const finalShortlistedColleges = mockColleges.filter(college => shortlistedColleges.includes(college.id));

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-10">
        <Badge variant="secondary" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-app-light-blue text-app-blue">
          <CheckCircle className="h-4 w-4 mr-2" /> Trusted by 50,000+ Students
        </Badge>
        <h1 className="text-5xl font-extrabold tracking-tight gradient-text">
          Find Your Dream Engineering College
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get personalized college recommendations based on your MHT-CET percentile.
          Compare colleges, explore details, and create your perfect option filling list.
        </p>
      </div>

      {/* Input Card */}
      <Card className="max-w-3xl mx-auto shadow-lg p-6">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold flex items-center justify-center">
            <TrendingUp className="h-6 w-6 mr-2 text-app-purple" /> Your MHT-CET Percentile
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <Label htmlFor="percentile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enter your percentile (e.g., 95.5)
            </Label>
            <Input
              id="percentile"
              type="number"
              step="0.01"
              placeholder="Enter your percentile (e.g., 95.5)"
              value={percentile}
              onChange={(e) => setPercentile(e.target.value)}
              max={100}
              min={0}
            />
            <p className="text-xs text-muted-foreground mt-1">Enter a value between 0 and 100</p>
          </div>
          <div>
            <Label htmlFor="casteCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Users className="h-4 w-4 inline-block mr-1 text-app-purple" /> Caste Category
            </Label>
            <Select value={casteCategory} onValueChange={(value: CasteCategory) => setCasteCategory(value)}>
              <SelectTrigger id="casteCategory">
                <SelectValue placeholder="Select your category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPEN">OPEN</SelectItem>
                <SelectItem value="OBC">OBC</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
                <SelectItem value="ST">ST</SelectItem>
                <SelectItem value="EWS">EWS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="h-4 w-4 inline-block mr-1 text-app-purple" /> City Preference (Optional)
            </Label>
            <p className="text-xs text-muted-foreground mb-3">Select cities you prefer - colleges from these cities will appear first</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cityOptions.map(city => (
                <div key={city} className="flex items-center space-x-2">
                  <Checkbox
                    id={`city-${city}`}
                    checked={cityPreferences.includes(city)}
                    onCheckedChange={() => handleCityPreferenceToggle(city)}
                  />
                  <label
                    htmlFor={`city-${city}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {city}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full h-12 text-lg gradient-button">
            Find My Colleges <TrendingUp className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
        <Card className="text-center p-6 shadow-md">
          <GraduationCap className="h-10 w-10 text-app-purple mx-auto mb-4" />
          <CardTitle className="text-lg font-semibold mb-2">Accurate Predictions</CardTitle>
          <CardContent className="p-0 text-sm text-muted-foreground">
            Get precise college predictions based on historical cut-off data
          </CardContent>
        </Card>
        <Card className="text-center p-6 shadow-md">
          <Lightbulb className="h-10 w-10 text-app-purple mx-auto mb-4" />
          <CardTitle className="text-lg font-semibold mb-2">Detailed Insights</CardTitle>
          <CardContent className="p-0 text-sm text-muted-foreground">
            Explore placements, campus life, and student reviews
          </CardContent>
        </Card>
        <Card className="text-center p-6 shadow-md">
          <CheckCircle className="h-10 w-10 text-app-purple mx-auto mb-4" />
          <CardTitle className="text-lg font-semibold mb-2">Easy Shortlisting</CardTitle>
          <CardContent className="p-0 text-sm text-muted-foreground">
            Create and organize your final option filling list seamlessly
          </CardContent>
        </Card>
      </div>

      {/* Filtered Colleges Display */}
      {filteredColleges.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold">Your College Matches</h2>
              <p className="text-muted-foreground">
                Based on {percentile}% percentile in {casteCategory} category
              </p>
            </div>
            <Dialog open={showShortlistDialog} onOpenChange={setShowShortlistDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  if (shortlistedColleges.length === 0) {
                    toast.info("Please shortlist some colleges first.");
                    setShowShortlistDialog(false);
                  } else {
                    setShowShortlistDialog(true);
                  }
                }} className="gradient-button">
                  <ListFilter className="h-4 w-4 mr-2" /> Shortlist ({shortlistedColleges.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px] p-0">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle>Your Shortlisted Colleges</DialogTitle>
                </DialogHeader>
                <ShortlistedCollegesDisplay
                  shortlistedColleges={finalShortlistedColleges}
                  casteCategory={casteCategory}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Type Filter Buttons */}
          <div className="flex gap-2 mb-6">
            {collegeTypeFilters.map(type => (
              <Button
                key={type}
                variant={activeTypeFilter === type ? "default" : "outline"}
                onClick={() => setActiveTypeFilter(type)}
                className={activeTypeFilter === type ? "gradient-button" : ""}
              >
                {type} Colleges ({type === "All" ? mockColleges.length : mockColleges.filter(c => c.type === type).length})
              </Button>
            ))}
          </div>

          <div className="grid gap-6">
            {filteredColleges.map(college => (
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`shortlist-${college.id}`}
                          checked={shortlistedColleges.includes(college.id)}
                          onCheckedChange={() => handleShortlistToggle(college.id)}
                        />
                        <label htmlFor={`shortlist-${college.id}`} className="text-xl font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {college.name}
                        </label>
                      </div>
                      <p className="text-2xl font-bold text-app-purple">{college.percentileCutoff[casteCategory]}%</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" /> {college.city}
                      <Badge variant="secondary" className="ml-2">{college.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 space-y-2">
                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mt-2">
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" size="sm" className="px-0 mt-2 text-app-blue hover:text-app-purple">
                          View Full Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[1000px] p-0">
                        <CollegeDetail college={college} />
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeFinder;