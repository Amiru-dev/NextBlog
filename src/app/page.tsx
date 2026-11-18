// This page uses Static Generation (SSG)
// It's pre-rendered at build time for optimal performance

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to NextBlog</h1>
        <p className="text-lg text-gray-600 mb-8">
          A comprehensive Next.js 15 blog platform showcasing all 11 Next.js features
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">App Router</h2>
            <p className="text-gray-600">Modern routing with the app directory</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Server Components</h2>
            <p className="text-gray-600">Default components that render on server</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Client Components</h2>
            <p className="text-gray-600">Interactive components with &quot;use client&quot;</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">API Routes</h2>
            <p className="text-gray-600">REST API endpoints with Route Handlers</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">SSR & SSG</h2>
            <p className="text-gray-600">Server-side rendering and static generation</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Middleware</h2>
            <p className="text-gray-600">Request interception and auth checks</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Authentication</h2>
            <p className="text-gray-600">NextAuth.js with credentials and OAuth</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Database</h2>
            <p className="text-gray-600">Prisma ORM with MySQL</p>
          </div>
        </div>

        <div className="mt-8 space-x-4">
          <a
            href="/blog"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Blog Posts
          </a>
          <a
            href="/pages/home"
            className="inline-block px-6 py-3 border rounded-lg hover:bg-gray-50 transition"
          >
            Pages Router Example
          </a>
        </div>
      </div>
    </main>
  );
}
