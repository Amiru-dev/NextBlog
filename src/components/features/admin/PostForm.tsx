"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface PostFormProps {
  onSubmit: (data: { title: string; content: string; published: boolean }) => void;
  initialData?: { title: string; content: string; published: boolean };
}

export function PostForm({ onSubmit, initialData }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [published, setPublished] = useState(initialData?.published || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, published });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Enter post title"
      />

      <div>
        <label className="block mb-2 font-semibold">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className="w-full p-3 border rounded-lg"
          placeholder="Write your post content..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="published" className="font-semibold">
          Publish immediately
        </label>
      </div>

      <div className="flex space-x-4">
        <Button type="submit">
          {initialData ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
