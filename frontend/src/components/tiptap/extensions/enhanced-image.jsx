import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { ImageNodeView } from "./image-node-view"

export const EnhancedImageExtension = Node.create({
  name: "image",

  addOptions() {
    return {
      inline: false,
      allowBase64: true,
      HTMLAttributes: {}
    }
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? "inline" : "block"
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      width: {
        default: null
      },
      height: {
        default: null
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: "img[src]"
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView)
  },

  addCommands() {
    return {
      setImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        })
      },
      uploadImage: () => ({ commands }) => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.onchange = event => {
          const file = event.target.files?.[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = e => {
              const src = e.target?.result
              commands.setImage({ src, alt: file.name })
            }
            reader.readAsDataURL(file)
          }
        }
        input.click()
        return true
      }
    }
  }
})
