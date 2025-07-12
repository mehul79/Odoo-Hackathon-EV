import "./tiptap.css"
import "./tiptap-scroll.css"
import { cn } from "@/lib/utils"
import { EnhancedImageExtension } from "@/components/tiptap/extensions/enhanced-image"
import { ImagePlaceholder } from "@/components/tiptap/extensions/image-placeholder"
import SearchAndReplace from "@/components/tiptap/extensions/search-and-replace"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { TipTapFloatingMenu } from "@/components/tiptap/extensions/floating-menu"
import { FloatingToolbar } from "@/components/tiptap/extensions/floating-toolbar"
import { EnhancedEditorToolbar } from "./toolbars/enhanced-editor-toolbar"
import Placeholder from "@tiptap/extension-placeholder"
import { content } from "@/lib/content"

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
    codeBlock: {
      HTMLAttributes: {
        class: "code-block-light",
      },
    },
  }),
  Placeholder.configure({
    emptyNodeClass: "is-editor-empty",
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return `Heading ${node.attrs.level}`
        case "detailsSummary":
          return "Section title"
        case "codeBlock":
          return "Enter your code here..."
        default:
          return "Write, type '/' for commands"
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-blue-600 underline hover:text-blue-800 cursor-pointer",
    },
  }),
  Color.configure({
    types: ["textStyle"],
  }),
  Highlight.configure({
    multicolor: true,
  }),
  EnhancedImageExtension.configure({
    inline: false,
    allowBase64: true,
  }),
  ImagePlaceholder,
  SearchAndReplace,
  Typography,
]

export function RichTextEditorDemo({ className, onChange, disabled,content="" }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions,
    content,
    editable: !disabled,
    editorProps: {
      attributes: {
        class: "max-w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (onChange) {
        onChange(html)
      }
      console.log(editor.getText())
    },
  })

  if (!editor) return null

  return (
    <div className={cn("relative w-full bg-card flex flex-col", className)}>
      <EnhancedEditorToolbar editor={editor} disabled={disabled} />
      <div className="flex-1 overflow-auto min-h-[400px] max-h-[500px]">
        <FloatingToolbar editor={editor} />
        <TipTapFloatingMenu editor={editor} />
        <EditorContent
          editor={editor}
          className="w-full min-w-full cursor-text p-6 prose prose-sm max-w-none overflow-x-auto"
        />
      </div>
    </div>
  )
}
