# CET-COMPASS: Your Guide to Engineering Admissions

#Team Name 
CodeSultans

#Team members name:
1: Aditya Bhagat
2: Kunal Halwai
3: Siddheshwar Mahant
4: Gargee Naik 

  
## Project Abstract
CET-COMPASS is a comprehensive web application designed to assist students navigating the MHT-CET engineering admissions process. It provides tools to find suitable colleges based on percentile and caste category, offers a detailed guide for form filling, helps prepare and convert necessary documents to PDF, and keeps users informed about Institute Level Seats (ILS) rounds. The application aims to simplify the complex admission journey by offering personalized insights and essential resources.

## Tech Stack
The application is built using a modern web development stack:
-   **Frontend Framework:** React
-   **Language:** TypeScript
-   **Routing:** React Router
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui (built on Radix UI)
-   **Build Tool:** Vite
-   **Icons:** `lucide-react`
-   **Notifications:** `sonner`
-   **PDF Generation:** `jspdf`
-   **Date Utilities:** `date-fns`
-   **State Management/Data Fetching:** `@tanstack/react-query`

## Dataset Used
The application utilizes a local mock dataset for college information, ILS rounds, and form filling guides. This data is stored in `src/lib/data.ts` and includes:
-   `mockColleges`: A list of engineering colleges with details such as name, city, type, CET code, percentile cutoffs for various caste categories, placement data, campus life, student reviews, available branches, and hostel information.
-   `mockILSRounds`: Information about Institute Level Seats (ILS) rounds, including college name, date, estimated fees, and details.
-   `mockFormGuide`: A structured guide for the MHT-CET CAP registration process, including steps and a list of required documents.