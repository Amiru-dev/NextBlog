"use server";

import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addComment(postId: number, content: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: parseInt(session.user.id),
    },
  });

  revalidatePath(`/blog/[slug]`);

  return comment;
}
