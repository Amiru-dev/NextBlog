import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PostsPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div>
        <p>Please log in to access this page.</p>
        <Link href="/login" className="text-blue-600">
          Go to Login
        </Link>
      </div>
    );
  }

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Posts</h1>
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
            <div key={post.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    By {post.author.name || "Anonymous"} •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={post.published ? "text-green-600" : "text-yellow-600"}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <span>{post._count.comments} comments</span>
                  </div>
                </div>
                <div className="ml-4 space-x-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
