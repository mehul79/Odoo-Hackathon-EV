import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { CreatePostForm } from "./create-post-form" 

export function CreatePostModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async postData => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Clear local storage after successful submission
      localStorage.removeItem("draft-post")

      // Close modal
      onClose()

      // You could add a success toast here
      console.log("Post submitted successfully:", postData)
    } catch (error) {
      console.error("Failed to submit post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={e => e.preventDefault()}
        className="!max-w-[95vw] !max-h-[95vh] w-full h-full p-0 gap-0 overflow-hidden flex flex-col sm:!max-w-[95vw] md:!max-w-[90vw] lg:!max-w-[80vw]"
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white flex-shrink-0">
          <h2 className="text-2xl font-semibold text-gray-900">Create a new post</h2>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
            disabled={isSubmitting}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button> */}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto bg-gray-50 min-h-0">
          <div className="p-6 h-full">
            <CreatePostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
