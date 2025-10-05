"use client";

import React from "react";
import { MeetUp } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Building2, UserCircle2, Calendar, Clock, MapPin } from "lucide-react";

interface MeetUpCardProps {
  meetUp: MeetUp;
}

const MeetUpCard: React.FC<MeetUpCardProps> = ({ meetUp }) => {
  const timeAgo = formatDistanceToNowStrict(new Date(meetUp.timestamp), { addSuffix: true });
  const formattedDate = format(new Date(meetUp.date), "PPP"); // e.g., "Sep 1, 2024"
  const formattedTime = format(new Date(`2000-01-01T${meetUp.time}`), "p"); // e.g., "2:00 PM"

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${meetUp.username}`} alt={meetUp.username} />
            <AvatarFallback><UserCircle2 className="h-5 w-5" /></AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{meetUp.username}</p>
            <p className="text-xs text-muted-foreground flex items-center">
              <Building2 className="h-3 w-3 mr-1" /> {meetUp.collegeName}
            </p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{timeAgo}</span>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">{meetUp.title}</h3>
        {meetUp.imageUrl && (
          <img src={meetUp.imageUrl} alt={meetUp.title} className="w-full h-48 object-cover rounded-md mb-3" />
        )}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{meetUp.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-app-blue" /> {formattedDate}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-app-blue" /> {formattedTime}
          </div>
          <div className="flex items-center sm:col-span-2">
            <MapPin className="h-4 w-4 mr-2 text-app-blue" /> {meetUp.location}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetUpCard;