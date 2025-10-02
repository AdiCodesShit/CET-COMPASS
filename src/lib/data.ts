import { College, ILSRoundInfo, FormGuideSection } from "@/lib/types";

export const mockColleges: College[] = [
  {
    id: "1",
    name: "College of Engineering, Pune (COEP)",
    city: "Pune",
    percentileCutoff: {
      OPEN: 99.5,
      OBC: 98.8,
      SC: 95.0,
      ST: 90.0,
      EWS: 99.0,
    },
    details: {
      picture: "https://via.placeholder.com/600x400?text=COEP+Pune",
      highlights: [
        "One of the oldest engineering colleges in India.",
        "Autonomous institute.",
        "Strong alumni network.",
      ],
      campusLife:
        "Vibrant campus life with numerous student clubs, technical events, and cultural festivals. Excellent sports facilities and hostels.",
      placementData: {
        averagePackage: "8-10 LPA",
        highestPackage: "40 LPA",
        topRecruiters: ["TCS", "Infosys", "Wipro", "Microsoft", "Google"],
      },
      studentReviews: [
        "Excellent faculty and academic environment.",
        "Great opportunities for extracurricular activities.",
        "Infrastructure could be better in some departments.",
      ],
    },
  },
  {
    id: "2",
    name: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    city: "Mumbai",
    percentileCutoff: {
      OPEN: 99.3,
      OBC: 98.5,
      SC: 94.5,
      ST: 89.5,
      EWS: 98.8,
    },
    details: {
      picture: "https://via.placeholder.com/600x400?text=VJTI+Mumbai",
      highlights: [
        "Premier engineering institute in Maharashtra.",
        "Strong industry connections.",
        "Research-oriented environment.",
      ],
      campusLife:
        "Located in the heart of Mumbai, offering a dynamic urban campus experience. Active student body with many technical and cultural fests.",
      placementData: {
        averagePackage: "7-9 LPA",
        highestPackage: "35 LPA",
        topRecruiters: ["L&T", "Reliance", "Tata Motors", "Siemens"],
      },
      studentReviews: [
        "Good placements and exposure to industry.",
        "Competitive environment, pushes you to excel.",
        "Limited campus space due to urban location.",
      ],
    },
  },
  {
    id: "3",
    name: "Walchand College of Engineering, Sangli",
    city: "Sangli",
    percentileCutoff: {
      OPEN: 97.0,
      OBC: 95.5,
      SC: 90.0,
      ST: 85.0,
      EWS: 96.5,
    },
    details: {
      picture: "https://via.placeholder.com/600x400?text=Walchand+Sangli",
      highlights: [
        "Autonomous institute with good infrastructure.",
        "Strong focus on practical learning.",
        "Located in a peaceful environment.",
      ],
      campusLife:
        "Spacious campus with good hostel facilities. Active student community with various clubs and events.",
      placementData: {
        averagePackage: "5-7 LPA",
        highestPackage: "20 LPA",
        topRecruiters: ["TCS", "Infosys", "Capgemini"],
      },
      studentReviews: [
        "Supportive faculty and good academic environment.",
        "Decent placements for core branches.",
        "Less exposure to metropolitan opportunities.",
      ],
    },
  },
  {
    id: "4",
    name: "Sardar Patel Institute of Technology (SPIT), Mumbai",
    city: "Mumbai",
    percentileCutoff: {
      OPEN: 98.5,
      OBC: 97.0,
      SC: 92.0,
      ST: 87.0,
      EWS: 98.0,
    },
    details: {
      picture: "https://via.placeholder.com/600x400?text=SPIT+Mumbai",
      highlights: [
        "Affiliated with Mumbai University.",
        "Good faculty and research opportunities.",
        "Modern infrastructure.",
      ],
      campusLife:
        "Located in a prime area of Mumbai, offering good connectivity. Active student clubs and technical fests.",
      placementData: {
        averagePackage: "6-8 LPA",
        highestPackage: "25 LPA",
        topRecruiters: ["Accenture", "Cognizant", "LTI"],
      },
      studentReviews: [
        "Strong academic focus and good placements.",
        "Good exposure to industry.",
        "Campus is relatively small.",
      ],
    },
  },
  {
    id: "5",
    name: "Vishwakarma Institute of Technology (VIT), Pune",
    city: "Pune",
    percentileCutoff: {
      OPEN: 98.0,
      OBC: 96.5,
      SC: 91.0,
      ST: 86.0,
      EWS: 97.5,
    },
    details: {
      picture: "https://via.placeholder.com/600x400?text=VIT+Pune",
      highlights: [
        "Autonomous institute.",
        "Good academic reputation.",
        "Focus on innovation and entrepreneurship.",
      ],
      campusLife:
        "Lively campus with various student activities, technical competitions, and cultural events. Good hostel and sports facilities.",
      placementData: {
        averagePackage: "6-8 LPA",
        highestPackage: "28 LPA",
        topRecruiters: ["Infosys", "Wipro", "TCS", "Persistent"],
      },
      studentReviews: [
        "Supportive environment and good faculty.",
        "Plenty of opportunities for skill development.",
        "Some administrative processes can be slow.",
      ],
    },
  },
];

