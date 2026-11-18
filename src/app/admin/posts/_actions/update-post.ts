"use server";

import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePost(id: number, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "true";

  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      published,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);

  return post;
}
