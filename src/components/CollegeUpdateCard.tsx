"use client";

import React from "react";
import { CollegeUpdate } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { Building2, UserCircle2 } from "lucide-react";

interface CollegeUpdateCardProps {
  update: CollegeUpdate;
}

const CollegeUpdateCard: React.FC<CollegeUpdateCardProps> = ({ update }) => {
  const timeAgo = formatDistanceToNowStrict(new Date(update.timestamp), { addSuffix: true });

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${update.username}`} alt={update.username} />
            <AvatarFallback><UserCircle2 className="h-5 w-5" /></AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{update.username}</p>
            <p className="text-xs text-muted-foreground flex items-center">
              <Building2 className="h-3 w-3 mr-1" /> {update.collegeName}
            </p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{timeAgo}</span>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
        {update.imageUrl && (
          <img src={update.imageUrl} alt={update.title} className="w-full h-48 object-cover rounded-md mb-3" />
        )}
        <p className="text-sm text-gray-700 dark:text-gray-300">{update.content}</p>
      </CardContent>
    </Card>
  );
};

export default CollegeUpdateCard;