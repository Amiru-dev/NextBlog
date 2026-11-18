import Link from "next/link";

export function Header() {
  return (
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
  );
}
