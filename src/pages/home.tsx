// This is a Pages Router example (legacy routing)
// For comparison with App Router

import Link from "next/link";

export default function PagesHome() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Pages Router Example</h1>
        <p className="text-lg text-gray-600 mb-8">
          This page uses the legacy Pages Router pattern for comparison.
        </p>

        <div className="p-6 border rounded-lg bg-yellow-50 mb-6">
          <h2 className="text-xl font-semibold mb-2">Note</h2>
          <p className="text-gray-600">
            The main application uses the modern App Router. This is just a minimal
            example to demonstrate the Pages Router pattern.
          </p>
        </div>

        <div className="space-y-4">
          <a href="/" className="block p-4 border rounded-lg hover:bg-gray-50">
            <h3 className="font-semibold">Go to App Router Home</h3>
            <p className="text-gray-600">Main application with App Router</p>
          </a>
          <a href="/legacy/blog/test-post" className="block p-4 border rounded-lg hover:bg-gray-50">
            <h3 className="font-semibold">View Dynamic Route Example</h3>
            <p className="text-gray-600">Pages Router dynamic route: /legacy/blog/[slug]</p>
          </a>
        </div>
      </div>
    </div>
  );
}
