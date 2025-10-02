export type CasteCategory = "OPEN" | "OBC" | "SC" | "ST" | "EWS";

export interface College {
  id: string;
  name: string;
  city: string;
  percentileCutoff: Record<CasteCategory, number>;
  details: {
    picture: string;
    highlights: string[];
    campusLife: string;
    placementData: {
      averagePackage: string;
      highestPackage: string;
      topRecruiters: string[];
    };
    studentReviews: string[];
  };
}

export interface ILSRoundInfo {
  collegeName: string;
  date: string;
  estimatedFees: string;
  details: string;
}

export interface FormGuideSection {
  title: string;
  content: string;
}