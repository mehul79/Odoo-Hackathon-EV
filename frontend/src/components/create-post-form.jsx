import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";
import { RichTextEditorDemo } from "./rich-text-editor";
import axios from 'axios'
const STORAGE_KEY = "draft-post";

export function CreatePostForm({ onSubmit, isSubmitting }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setTitle(draft.title || "");
        setContent(draft.content || "");
        setTags(draft.tags || []);
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  // Save draft to localStorage whenever form data changes
  useEffect(() => {
    const draft = {
      title,
      description: content,
      tags,
    };

    // Only save if there's actual content
    if (title || content || tags.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    }
  }, [title, content, tags]);

  const handleTagInput = (e) => {
    if (e.key === " " && tagInput.trim()) {
      e.preventDefault();
      if (tags.length >= 4) return;
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const postData = {
  //     title,
  //     content,
  //     tags,
  //     createdAt: new Date().toISOString(),
  //   };

  //   await onSubmit(postData);
  // };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      tags,
      createdAt: new Date().toISOString(),
    };

    try {
      // isSubmitting(true);

      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:8000/questions", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("Post submitted successfully:", response.data);

      localStorage.removeItem(STORAGE_KEY); // Clear draft after successful post
      setTitle("");
      setContent("");
      setTags([]);
      await onSubmit(postData);
    } catch (error) {
      console.error("Failed to submit post:", error);
    } finally {
      // isSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full">
      <Card className="shadow-lg border-0 bg-white h-full flex flex-col">
        <CardContent className="p-8 flex-1 overflow-auto pt-0">
          <form onSubmit={handleSubmit} className="space-y-8 min-h-full">
            {/* All existing form content remains the same */}

            {/* Title Input */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Add a title…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
                disabled={isSubmitting}
              />
            </div>


            {/* Rich Text Editor */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Content
              </Label>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <RichTextEditorDemo
                  className="border-0 max-h-[400px] overflow-auto"
                  onChange={handleContentChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Tags Input */}
            <div className="space-y-3">
              <Label
                htmlFor="tags"
                className="text-sm font-medium text-gray-700"
              >
                Tags
              </Label>
              <Input
                id="tags"
                type="text"
                placeholder="Type a tag and press space to add…"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                disabled={isSubmitting || tags.length >= 4}
              />
              {tags.length >= 4 && (
                <div className="text-xs text-red-500 pt-1">
                  Maximum 4 tags allowed.
                </div>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 max-h-32 overflow-y-auto">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1 text-sm font-medium flex-shrink-0"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-blue-900 transition-colors"
                        aria-label={`Remove ${tag} tag`}
                        disabled={isSubmitting}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button - Sticky at bottom */}
            <div className="pt-6 border-t border-gray-100  bottom-0 bg-white -mx-8 px-8 -mb-8 pb-8">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
                disabled={isSubmitting || !title.trim()}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Publishing Post...
                  </>
                ) : (
                  "Add Post"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