export const mockILSRounds: ILSRoundInfo[] = [
  {
    collegeName: "College of Engineering, Pune (COEP)",
    date: "2024-09-15",
    estimatedFees: "₹1,20,000",
    details: "Spot admissions for vacant seats in various branches.",
  },
  {
    collegeName: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    date: "2024-09-20",
    estimatedFees: "₹1,35,000",
    details: "ILS round for specific branches, check college website for eligibility.",
  },
  {
    collegeName: "Walchand College of Engineering, Sangli",
    date: "2024-09-10",
    estimatedFees: "₹95,000",
    details: "Open for all eligible candidates with valid MHT-CET scores.",
  },
  {
    collegeName: "Sardar Patel Institute of Technology (SPIT), Mumbai",
    date: "2024-09-22",
    estimatedFees: "₹1,40,000",
    details: "Limited seats available, preference to higher percentile holders.",
  },
  {
    collegeName: "Vishwakarma Institute of Technology (VIT), Pune",
    date: "2024-09-18",
    estimatedFees: "₹1,10,000",
    details: "ILS for management quota and vacant CAP seats.",
  },
];

export const mockFormGuide: FormGuideSection[] = [
  {
    title: "MHT-CET CAP Registration Process",
    content: `
      <p>The Centralized Admission Process (CAP) for MHT-CET is a multi-stage process. Here's a general overview:</p>
      <ol class="list-decimal list-inside space-y-2">
        <li><strong>Online Registration:</strong> Create an account on the official MHT-CET CAP portal.</li>
        <li><strong>Fill Application Form:</strong> Provide personal details, academic qualifications, and MHT-CET scores.</li>
        <li><strong>Upload Documents:</strong> Scan and upload all required documents (see below).</li>
        <li><strong>Fee Payment:</strong> Pay the CAP registration fee online.</li>
        <li><strong>Document Verification:</strong> Your uploaded documents will be verified either online (e-Scrutiny) or at a Physical Scrutiny Center (PSC).</li>
        <li><strong>Provisional Merit List:</strong> A provisional merit list will be published. Check for any discrepancies.</li>
        <li><strong>Final Merit List:</strong> After addressing grievances, the final merit list is released.</li>
        <li><strong>Option Entry (Round 1, 2, 3):</strong> Fill in your preferred colleges and branches in order of priority.</li>
        <li><strong>Allotment:</strong> Check your allotment status after each round.</li>
        <li><strong>Acceptance/Freezing/Sliding:</strong> Decide whether to accept the allotted seat, freeze it, or float for subsequent rounds.</li>
        <li><strong>Reporting to ARC/College:</strong> Report to the Admission Reporting Center (ARC) or directly to the allotted college for admission confirmation.</li>
      </ol>
    `,
  },
  {
    title: "Required Documents for CAP Registration",
    content: `
      <p>Ensure you have the following documents ready in digital format (PDF/JPEG) for upload:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>MHT-CET Score Card</li>
        <li>MHT-CET Admit Card</li>
        <li>SSC (10th) Mark Sheet</li>
        <li>HSC (12th) Mark Sheet</li>
        <li>School Leaving Certificate / Transfer Certificate</li>
        <li>Domicile Certificate (for Maharashtra candidates)</li>
        <li>Nationality Certificate (if not mentioned on Domicile/LC)</li>
        <li>Caste Certificate (if applicable)</li>
        <li>Caste Validity Certificate (if applicable)</li>
        <li>Non-Creamy Layer Certificate (for OBC/VJ/NT/SBC categories, valid for the current financial year)</li>
        <li>EWS Certificate (if applicable)</li>
        <li>Aadhaar Card</li>
        <li>Passport size photographs</li>
        <li>Signature</li>
      </ul>
      <p class="mt-4 text-sm text-red-600"><strong>Note:</strong> Always refer to the official MHT-CET CAP brochure for the most up-to-date and complete list of documents.</p>
    `,
  },
  {
    title: "Important Processes and Tips",
    content: `
      <ul class="list-disc list-inside space-y-2">
        <li><strong>E-Scrutiny vs. Physical Scrutiny:</strong> Understand which method applies to you for document verification.</li>
        <li><strong>Option Form Filling:</strong> Research colleges and branches thoroughly. Fill as many options as possible in your true order of preference.</li>
        <li><strong>Freezing vs. Floating:</strong> If you are satisfied with an allotted seat, 'Freeze' it. If you want to try for a better option in subsequent rounds, 'Float' it.</li>
        <li><strong>Seat Acceptance Fee:</strong> Be prepared to pay a seat acceptance fee online if you accept a seat.</li>
        <li><strong>Reporting to ARC/College:</strong> Adhere to the deadlines for reporting and document submission.</li>
        <li><strong>Keep Copies:</strong> Always keep multiple copies of all your documents and receipts.</li>
        <li><strong>Stay Updated:</strong> Regularly check the official MHT-CET CAP website for announcements and schedule changes.</li>
      </ul>
    `,
  },
];

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