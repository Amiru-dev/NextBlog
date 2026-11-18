// This page uses Server-Side Rendering (SSR)
// Posts are fetched dynamically on each request

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
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
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
              <div className="text-sm text-gray-500">
                <span>By {post.author.name || "Anonymous"}</span>
                <span className="mx-2">•</span>
                <span>{post._count.comments} comments</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
