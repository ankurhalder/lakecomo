# Spies of Style 🎬

A modern, production-ready cinematic event experience website built with Next.js 16, React 19, TypeScript, and Sanity CMS. Features smooth animations, a unified landing page, and a custom Sanity Migration Engine for seamless content syncing across environments.

## ✨ Features

- **🎥 Cinematic Landing Page** - Unified landing page with hero videos, mission story, experiences, and upcoming events.
- **🕵️ Mission Experience** - An immersive espionage experience module (`/mission-experience`) detailing the real WWII spy story on Lake Como.
- **📅 Events System** - Dynamic recurring and single ticketed event management directly from the CMS.
- **💌 Contact & Inquire Form** - Interactive, scroll-to contact form with Nodemailer email integration.
- **🎨 Smooth Animations** - Powered by Framer Motion, Lenis scroll, and custom canvas-based falling stars.
- **📱 Fully Responsive & Accessible** - Mobile-first design with focus trap and keyboard navigation support.
- **🎨 Headless CMS** - Sanity Studio integrated locally at `/admin` for easy content management.
- **⚙️ Sanity Migration Engine v3** - Custom build tools for schema introspection, data diffing, and environment syncing.

## 🛠️ Tech Stack

### Core
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - Latest React with Server Components
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling with `@tailwindcss/postcss`

### CMS & Content
- **Sanity 4.22.0** - Headless CMS
- **next-sanity 11.6.12** - Sanity integration for Next.js
- **@sanity/image-url** - Optimized image handling

### Animations & UX
- **Framer Motion 12.23.26** - Advanced animations and scroll parallax
- **Lenis 1.3.17** - Smooth scroll experience
- **focus-trap-react** - Accessibility focus management
- **Lucide React** - Beautiful icon system

### Utilities & Developer Tools
- **Nodemailer 7.0.12** - Email functionality
- **React Compiler** - Automatic optimizations (`babel-plugin-react-compiler`)
- **tsx** - Execution of custom Sanity migration scripts

## 📁 Project Structure

```
spies-of-style/
├── src/
│   ├── app/
│   │   ├── (main)/              # Main landing page routes & sections
│   │   │   ├── sections/        # Modular sections (Hero, Story, Assignment, etc.)
│   │   │   └── page.tsx         # Consolidated Homepage
│   │   ├── admin/               # Sanity Studio route
│   │   ├── api/                 # API routes (revalidate, send-email)
│   │   ├── mission-experience/  # Standalone Mission Experience page
│   │   ├── globals.css          # Global styles & Tailwind
│   │   ├── layout.tsx           # Root layout
│   │   ├── not-found.tsx        # Custom 404 page
│   │   └── sitemap.ts           # SEO sitemap
│   ├── components/              # Reusable components (Layout, Providers, Shared)
│   ├── sanity/                  # Sanity configuration
│   │   ├── lib/                 # Sanity client & GROQ data fetching queries
│   │   ├── schemaTypes/         # Content schemas (landingPage, event, navbar, etc.)
│   │   └── structure.ts         # Studio structure config
│   └── proxy.ts                 # Next.js middleware / proxy redirects
├── scripts/
│   └── sanity/                  # Custom Sanity Migration Engine v3 scripts
├── sanity-mirror/               # Local JSON mirror of the Sanity dataset for migrations
├── public/                      # Static assets
├── sanity.config.ts             # Sanity Studio config
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm package manager
- Sanity account (for CMS)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankurhalder/lakecomo.git
   cd lakecomo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-12-27

   # Required for Sanity CMS seeding / restore operations
   SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS=sk...
   SANITY_MIGRATE_CONFIRM=yes

   # Email Configuration (for contact form)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_TO=recipient@example.com

   # Site URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Sanity Studio Setup

1. **Access Sanity Studio**
   
   Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)

2. **Login with your Sanity account**

3. **Manage content** - Landing Page, Mission Experience, Events, Navbar, and Footer.

## 📝 Available Scripts

```bash
# Development & Build
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Sanity Migration Engine v3
npm run sanity:export      # Export live CMS → sanity-mirror/documents/
npm run sanity:diff        # Compare live vs mirror → diff-report.json
npm run sanity:plan        # Generate migration-plan.json from diff
npm run sanity:seed        # Upsert mirror docs into live Sanity
npm run sanity:migrate     # Full pipeline: snapshot → diff → plan → seed
```

> **Note**: For a complete list of Sanity migration scripts and detailed workflow, see [`SANITY_MIGRATION.md`](./SANITY_MIGRATION.md).

## 🎨 Customization

### Styling

- **Global styles & Theme Colors**: Edit `src/app/globals.css`
- **Tailwind**: Configure via `postcss.config.mjs` and CSS variables

### Content Schemas

Add or modify content types in `src/sanity/schemaTypes/`. The schemas are defined using Sanity's `defineType` and `defineField`. Ensure you update GROQ queries in `src/sanity/lib/` to reflect schema changes.

## 🔧 Configuration

### Next.js Configuration

The `next.config.ts` includes:
- React Compiler enabled (`reactCompiler: true`)
- Image optimization with `cdn.sanity.io` remote patterns
- Permanent redirects for deprecated legacy routes (`/themes`, `/cast`, `/gallery`, etc.) pointing back to the unified homepage.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

## 📄 License

This project is private and proprietary. All rights reserved.

## 👤 Author

**Ankur Halder**
- GitHub: [@ankurhalder](https://github.com/ankurhalder)
- Location: Kolkata, India

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Sanity.io for the powerful CMS
- Framer Motion for smooth animations
- Tailwind CSS for the utility-first approach

---

**Built with ❤️ using Next.js 16 and Sanity CMS**