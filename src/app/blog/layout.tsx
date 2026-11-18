import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            NextBlog
          </Link>
          <nav className="space-x-4">
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-8">{children}</main>
    </div>
  );
}
