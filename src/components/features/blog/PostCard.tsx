import Link from "next/link";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  slug: string;
  authorName: string | null;
  commentCount: number;
}

export function PostCard({
  id,
  title,
  content,
  slug,
  authorName,
  commentCount,
}: PostCardProps) {
  return (
    <article className="p-6 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">
        <Link href={`/blog/${slug}`} className="hover:text-blue-600">
          {title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{content}</p>
      <div className="text-sm text-gray-500">
        <span>By {authorName || "Anonymous"}</span>
        <span className="mx-2">•</span>
        <span>{commentCount} comments</span>
      </div>
    </article>
  );
}
