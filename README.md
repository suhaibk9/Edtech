# EdTech Platform - Frontend

A modern, responsive Learning Management System (LMS) frontend built with React, Vite, Redux Toolkit, and Tailwind CSS.

## Features

- **User Authentication:** Secure login, signup, and profile management (with avatar upload).
- **Role-Based Access Control:** Distinct experiences for `USER` and `ADMIN` roles.
- **Course Exploration:** Browse available courses, view detailed descriptions, and enroll.
- **Video Management:** Secure video playback for enrolled courses (Cloudinary integration).
- **Payment Gateway:** Razorpay integration for seamless course subscriptions and transactions.
- **Admin Dashboard:** Comprehensive metrics with Chart.js, visualizing course sales and user statistics.
- **Course Administration:** Intuitive interface for Admins to create, edit, and delete courses and individual lectures.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.

## Tech Stack

- **Framework:** React.js (via Vite)
- **State Management:** Redux Toolkit (RTK)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS & DaisyUI
- **Icons:** React Icons
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Charts:** Chart.js & React-Chartjs-2

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate to the frontend directory:

   ```bash
   cd Edtech_FE
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root directory:

   ```env
   VITE_APP_BASE_URL="http://localhost:3000"
   VITE_RAZORPAY_KEY_ID="your_razorpay_key"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit the default port (`http://localhost:5173`).
