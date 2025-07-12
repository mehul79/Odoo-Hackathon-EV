import { Node, mergeAttributes } from "@tiptap/core"

export const ImageExtension = Node.create({
  name: "image",

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
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

  addCommands() {
    return {
      setImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        })
      }
    }
  }
})
