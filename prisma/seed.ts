import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create a sample user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@example.com',
      passwordHash: hashedPassword,
      role: 'admin',
    },
  });

  // Create sample posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with Next.js 15',
      content: 'Next.js 15 brings exciting new features to the App Router...',
      slug: 'getting-started-with-nextjs-15',
      published: true,
      authorId: user.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Understanding Server Components',
      content: 'Server Components are the default in Next.js 15...',
      slug: 'understanding-server-components',
      published: true,
      authorId: user.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'Authentication with NextAuth.js v5',
      content: 'NextAuth.js v5 simplifies authentication in Next.js...',
      slug: 'authentication-with-nextauthjs-v5',
      published: true,
      authorId: user.id,
    },
  });

  // Create sample comments
  await prisma.comment.create({
    data: {
      content: 'Great article! Very helpful.',
      postId: post1.id,
      authorId: user.id,
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
