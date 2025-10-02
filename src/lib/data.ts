import { College, ILSRoundInfo, FormGuideSection, CollegeType, FormGuideDocumentItem } from "@/lib/types";

export const mockColleges: College[] = [
  {
    id: "1",
    name: "College of Engineering, Pune (COEP)",
    city: "Pune",
    type: "Autonomous",
    percentileCutoff: {
      OPEN: 99.5,
      OBC: 98.8,
      SC: 95.0,
      ST: 90.0,
      EWS: 99.0,
    },
    details: {
      picture: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      highlights: [
        "One of the oldest engineering colleges in India.",
        "Autonomous institute with strong academic freedom.",
        "Strong alumni network and industry connections.",
        "Excellent research opportunities and innovation culture.",
      ],
      campusLife:
        "Vibrant campus life with numerous student clubs, technical events, and cultural festivals. Excellent sports facilities and hostels. A hub for innovation and extracurricular activities.",
      placementData: {
        averagePackage: "₹10.2L",
        highestPackage: "₹48L",
        topRecruiters: ["TCS", "Infosys", "Wipro", "Microsoft", "Google", "Amazon"],
      },
      studentReviews: [
        {
          name: "Rahul Sharma",
          year: "B.Tech 2023",
          rating: 5,
          comment: "COEP offers an unparalleled academic environment with dedicated faculty. The campus life is vibrant, and placement opportunities are top-notch. Highly recommended!",
        },
        {
          name: "Priya Singh",
          year: "B.Tech 2022",
          rating: 4,
          comment: "Great college with good infrastructure and a strong focus on practical learning. Some administrative processes can be slow, but overall a fantastic experience.",
        },
      ],
      availableBranches: ["Computer Engineering", "IT", "Electronics & Telecommunication", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering"],
      cutOffPercentiles: {
        OPEN: 99.5,
        OBC: 98.8,
        SC: 95.0,
        ST: 90.0,
        EWS: 99.0,
      },
    },
  },
  {
    id: "2",
    name: "Veermata Jijabai Technological Institute (VJTI)",
    city: "Mumbai",
    type: "Autonomous",
    percentileCutoff: {
      OPEN: 99.3,
      OBC: 98.5,
      SC: 94.5,
      ST: 89.5,
      EWS: 98.8,
    },
    details: {
      picture: "https://images.unsplash.com/photo-1580582932707-5205c5f205a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      highlights: [
        "Premier engineering institute in Maharashtra.",
        "Strong industry connections and research focus.",
        "Located in the heart of Mumbai, offering urban exposure.",
        "Excellent faculty and state-of-the-art laboratories.",
      ],
      campusLife:
        "Located in the heart of Mumbai, offering a dynamic urban campus experience. Active student body with many technical and cultural fests. Limited campus space but vibrant city life compensates.",
      placementData: {
        averagePackage: "₹12.5L",
        highestPackage: "₹65L",
        topRecruiters: ["L&T", "Reliance", "Tata Motors", "Siemens", "Goldman Sachs", "JP Morgan"],
      },
      studentReviews: [
        {
          name: "Anjali Desai",
          year: "B.Tech 2024",
          rating: 5,
          comment: "VJTI provides excellent placements and exposure to industry. The competitive environment pushes you to excel. Truly a top-tier institution.",
        },
        {
          name: "Karan Mehta",
          year: "B.Tech 2021",
          rating: 4,
          comment: "Good faculty and strong academic rigor. Campus is relatively small due to its urban location, but the opportunities are immense.",
        },
      ],
      availableBranches: ["Computer Engineering", "Information Technology", "Electronics", "Mechanical Engineering", "Civil Engineering", "Textile Engineering"],
      cutOffPercentiles: {
        OPEN: 99.3,
        OBC: 98.5,
        SC: 94.5,
        ST: 89.5,
        EWS: 98.8,
      },
    },
  },
  {
    id: "3",
    name: "Walchand College of Engineering",
    city: "Sangli",
    type: "Autonomous",
    percentileCutoff: {
      OPEN: 97.0,
      OBC: 95.5,
      SC: 90.0,
      ST: 85.0,
      EWS: 96.5,
    },
    details: {
      picture: "https://images.unsplash.com/photo-1541339907198-e0875663f9a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      highlights: [
        "Autonomous institute with good infrastructure.",
        "Strong focus on practical learning and industry projects.",
        "Located in a peaceful environment, conducive to studies.",
        "Dedicated faculty and supportive learning environment.",
      ],
      campusLife:
        "Spacious campus with good hostel facilities. Active student community with various clubs and events. Offers a balanced academic and social life.",
      placementData: {
        averagePackage: "₹5.5L",
        highestPackage: "₹20L",
        topRecruiters: ["TCS", "Infosys", "Capgemini", "Wipro"],
      },
      studentReviews: [
        {
          name: "Sneha Patil",
          year: "B.Tech 2022",
          rating: 4,
          comment: "Supportive faculty and good academic environment. Decent placements for core branches. A good choice for a focused engineering education.",
        },
        {
          name: "Amit Kulkarni",
          year: "B.Tech 2023",
          rating: 3,
          comment: "Good infrastructure but less exposure to metropolitan opportunities compared to Mumbai/Pune colleges. Still, a solid regional option.",
        },
      ],
      availableBranches: ["Computer Science", "Electronics Engineering", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering"],
      cutOffPercentiles: {
        OPEN: 97.0,
        OBC: 95.5,
        SC: 90.0,
        ST: 85.0,
        EWS: 96.5,
      },
    },
  },
  {
    id: "4",
    name: "Sardar Patel Institute of Technology (SPIT)",
    city: "Mumbai",
    type: "Private",
    percentileCutoff: {
      OPEN: 98.5,
      OBC: 97.0,
      SC: 92.0,
      ST: 87.0,
      EWS: 98.0,
    },
    details: {
      picture: "https://images.unsplash.com/photo-1560785477-80e9830c53f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      highlights: [
        "Affiliated with Mumbai University, strong academic curriculum.",
        "Good faculty and research opportunities in emerging fields.",
        "Modern infrastructure and well-equipped labs.",
        "Located in a prime area of Mumbai with excellent connectivity.",
      ],
      campusLife:
        "Located in a prime area of Mumbai, offering good connectivity. Active student clubs and technical fests. The campus is relatively small but makes up for it with its location and facilities.",
      placementData: {
        averagePackage: "₹6.8L",
        highestPackage: "₹25L",
        topRecruiters: ["Accenture", "Cognizant", "LTI", "Capgemini", "TCS"],
      },
      studentReviews: [
        {
          name: "Deepak Kumar",
          year: "B.Tech 2023",
          rating: 4,
          comment: "Strong academic focus and good placements, especially for IT and Computer Science. Good exposure to industry. Campus is compact but well-maintained.",
        },
        {
          name: "Ritu Sharma",
          year: "B.Tech 2024",
          rating: 4,
          comment: "Faculty is supportive and approachable. The college organizes many technical events which are great for learning and networking.",
        },
      ],
      availableBranches: ["Computer Engineering", "Information Technology", "Electronics Engineering", "Electronics & Telecommunication"],
      cutOffPercentiles: {
        OPEN: 98.5,
        OBC: 97.0,
        SC: 92.0,
        ST: 87.0,
        EWS: 98.0,
      },
    },
  },
  {
    id: "5",
    name: "Vishwakarma Institute of Technology (VIT)",
    city: "Pune",
    type: "Autonomous",
    percentileCutoff: {
      OPEN: 98.0,
      OBC: 96.5,
      SC: 91.0,
      ST: 86.0,
      EWS: 97.5,
    },
    details: {
      picture: "https://images.unsplash.com/photo-1541339907198-e0875663f9a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      highlights: [
        "Autonomous institute with a strong academic reputation.",
        "Focus on innovation, entrepreneurship, and research.",
        "Modern laboratories and workshops.",
        "Active alumni network and industry collaborations.",
      ],
      campusLife:
        "Lively campus with various student activities, technical competitions, and cultural events. Good hostel and sports facilities. Encourages overall student development.",
      placementData: {
        averagePackage: "₹7.5L",
        highestPackage: "₹35L",
        topRecruiters: ["Infosys", "Wipro", "TCS", "Persistent", "Zensar", "Tech Mahindra"],
      },
      studentReviews: [
        {
          name: "Shreya Joshi",
          year: "B.Tech 2022",
          rating: 4,
          comment: "Great college with good faculty and infrastructure. Placement cell is very active and supportive. Enjoyed my time here!",
        },
        {
          name: "Aditya Deshmukh",
          year: "B.Tech 2021",
          rating: 4,
          comment: "Plenty of opportunities for skill development and extracurriculars. Some administrative processes can be slow, but academics are strong.",
        },
      ],
      availableBranches: ["Computer Engineering", "IT", "Electronics", "Mechanical Engineering", "Civil Engineering", "Automobile Engineering"],
      cutOffPercentiles: {
        OPEN: 98.0,
        OBC: 96.5,
        SC: 91.0,
        ST: 86.0,
        EWS: 97.5,
      },
    },
  },
  {
    id: "6",
    name: "Government College of Engineering, Aurangabad",
    city: "Aurangabad",
    type: "Government",
    percentileCutoff: {
      OPEN: 96.0,
      OBC: 94.0,
      SC: 89.0,
      ST: 84.0,
      EWS: 95.5,
    },
    details: {
      picture: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      highlights: [
        "Government institute with affordable fees.",
        "Good faculty and strong academic foundation.",
        "Located in a historical city with cultural exposure.",
        "Decent infrastructure and facilities.",
      ],
      campusLife:
        "Peaceful campus environment with various student clubs. Focus on academic excellence. Good for students seeking a government college experience.",
      placementData: {
        averagePackage: "₹4.5L",
        highestPackage: "₹15L",
        topRecruiters: ["TCS", "Wipro", "Infosys"],
      },
      studentReviews: [
        {
          name: "Sagar Jadhav",
          year: "B.Tech 2023",
          rating: 3,
          comment: "Good value for money due to government fees. Placements are decent for core branches. Infrastructure could be improved.",
        },
        {
          name: "Neha Gupta",
          year: "B.Tech 2022",
          rating: 4,
          comment: "Supportive faculty and a good learning environment. Opportunities for extracurriculars are present but not as extensive as autonomous institutes.",
        },
      ],
      availableBranches: ["Computer Engineering", "IT", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering"],
      cutOffPercentiles: {
        OPEN: 96.0,
        OBC: 94.0,
        SC: 89.0,
        ST: 84.0,
        EWS: 95.5,
      },
    },
  },
  {
    id: "7",
    name: "K. J. Somaiya College of Engineering",
    city: "Mumbai",
    type: "Autonomous",
    percentileCutoff: {
      OPEN: 98.2,
      OBC: 96.8,
      SC: 91.5,
      ST: 86.5,
      EWS: 97.8,
    },
    details: {
      picture: "https://images.unsplash.com/photo-1580582932707-5205c5f205a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      highlights: [
        "Autonomous institute with a sprawling campus.",
        "Strong emphasis on holistic development.",
        "Excellent faculty and modern infrastructure.",
        "Good industry interface and research opportunities.",
      ],
      campusLife:
        "Vibrant and green campus with extensive sports facilities, cultural events, and technical fests. Offers a balanced and enriching student experience.",
      placementData: {
        averagePackage: "₹7.0L",
        highestPackage: "₹30L",
        topRecruiters: ["TCS", "Infosys", "Capgemini", "L&T Infotech", "Accenture"],
      },
      studentReviews: [
        {
          name: "Rajeshwari Iyer",
          year: "B.Tech 2024",
          rating: 5,
          comment: "One of the best private autonomous colleges in Mumbai. Great campus, excellent faculty, and good placements. Highly recommend!",
        },
        {
          name: "Siddharth Rao",
          year: "B.Tech 2021",
          rating: 4,
          comment: "The college provides ample opportunities for both academic and extracurricular growth. The campus is beautiful and well-maintained.",
        },
      ],
      availableBranches: ["Computer Engineering", "Information Technology", "Electronics Engineering", "Mechanical Engineering", "Artificial Intelligence & Data Science"],
      cutOffPercentiles: {
        OPEN: 98.2,
        OBC: 96.8,
        SC: 91.5,
        ST: 86.5,
        EWS: 97.8,
      },
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
  {
    collegeName: "Government College of Engineering, Aurangabad",
    date: "2024-09-25",
    estimatedFees: "₹80,000",
    details: "ILS for various engineering disciplines. Check college notice board.",
  },
  {
    collegeName: "K. J. Somaiya College of Engineering, Mumbai",
    date: "2024-09-17",
    estimatedFees: "₹1,60,000",
    details: "Management quota and vacant CAP seats. Merit-based admissions.",
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
    documentItems: [
      { id: "doc-1", text: "MHT-CET Score Card" },
      { id: "doc-2", text: "MHT-CET Admit Card" },
      { id: "doc-3", text: "SSC (10th) Mark Sheet" },
      { id: "doc-4", text: "HSC (12th) Mark Sheet" },
      { id: "doc-5", text: "School Leaving Certificate / Transfer Certificate" },
      { id: "doc-6", text: "Domicile Certificate (for Maharashtra candidates)" },
      { id: "doc-7", text: "Nationality Certificate (if not mentioned on Domicile/LC)" },
      { id: "doc-8", text: "Caste Certificate (if applicable)" },
      { id: "doc-9", text: "Caste Validity Certificate (if applicable)" },
      { id: "doc-10", text: "Non-Creamy Layer Certificate (for OBC/VJ/NT/SBC categories, valid for the current financial year)" },
      { id: "doc-11", text: "EWS Certificate (if applicable)" },
      { id: "doc-12", text: "Aadhaar Card" },
      { id: "doc-13", text: "Passport size photographs" },
      { id: "doc-14", text: "Signature" },
    ],
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