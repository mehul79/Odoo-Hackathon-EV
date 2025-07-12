import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatePostModal } from "@/components/create-post-modal"; 

const Temp = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsCreatePostOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-sm transition-colors m-8 absolute right-5"
      >
        <Plus className="h-4 w-4 mr-2" />
        Post
      </Button>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  );
};

export default Temp;
