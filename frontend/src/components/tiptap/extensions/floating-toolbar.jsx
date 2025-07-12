"use client"

import { BubbleMenu } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Bold, Italic, Underline, Link, Palette } from "lucide-react"

const quickColors = [
  { name: "Default", value: "#000000" },
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Purple", value: "#a855f7" }
]

export function FloatingToolbar({ editor }) {
  return (
    <BubbleMenu
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
            .toggleUnderline()
            .run()
        }
        className={editor.isActive("underline") ? "bg-gray-100" : ""}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Palette className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="flex gap-1 p-2">
            {quickColors.map(color => (
              <button
                key={color.value}
                className="w-6 h-6 rounded border-2 border-gray-200 hover:border-gray-400"
                style={{ backgroundColor: color.value }}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setColor(color.value)
                    .run()
                }
                title={color.name}
              />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const url = window.prompt("Enter URL:")
          if (url) {
            editor
              .chain()
              .focus()
              .setLink({ href: url })
              .run()
          }
        }}
        className={editor.isActive("link") ? "bg-gray-100" : ""}
      >
        <Link className="h-4 w-4" />
      </Button>
    </BubbleMenu>
  )
}
