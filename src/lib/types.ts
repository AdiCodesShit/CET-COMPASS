export type CasteCategory = "OPEN" | "OBC" | "SC" | "ST" | "EWS";
export type CollegeType = "Government" | "Autonomous" | "Private";

export interface Branch {
  name: string;
  code: string;
  cutoffs: Record<CasteCategory, number>;
}

export interface HostelInfo {
  rating: number; // e.g., 4.0
  messRating: number; // e.g., 3.5
  distanceFromCollege: string; // e.g., "In Campus Hostel", "2 km", "15 min walk"
  highlights: string[];
}

export interface College {
  id: string;
  name: string;
  city: string;
  type: CollegeType; // Added for filtering
  cetCollegeCode: string; // New field for CET College Code
  percentileCutoff: Record<CasteCategory, number>; // This will represent the highest cutoff for the college
  details: {
    picture: string;
    highlights: string[];
    campusLife: string;
    placementData: {
      averagePackage: string; // e.g., "₹8.5L"
      highestPackage: string; // e.g., "₹40L"
      topRecruiters: string[];
    };
    studentReviews: {
      name: string;
      year: string;
      rating: number; // e.g., 4.5
      comment: string;
    }[];
    availableBranches: Branch[]; // Changed to array of Branch objects with code and cutoffs
    cutOffPercentiles: Record<CasteCategory, number>; // For detailed view (can be derived from branches or kept as overall)
    googleMapsLink: string; // Added Google Maps link
    hostelInfo?: HostelInfo; // Optional hostel information
  };
}

export interface ILSRoundInfo {
  collegeName: string;
  date: string;
  estimatedFees: string;
  details: string;
}

export interface FormGuideDocumentItem {
  id: string;
  text: string;
}

export interface FormGuideSection {
  title: string;
  content?: string; // For general text content
  documentItems?: FormGuideDocumentItem[]; // For structured document lists with checkboxes
}

// New interfaces for User and Review
export interface User {
  id: string;
  username: string;
  email: string;
  cetCollegeCode?: string; // Optional: User's college code for review verification
}

export interface Review {
  id: string;
  collegeId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  timestamp: string;
}

export interface CollegeUpdate {
  id: string;
  collegeName: string;
  cetCollegeCode: string; // To link with a college
  userId: string;
  username: string;
  title: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
}

// New interface for MeetUp
export interface MeetUp {
  id: string;
  collegeName: string;
  cetCollegeCode: string;
  userId: string;
  username: string;
  title: string;
  description: string;
  location: string;
  date: string; // ISO string format
  time: string; // e.g., "18:00"
  imageUrl?: string;
  timestamp: string;
}

// New interfaces for Chat
export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
}

export type ChatRoomType = "college" | "branch";

export interface ChatRoom {
  id: string;
  name: string;
  type: ChatRoomType;
  collegeId?: string; // For college-level chats
  branchCode?: string; // For branch-specific chats
  description: string;
}