export type CasteCategory = "OPEN" | "OBC" | "SC" | "ST" | "EWS";
export type CollegeType = "Government" | "Autonomous" | "Private";

export interface Branch {
  name: string;
  code: string;
  cutoffs: Record<CasteCategory, number>;
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