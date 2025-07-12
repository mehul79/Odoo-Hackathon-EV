import { Extension } from "@tiptap/core"

const SearchAndReplace = Extension.create({
  name: "searchAndReplace",

  addCommands() {
    return {
      search: term => ({ editor }) => {
        // Basic search implementation
        const { state } = editor
        const { doc } = state
        let found = false

        doc.descendants((node, pos) => {
          if (node.isText && node.text?.includes(term)) {
            found = true
            return false
          }
        })

        return found
      }
    }
  }
})

export default SearchAndReplace
