
# 🛒 Cartify – Modern E-Commerce Platform (Client)

Cartify is a **full-stack e-commerce platform** frontend built with **Next.js 15** and **React 19**.  
It provides a smooth shopping experience with **authentication, product management, cart, payment, review system, and admin dashboard**.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9502a658-2f5a-4452-b101-395b933755c4" />

## 📺 Vedio
https://drive.google.com/file/d/1j0zbbrBP_P2ZG_jMSnnr1TtQB6_Ct7qJ/view?usp=sharing

## 🌐 Live Link
https://craftify-server.vercel.app
## Features

- **Role‑Based Routing** – Admin and customer dashboards protected by Next.js middleware.
- **Server‑Side Data Fetching** – Uses `fetch` with Next.js cache tags for ISR.
- **Reusable UI Primitives** – Shadcn/ui components (`button`, `dialog`, `table`, etc.).
- **Responsive Design** – Mobile‑first layout with custom `useIsMobile` hook.
- **Animations** – Lottie animations for loading and 404 pages.
- **File Upload** – Single image uploader component.
- **Authentication** – Context‑based user handling with JWT stored in cookies.

## Tech Stack

| Category | Tools |
|----------|-------|
| **Framework** | Next.js 13 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **State** | React Context (`UserContext`) |
| **Animations** | Lottie (`lottie-react`) |
| **API Calls** | `fetch` with server actions |
| **Deployment** | Vercel (compatible) |
| **Version Control** | Git |

## Project Structure

```
src/
├─ app/
│  ├─ (CommonLayout)      # Public pages (home, product, auth)
│  ├─ (DashboardLayout)   # Admin & customer dashboards
│  └─ ...                 # Layouts, loading, not‑found
├─ components/
│  ├─ module/             # Feature modules (Auth, Dashboard, Home, ProductDetails)
│  ├─ shared/             # Footer, Navbar, HomeSlider, ImageUploader
│  └─ ui/                 # Shadcn UI primitives
├─ context/               # UserContext
├─ hooks/                 # Custom hooks (use‑mobile, file‑upload)
├─ lib/                   # Utility functions (cn)
├─ services/              # API wrappers (Auth, Cart, Category, Payment, Product, Review, User)
├─ provider/              # Provider component
└─ middleware.ts          # Role‑based route protection
public/
│  ├─ images, icons, Lottie JSON files
│  └─ favicon.ico
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** or **npm** (the repo uses a `package-lock.json`, so npm works out of the box)
- Access to the **Cartify backend API** (set `NEXT_PUBLIC_BACKEND_URL`)

### Installation

```bash
git clone https://github.com/your-username/Cartify_client.git
cd Cartify_client
npm install
```

### Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.com
```

> The authentication token is stored in an `accessToken` cookie; the backend should set this on login.

## Running Locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. The app will automatically reload on file changes.

## Deployment

The repository is Vercel‑ready. Just push to a GitHub branch connected to Vercel, and Vercel will:

1. Install dependencies.
2. Build with `next build`.
3. Deploy the output.

Make sure to add the same `NEXT_PUBLIC_BACKEND_URL` environment variable in the Vercel dashboard.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

--- 
