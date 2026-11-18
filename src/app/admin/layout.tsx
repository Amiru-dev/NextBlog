import Link from "next/link";
import { auth, signOut } from "../../../../auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen">
      <header className="border-b p-4 bg-gray-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            NextBlog Admin
          </Link>
          <nav className="space-x-4">
            <Link href="/admin" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/admin/posts" className="hover:text-blue-600">
              Posts
            </Link>
            <Link href="/blog" className="hover:text-blue-600">
              View Blog
            </Link>
            {session?.user && (
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <button className="text-red-600 hover:text-red-700">
                  Sign Out
                </button>
              </form>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-8">{children}</main>
    </div>
  );
}
