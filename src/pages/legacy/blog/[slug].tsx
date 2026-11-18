// This is a Pages Router dynamic route example
// For comparison with App Router dynamic routes

import { useRouter } from "next/router";
import Link from "next/link";

export default function LegacyBlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>

        <div className="mt-6">
          <h1 className="text-4xl font-bold mb-4">Pages Router Dynamic Route</h1>
          <div className="p-6 border rounded-lg bg-yellow-50 mb-6">
            <h2 className="text-xl font-semibold mb-2">Route Parameter</h2>
            <p className="text-gray-600">
              Slug: <code className="bg-gray-200 px-2 py-1 rounded">{slug || "Loading..."}</code>
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">About Pages Router</h2>
            <p className="text-gray-600 mb-4">
              This is an example of the legacy Pages Router dynamic routing pattern.
              In the Pages Router, dynamic routes are created using square brackets
              in the filename, like [slug].tsx.
            </p>
            <p className="text-gray-600">
              The App Router (used in the main application) provides a more modern
              approach with Server Components by default and better performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
