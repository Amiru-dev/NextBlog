import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createPost(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "true";

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { prisma } = await import("@/lib/prisma");

  await prisma.post.create({
    data: {
      title,
      content,
      slug,
      published,
      authorId: parseInt(session.user.id),
    },
  });

  redirect("/admin/posts");
}

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/posts" className="text-blue-600 hover:underline">
          ← Back to Posts
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6">Create New Post</h1>

      <form action={createPost} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full p-3 border rounded-lg"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Content</label>
          <textarea
            name="content"
            required
            rows={10}
            className="w-full p-3 border rounded-lg"
            placeholder="Write your post content..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="published"
            id="published"
            value="true"
            className="w-4 h-4"
          />
          <label htmlFor="published" className="font-semibold">
            Publish immediately
          </label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Post
          </button>
          <Link
            href="/admin/posts"
            className="px-6 py-3 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
