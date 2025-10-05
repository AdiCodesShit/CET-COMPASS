"use client";

import React from "react";
import { UserYearTag } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Laptop, Briefcase, Rocket } from "lucide-react";

interface UserYearTagDisplayProps {
  yearTag?: UserYearTag;
  className?: string;
}

export const yearTagConfig: Record<UserYearTag, { icon: React.ElementType; color: string; textColor: string; label: string }> = {
  "Newcomer": { icon: Rocket, color: "bg-blue-500", textColor: "text-blue-700", label: "Newcomer" },
  "FirstYear": { icon: BookOpen, color: "bg-green-500", textColor: "text-green-700", label: "First Year" },
  "SecondYear": { icon: Laptop, color: "bg-yellow-500", textColor: "text-yellow-700", label: "Second Year" },
  "ThirdYear": { icon: GraduationCap, color: "bg-purple-500", textColor: "text-purple-700", label: "Third Year" },
  "FinalYear": { icon: Briefcase, color: "bg-red-500", textColor: "text-red-700", label: "Final Year" },
};

const UserYearTagDisplay: React.FC<UserYearTagDisplayProps> = ({ yearTag, className }) => {
  if (!yearTag) {
    return null;
  }

  const config = yearTagConfig[yearTag];

  return (
    <Badge
      className={`flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-white ${config.color} ${className}`}
    >
      <config.icon className="h-3 w-3" />
      <span className="hidden sm:inline">{config.label}</span>
    </Badge>
  );
};

export default UserYearTagDisplay;