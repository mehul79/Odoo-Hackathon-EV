"use client"

import { NodeViewWrapper } from "@tiptap/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Edit3 } from "lucide-react"

export function ImageNodeView({ node, updateAttributes, deleteNode }) {
  const [isEditing, setIsEditing] = useState(false)
  const [alt, setAlt] = useState(node.attrs.alt || "")

  const handleSave = () => {
    updateAttributes({ alt })
    setIsEditing(false)
  }

  return (
    <NodeViewWrapper className="image-node-view">
      <div className="relative group inline-block">
        <img
          src={node.attrs.src || "/placeholder.svg"}
          alt={node.attrs.alt}
          title={node.attrs.title}
          className="max-w-full h-auto rounded-lg shadow-sm"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsEditing(!isEditing)}
            className="h-8 w-8 p-0"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={deleteNode}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {isEditing && (
          <div className="mt-2 flex gap-2">
            <Input
              placeholder="Alt text"
              value={alt}
              onChange={e => setAlt(e.target.value)}
              className="flex-1"
            />
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}
