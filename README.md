# Finora 🚀

Finora is a premium, high-performance personal finance tracker designed with a modern fintech aesthetic. Built for clarity and speed, it provides users with deep insights into their financial habits through beautiful visualizations and a seamless user experience.

![Finora Header](public/Logo2.png)

## ✨ Features

- **📊 Advanced Dashboard**: Real-time overview of your Income, Expenses, and Total Balance with elegant glassmorphic summary cards.
- **💸 Transaction Management**: Effortlessly track and categorize your spending with support for INR currency and intuitive date-based sorting.
- **📈 Visual Analytics**: Interactive charts and volume breakdowns to help you understand your spending patterns over time.
- **🌗 Smart Dark Mode**: Automatically synchronized theme management with optimized branding for both light and dark environments.
- **🔐 Secure Authentication**: Multi-channel login support including standard Email/Password and integrated "Continue with Google" social login via Firebase.
- **🔔 Real-time Notifications**: Instant feedback for your financial actions, powered by a robust centralized notification system.
- **👤 Personalized Profile**: Manage your identity and preferences through a sleek, modal-driven profile interface.

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite for blazing-fast development.
- **Backend/Auth**: Firebase (Authentication & Cloud Firestore).
- **Styling**: Vanilla CSS with modern Flexbox/Grid layouts and premium Glassmorphism effects.
- **Icons**: [Lucide React](https://lucide.dev/) for a clean, consistent iconography.
- **State Management**: React Context API for lightweight, performant global state.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- A Firebase project (for Auth and Firestore)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/atharavtyagi/finora.git
   cd finora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🎨 Design System

Finora leverages a custom design system focused on:
- **Glassmorphism**: Subtle translucent overlays and borders.
- **Vibrant Gradients**: Indigo and Violet accents for primary actions.
- **Typography**: Utilizing the 'Outfit' and 'Inter' font families for a professional fintech feel.


