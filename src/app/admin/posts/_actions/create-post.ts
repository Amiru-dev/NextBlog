"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "true";

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const post = await prisma.post.create({
    data: {
      title,
      content,
      slug,
      published,
      authorId: parseInt(session.user.id),
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/blog");

  return post;
}
