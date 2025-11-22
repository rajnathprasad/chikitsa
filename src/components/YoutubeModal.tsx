import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { AspectRatio } from "./ui/aspect-ratio";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface YoutubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title?: string;
}

export function YoutubeModal({ isOpen, onClose, videoId, title = "Demo Video" }: YoutubeModalProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        <div className="relative">
          {/* Header with close button */}
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close video</span>
            </Button>
          </div>
          
          {/* Hidden title and description for accessibility */}
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Watch the Chikitsa platform demonstration video
          </DialogDescription>
          
          {/* Video container */}
          <AspectRatio ratio={16 / 9}>
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
}