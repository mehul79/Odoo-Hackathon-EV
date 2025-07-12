"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Palette,
  Highlighter
} from "lucide-react"

const colors = [
  { name: "Default", value: "#000000" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Yellow", value: "#eab308" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
  { name: "Gray", value: "#6b7280" }
]

const highlightColors = [
  { name: "Yellow", value: "#fef08a" },
  { name: "Green", value: "#bbf7d0" },
  { name: "Blue", value: "#bfdbfe" },
  { name: "Pink", value: "#fbcfe8" },
  { name: "Purple", value: "#e9d5ff" },
  { name: "Orange", value: "#fed7aa" }
]

export function EnhancedEditorToolbar({ editor, disabled }) {
  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt("Enter URL:")
    if (url) {
      editor
        .chain()
        .focus()
        .setLink({ href: url })
        .run()
    }
  }

  const uploadImage = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = event => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = e => {
          const src = e.target?.result
          editor
            .chain()
            .focus()
            .setImage({ src, alt: file.name })
            .run()
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
      {/* Headings */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run()
        }
        className={
          editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
        }
        disabled={disabled}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 2 })
            .run()
        }
        className={
          editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
        }
        disabled={disabled}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 3 })
            .run()
        }
        className={
          editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
        }
        disabled={disabled}
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Text Formatting */}
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
        className={editor.isActive("bold") ? "bg-gray-200" : ""}
        disabled={disabled}
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
        className={editor.isActive("italic") ? "bg-gray-200" : ""}
        disabled={disabled}
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
        className={editor.isActive("underline") ? "bg-gray-200" : ""}
        disabled={disabled}
      >
        <Underline className="h-4 w-4" />
      </Button>

      {/* Text Color */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={disabled}>
            <Palette className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <div className="color-picker-grid">
            {colors.map(color => (
              <button
                key={color.value}
                className="color-picker-item"
                style={{ backgroundColor: color.value }}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setColor(color.value)
                    .run()
                }
                title={color.name}
                disabled={disabled}
              />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Highlight Color */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={disabled}>
            <Highlighter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <div className="color-picker-grid">
            {highlightColors.map(color => (
              <button
                key={color.value}
                className="color-picker-item"
                style={{ backgroundColor: color.value }}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setHighlight({ color: color.value })
                    .run()
                }
                title={color.name}
                disabled={disabled}
              />
            ))}
            <button
              className="color-picker-item border-2 border-gray-300"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .unsetHighlight()
                  .run()
              }
              title="Remove highlight"
              disabled={disabled}
            >
              ✕
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-6" />

      {/* Lists and Blocks */}
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
        className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
        disabled={disabled}
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
            .toggleOrderedList()
            .run()
        }
        className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
        disabled={disabled}
      >
        <ListOrdered className="h-4 w-4" />
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
        className={editor.isActive("blockquote") ? "bg-gray-200" : ""}
        disabled={disabled}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleCodeBlock()
            .run()
        }
        className={editor.isActive("codeBlock") ? "bg-gray-200" : ""}
        disabled={disabled}
      >
        <Code className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Media and Links */}
      <Button
        variant="ghost"
        size="sm"
        onClick={addLink}
        className={editor.isActive("link") ? "bg-gray-200" : ""}
        disabled={disabled}
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={uploadImage}
        disabled={disabled}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
