"use client";

import React, { useState } from "react";
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
import { mockColleges, CasteCategory, College } from "@/lib/data";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShortlistedCollegesDisplay from "@/components/ShortlistedCollegesDisplay"; // Import the new component

interface CollegeDetailProps {
  college: College;
}

const CollegeDetail: React.FC<CollegeDetailProps> = ({ college }) => (
  <ScrollArea className="h-[80vh] p-4">
    <h3 className="text-2xl font-bold mb-4">{college.name}</h3>
    <img src={college.details.picture} alt={college.name} className="w-full h-auto rounded-md mb-4 object-cover" />
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold">Main Highlights</h4>
        <ul className="list-disc list-inside">
          {college.details.highlights.map((highlight, i) => (
            <li key={i}>{highlight}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Campus Life</h4>
        <p>{college.details.campusLife}</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Placement Data</h4>
        <p>Average Package: {college.details.placementData.averagePackage}</p>
        <p>Highest Package: {college.details.placementData.highestPackage}</p>
        <p>Top Recruiters: {college.details.placementData.topRecruiters.join(", ")}</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Student Reviews</h4>
        <ul className="list-disc list-inside">
          {college.details.studentReviews.map((review, i) => (
            <li key={i}>{review}</li>
          ))}
        </ul>
      </div>
    </div>
  </ScrollArea>
);


const CollegeFinder = () => {
  const [percentile, setPercentile] = useState<string>("");
  const [casteCategory, setCasteCategory] = useState<CasteCategory>("OPEN");
  const [cityPreference, setCityPreference] = useState<string>("");
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [shortlistedColleges, setShortlistedColleges] = useState<string[]>([]);
  const [showShortlistDialog, setShowShortlistDialog] = useState(false);

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

    // Sort by city preference first, then by cutoff
    results.sort((a, b) => {
      const aIsPreferredCity = a.city.toLowerCase() === cityPreference.toLowerCase();
      const bIsPreferredCity = b.city.toLowerCase() === cityPreference.toLowerCase();

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
    setShortlistedColleges(prev =>
      prev.includes(collegeId)
        ? prev.filter(id => id !== collegeId)
        : [...prev, collegeId]
    );
  };

  const finalShortlistedColleges = mockColleges.filter(college => shortlistedColleges.includes(college.id));

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">College Finder with Percentile</h2>

      <Card>
        <CardHeader>
          <CardTitle>Your Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="percentile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              MHT-CET Percentile
            </label>
            <Input
              id="percentile"
              type="number"
              step="0.01"
              placeholder="e.g., 95.50"
              value={percentile}
              onChange={(e) => setPercentile(e.target.value)}
              max={100}
              min={0}
            />
          </div>
          <div>
            <label htmlFor="casteCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Caste Category
            </label>
            <Select value={casteCategory} onValueChange={(value: CasteCategory) => setCasteCategory(value)}>
              <SelectTrigger id="casteCategory">
                <SelectValue placeholder="Select Category" />
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
            <label htmlFor="cityPreference" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              City Preference (Optional)
            </label>
            <Input
              id="cityPreference"
              type="text"
              placeholder="e.g., Pune"
              value={cityPreference}
              onChange={(e) => setCityPreference(e.target.value)}
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <Button onClick={handleSearch}>Find Colleges</Button>
          </div>
        </CardContent>
      </Card>

      {filteredColleges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Available Colleges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredColleges.map(college => (
                <div key={college.id} className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`shortlist-${college.id}`}
                      checked={shortlistedColleges.includes(college.id)}
                      onCheckedChange={() => handleShortlistToggle(college.id)}
                    />
                    <label htmlFor={`shortlist-${college.id}`} className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {college.name} ({college.city}) - Cutoff: {college.percentileCutoff[casteCategory]}%
                    </label>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] p-0">
                      <DialogHeader className="p-6 pb-0">
                        <DialogTitle>{college.name}</DialogTitle>
                      </DialogHeader>
                      <CollegeDetail college={college} />
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Dialog open={showShortlistDialog} onOpenChange={setShowShortlistDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    if (shortlistedColleges.length === 0) {
                      toast.info("Please shortlist some colleges first.");
                      setShowShortlistDialog(false); // Keep dialog closed if no colleges
                    } else {
                      setShowShortlistDialog(true);
                    }
                  }}>Shortlist Options</Button>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CollegeFinder;