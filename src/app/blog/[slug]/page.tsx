// This page uses Server-Side Rendering (SSR)
// Individual post is fetched dynamically on each request

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div>
      <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Blog
      </Link>

      <article className="mt-6">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          <span>By {post.author.name || "Anonymous"}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="prose max-w-none mb-8">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>

        <section className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Comments ({post.comments.length})
          </h2>

          {post.comments.length === 0 ? (
            <p className="text-gray-600">No comments yet.</p>
          ) : (
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">
                    {comment.author.name || "Anonymous"}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
    </div>
  );
}
