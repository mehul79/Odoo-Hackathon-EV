"use client"

import { FloatingMenu } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, Quote } from "lucide-react"

export function TipTapFloatingMenu({ editor }) {
  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex gap-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive("bold") ? "bg-gray-100" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive("italic") ? "bg-gray-100" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        }
        className={editor.isActive("bulletList") ? "bg-gray-100" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBlockquote()
            .run()
        }
        className={editor.isActive("blockquote") ? "bg-gray-100" : ""}
      >
        <Quote className="h-4 w-4" />
      </Button>
    </FloatingMenu>
  )
}
