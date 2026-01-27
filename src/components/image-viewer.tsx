import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageViewerProps {
  imageUrl: string;
  alt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageViewer({
  imageUrl,
  alt,
  open,
  onOpenChange,
}: ImageViewerProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "w-full max-w-[95vw] max-h-[95vh] p-4",
          )}
          onPointerDownOutside={(e) => {
            e.preventDefault();
            onOpenChange(false);
          }}
          onEscapeKeyDown={() => onOpenChange(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={imageUrl}
              alt={alt}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-md"
            />
            <DialogPrimitive.Close
              className={cn(
                "absolute top-2 right-2 rounded-sm opacity-70 ring-offset-background transition-opacity",
                "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:pointer-events-none bg-background/80 backdrop-blur-sm p-2",
              )}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
