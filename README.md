# EcoTech Solutions - E-commerce Platform

A modern, full-stack e-commerce platform for refurbished electronics, built for EcoTech Solutions. This application provides a seamless shopping experience with secure authentication, real-time payments, and robust content management.

## 🚀 Features

-   **User Authentication**: Secure sign-up/sign-in and user management powered by [Clerk](https://clerk.com/).
-   **Content Management**: Flexible product and content management using [Sanity CMS](https://www.sanity.io/).
-   **Payments**: Secure payment processing with [Stripe](https://stripe.com/).
-   **Email Notifications**: Transactional emails (order confirmations, etc.) via [Resend](https://resend.com/).
-   **Responsive Design**: Mobile-friendly interface built with Next.js and Tailwind CSS.
-   **Admin Dashboard**: Manage orders, products, and view analytics.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, Shadcn/ui
-   **Database/CMS**: Sanity
-   **Auth**: Clerk
-   **Payments**: Stripe
-   **Email**: Resend

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or bun
-   Git

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd shopcartpro-yt
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    bun install
    ```

### 🔐 Environment Setup

1.  Create a `.env` file in the root directory.
2.  Copy the contents from `.env.example` to your `.env` file:

    ```bash
    cp .env.example .env
    ```

3.  **Fill in the environment variables:**

    -   **Sanity**: Create a new project in [Sanity](https://www.sanity.io/) and get your Project ID and Dataset.
    -   **Clerk**: Set up an application in [Clerk](https://clerk.com/) and copy the API keys.
    -   **Stripe**: Get your Secret and Publishable keys from the [Stripe Dashboard](https://dashboard.stripe.com/).
    -   **Resend**: Generate an API key in [Resend](https://resend.com/).
    -   **Admin Email**: Set `NEXT_PUBLIC_ADMIN_EMAIL` to your email address (comma-separated for multiple admins) to access admin features.

### 🏃‍♂️ Running the Project

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Admin Access

1. Ensure your email is added to `NEXT_PUBLIC_ADMIN_EMAIL` in your `.env` file.
2. Sign in with that email address.
3. Navigate to `/admin` (or the dashboard link if visible) to access the admin panel.

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  Push your code to a GitHub repository.
2.  Import the project in Vercel.
3.  Add the environment variables from your `.env` file to the Vercel project settings.
4.  Deploy!

## 📄 License

This project is proprietary software developed for EcoTech Solutions.
