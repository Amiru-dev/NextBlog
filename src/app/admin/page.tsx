import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div>
        <p>Please log in to access the admin dashboard.</p>
        <Link href="/login" className="text-blue-600">
          Go to Login
        </Link>
      </div>
    );
  }

  const posts = await prisma.post.findMany({
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Welcome, {session.user.name || session.user.email}!</h2>
        <p className="text-gray-600">Role: {session.user.role || "user"}</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  {post.published ? "Published" : "Draft"} • {post._count.comments} comments
                </p>
              </div>
              <div className="space-x-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
