import { Extension } from "@tiptap/core"

export const ImagePlaceholder = Extension.create({
  name: "imagePlaceholder",

  addGlobalAttributes() {
    return [
      {
        types: ["image"],
        attributes: {
          loading: {
            default: "lazy"
          }
        }
      }
    ]
  }
})
