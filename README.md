# Lake Como 🎬

A modern, production-ready movie website built with Next.js 16, React 19, TypeScript, and Sanity CMS. Features smooth animations, responsive design, and a comprehensive content management system.

## ✨ Features

- **🎥 Movie Information System** - Detailed movie pages with cast, crew, and production information
- **📸 Gallery Showcase** - Beautiful image galleries with optimized loading
- **🎭 Cast & Crew Pages** - Dedicated pages for actors and production team
- **📍 Venue Information** - Interactive venue details with custom map styling
- **🎨 Themes Exploration** - Thematic content organization
- **📝 Production Process** - Behind-the-scenes content and filmmaking insights
- **💌 Contact Form** - Email integration with Nodemailer
- **❓ FAQ Section** - Frequently asked questions
- **🔍 SEO Optimized** - Dynamic sitemap generation and meta tags
- **🎨 Smooth Animations** - Powered by Framer Motion and Lenis scroll
- **📱 Fully Responsive** - Mobile-first design approach
- **♿ Accessible** - Focus trap and keyboard navigation support
- **🎨 Headless CMS** - Sanity Studio for easy content management

## 🛠️ Tech Stack

### Core
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - Latest React with Server Components
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling

### CMS & Content
- **Sanity 4.22.0** - Headless CMS
- **next-sanity 11.6.12** - Sanity integration for Next.js
- **@sanity/image-url** - Optimized image handling
- **@sanity/vision** - Query testing and debugging

### Animations & UX
- **Framer Motion 12.23.26** - Advanced animations
- **Lenis 1.3.17** - Smooth scroll experience
- **focus-trap-react** - Accessibility focus management

### Utilities
- **Lucide React** - Beautiful icon system
- **clsx & tailwind-merge** - Conditional styling
- **Nodemailer 7.0.12** - Email functionality

### Developer Tools
- **ESLint 9** - Code quality
- **React Compiler** - Automatic optimizations
- **PostCSS** - CSS processing

## 📁 Project Structure

```
lakecomo/
├── src/
│   ├── app/
│   │   ├── (main)/          # Main application routes
│   │   │   ├── cast/        # Cast members page
│   │   │   ├── contact/     # Contact form
│   │   │   ├── crew/        # Crew members page
│   │   │   ├── faq/         # FAQ page
│   │   │   ├── gallery/     # Image gallery
│   │   │   ├── movie/       # Movie details
│   │   │   ├── process/     # Production process
│   │   │   ├── themes/      # Thematic content
│   │   │   ├── venue/       # Venue information
│   │   │   └── page.tsx     # Homepage
│   │   ├── admin/           # Sanity Studio
│   │   ├── api/             # API routes
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   ├── not-found.tsx    # 404 page
│   │   └── sitemap.ts       # SEO sitemap
│   ├── components/          # Reusable components
│   ├── lib/                 # Utilities & helpers
│   └── sanity/              # Sanity configuration
│       ├── schemaTypes/     # Content schemas
│       ├── lib/             # Sanity client & queries
│       ├── env.ts           # Environment config
│       └── structure.ts     # Studio structure
├── public/                  # Static assets
├── scripts/                 # Build & utility scripts
├── lakecomostyle.json      # Custom map styling
├── sanity.config.ts        # Sanity Studio config
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
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
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=your_api_token

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

3. **Start creating content** - movies, cast members, crew, gallery images, etc.

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Customization

### Styling

- **Global styles**: Edit `src/app/globals.css`
- **Tailwind config**: Modify `tailwind.config.ts`
- **Theme colors**: Update CSS variables in `globals.css`

### Content Schemas

Add or modify content types in `src/sanity/schemaTypes/`:

```typescript
// Example: Add a new content type
export const customType = {
  name: 'customType',
  title: 'Custom Type',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    // Add more fields...
  ]
}
```

### Map Styling

Customize the map appearance by editing `lakecomostyle.json` with your preferred Mapbox or Google Maps style.

## 🔧 Configuration

### Next.js Configuration

The `next.config.ts` includes optimizations for:
- Image optimization with Sanity CDN
- Environment variable handling
- Build optimizations with React Compiler

### TypeScript Configuration

Strict mode enabled with path aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

Build the application:
```bash
npm run build
```

The output will be in the `.next` folder. Follow your platform's deployment guide for Next.js applications.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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
- The open-source community

## 📞 Support

For support, questions, or feedback:
- Open an issue on GitHub
- Contact through the website's contact form

---

**Built with ❤️ using Next.js 16 and Sanity CMS**