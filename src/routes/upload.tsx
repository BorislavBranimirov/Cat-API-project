import { createFileRoute } from '@tanstack/react-router';
import UploadImageCard from '#/features/upload-image/upload-image-card';

export const Route = createFileRoute('/upload')({
  component: UploadPage,
});

function UploadPage() {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div>
        <h1 className="text-2xl font-bold">Image Uploader</h1>
        <p className="text-sm text-muted-foreground">
          Upload images to your cat gallery
        </p>
      </div>

      <div className="flex justify-center">
        <UploadImageCard />
      </div>
    </div>
  );
}
