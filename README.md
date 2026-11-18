# NextBlog - Full-Stack Next.js 15 Blog Platform

A comprehensive blog platform showcasing all 11 Next.js features in a cohesive application. Built with Next.js 15, TypeScript, Tailwind CSS, NextAuth.js, Prisma, and MySQL.

## 🚀 Features

### All 11 Next.js Features Implemented:

1. ✅ **App Router** - Modern routing with the app directory
2. ✅ **Pages Router** - Legacy routing with pages directory (for comparison)
3. ✅ **Dynamic Routes** - Route parameters like `/blog/[slug]`
4. ✅ **Server Components** - Default components that render on server
5. ✅ **Client Components** - Interactive components with "use client"
6. ✅ **API Routes / Route Handlers** - REST API endpoints
7. ✅ **Server-Side Rendering (SSR)** - Dynamic data fetching per request
8. ✅ **Static Generation (SSG)** - Pre-rendered static pages
9. ✅ **Middleware** - Request interception, auth checks
10. ✅ **Authentication** - Login system with NextAuth.js (credentials + OAuth)
11. ✅ **Deployment** - Docker + Vercel configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js v5 (credentials + Google/GitHub OAuth)
- **Database**: Prisma ORM + MySQL
- **Deployment**: Docker, Vercel
- **Password Hashing**: bcryptjs

## 📁 Project Structure

```
nextblog/
├── src/
│   ├── app/                    # App Router (main application)
│   │   ├── (auth)/            # Route group for auth pages
│   │   │   ├── login/         # Login page (Client Component)
│   │   │   └── register/      # Registration page (Client Component)
│   │   ├── blog/              # Blog routes
│   │   │   ├── [slug]/        # Dynamic route (SSR)
│   │   │   └── page.tsx       # Blog list (SSR)
│   │   ├── admin/             # Protected admin routes
│   │   │   ├── posts/         # Post management
│   │   │   └── _actions/      # Server Actions
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   └── posts/         # Posts API
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page (SSG)
│   ├── pages/                 # Pages Router (minimal examples)
│   │   ├── legacy/            # Legacy routing examples
│   │   ├── _app.tsx
│   │   └── _document.tsx
│   ├── components/            # Reusable components
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   └── features/          # Feature-specific components
│   ├── lib/                   # Utilities
│   │   ├── prisma.ts          # Prisma Client
│   │   ├── auth-utils.ts      # Auth utilities
│   │   └── utils.ts           # General utilities
│   └── middleware.ts          # Route protection middleware
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data script
├── auth.ts                    # NextAuth configuration
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose for local dev
├── vercel.json                # Vercel deployment config
└── .env.example               # Environment variables template
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- MySQL database (or use Docker Compose)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amiru-dev/NextBlog.git
   cd NextBlog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   AUTH_SECRET="your-secret-key-generate-with-openssl-rand-base64-32"
   AUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Run Prisma migrations
   npx prisma migrate dev --name init

   # Generate Prisma Client
   npx prisma generate

   # (Optional) Seed the database with sample data
   npm run db:seed
   ```

5. **Generate AUTH_SECRET**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and set it as `AUTH_SECRET` in your `.env` file.

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Setup

### Using Docker Compose (Recommended for Local Development)

1. **Build and start the containers**
   ```bash
   docker-compose up --build
   ```

2. **The application will be available at** http://localhost:3000

3. **Stop the containers**
   ```bash
   docker-compose down
   ```

### Building Docker Image Only

```bash
docker build -t nextblog .
docker run -p 3000:3000 -e DATABASE_URL="your-db-url" -e AUTH_SECRET="your-secret" nextblog
```

## 🌐 Deployment

### Vercel Deployment

1. **Push your code to GitHub**
2. **Import the project in Vercel**
3. **Configure environment variables** in Vercel dashboard:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_URL`
   - (Optional) OAuth provider credentials

### Self-Hosting with Docker

1. **Build the image**
   ```bash
   docker build -t nextblog .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="mysql://user:pass@host:port/db" \
     -e AUTH_SECRET="your-secret" \
     -e AUTH_URL="https://your-domain.com" \
     nextblog
   ```

## 📝 Usage

### Authentication

- **Register**: Create an account at `/register`
- **Login**: Sign in at `/login` with:
  - Email/password (credentials)
  - Google OAuth (if configured)
  - GitHub OAuth (if configured)

### Blog Management

1. **Create a Post**:
   - Go to `/admin`
   - Click "Create New Post"
   - Fill in title, content, and publish status

2. **View Posts**:
   - Public posts at `/blog`
   - Individual posts at `/blog/[slug]`

3. **Admin Dashboard**:
   - Manage posts at `/admin/posts`
   - Protected by authentication

### API Endpoints

- `GET /api/posts` - Get all published posts
- `POST /api/posts` - Create a new post (requires auth)
- `GET /api/posts/[id]` - Get a single post
- `PUT /api/posts/[id]` - Update a post (requires auth)
- `DELETE /api/posts/[id]` - Delete a post (requires auth)

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:seed      # Seed database with sample data
```

## 📊 Database Schema

### User
- `id` - Primary key
- `name` - User name
- `email` - Unique email
- `passwordHash` - Hashed password
- `role` - User role (default: "user")
- `createdAt`, `updatedAt` - Timestamps

### Post
- `id` - Primary key
- `title` - Post title
- `content` - Post content
- `slug` - URL-friendly slug (unique)
- `published` - Published status
- `authorId` - Foreign key to User
- `createdAt`, `updatedAt` - Timestamps

### Comment
- `id` - Primary key
- `content` - Comment content
- `postId` - Foreign key to Post
- `authorId` - Foreign key to User
- `createdAt` - Timestamp

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based session management
- Protected routes with middleware
- OAuth support (Google, GitHub)
- Environment variable protection
- SQL injection prevention (Prisma ORM)

## 🧪 Testing the Features

### App Router vs Pages Router
- **App Router**: Visit `/blog` to see modern routing
- **Pages Router**: Visit `/pages` to see legacy routing

### Server vs Client Components
- **Server Components**: Blog list, individual posts (default)
- **Client Components**: Login, Register forms (with "use client")

### SSR vs SSG
- **SSR**: Blog pages (`/blog`, `/blog/[slug]`) - fetched per request
- **SSG**: Home page (`/`) - pre-rendered at build time

### Middleware Protection
- Try accessing `/admin` without logging in - redirects to `/login`
- Try accessing `/login` while logged in - redirects to `/admin`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- NextAuth.js for authentication
- Prisma for the excellent ORM
- Tailwind CSS for the utility-first CSS framework
