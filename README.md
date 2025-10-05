# CET-COMPASS: Your Guide to Engineering Admissions

# Team Name
CodeSultans

# Team Members 
1. Aditya Bhagat
2. Siddheshwar Mahant
3. Gargee Naik
4. Kunal Halwai

# Project Name
CET-COMPASS

## Project Abstract
CET-COMPASS is a comprehensive web application designed to streamline the MHT-CET engineering admissions process. It empowers students with tools to discover and compare colleges based on percentile, caste, city, and branch preferences, alongside a dynamic search feature for refined results. The platform also offers a detailed form-filling guide, a document preparation tool for PDF conversion, and up-to-date information on Institute Level Seats (ILS) rounds. Furthermore, it fosters a vibrant community through college-specific and branch-wise chats with search capabilities, a college network for updates and meet-ups, and private direct messaging with friend management, all aimed at simplifying the complex admission journey with personalized insights and essential resources.

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

## Key Features
-   **College Finder with Advanced Filters:** Search for colleges based on MHT-CET percentile, caste category, city, and preferred branches. Includes a dynamic search bar to filter results by college name, city, or CET code after the initial search.
-   **College Comparison:** Compare shortlisted colleges side-by-side on key metrics like placements, cutoffs, and hostel facilities.
-   **Form Filling Guide:** A step-by-step guide for the MHT-CET CAP registration process, including a checklist of required documents.
-   **Document Preparation Tool:** Upload image documents and convert them into compressed PDFs suitable for online submission.
-   **ILS Round Information:** Stay updated on Institute Level Seats (ILS) rounds with college-specific details and dates, including a calendar view.
-   **College Network:** A community feed for college-specific updates and meet-ups posted by students.
-   **College Chats:** Join general college chats or branch-specific discussions, with a search feature to easily find desired chat rooms.
-   **Direct Messaging:** Engage in private one-on-one conversations with friends, including friend request management.
-   **User Authentication:** Secure login and signup functionality to personalize the experience.
-   **Responsive Design:** Optimized for seamless use across various devices.

## Dataset Used
The application utilizes a local mock dataset for college information, ILS rounds, and form filling guides. This data is stored in `src/lib/data.ts` and includes:
-   `mockColleges`: A list of engineering colleges with details such as name, city, type, CET code, percentile cutoffs for various caste categories, placement data, campus life, student reviews, available branches, and hostel information.
-   `mockILSRounds`: Information about Institute Level Seats (ILS) rounds, including college name, date, estimated fees, and details.
-   `mockFormGuide`: A structured guide for the MHT-CET CAP registration process, including steps and a list of required documents.
-   `mockCollegeUpdates`: Sample college news and event updates.
-   `mockMeetUps`: Sample student meet-up events.
-   `mockChatRooms` & `mockChatMessages`: Sample data for college and branch-specific chat rooms and messages.
-   `mockDirectConversations` & `mockDirectMessages`: Sample data for direct messaging conversations and messages.

## How to Run the App

To get the CET-COMPASS application up and running on your local machine, follow these steps:

1.  **Clone the Repository:**
    First, clone the project repository to your local machine using Git:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```
    (Replace `<repository-url>` with the actual URL of the repository and `<project-directory>` with the name of the cloned directory.)

2.  **Install Dependencies:**
    Navigate into the project directory and install all the necessary Node.js dependencies using npm:
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    Once the dependencies are installed, you can start the development server. This will compile the application and open it in your default web browser.
    ```bash
    npm run dev
    ```
    The application should now be running and accessible, typically at `http://localhost:8080` or a similar address, which will be displayed in your terminal.
