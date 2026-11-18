"use server";

import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePost(id: number) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/blog");

  return { success: true };
}
