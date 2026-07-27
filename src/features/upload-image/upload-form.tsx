import { ImageUp, Upload } from 'lucide-react';
import { useMemo, useState } from 'react';
import UploadSubmitBtn from './upload-submit-btn';

const UploadForm = () => {
  const [image, setImage] = useState<File | null>(null);

  // Generate a preview of the selected image
  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div
        className="p-4 w-full flex flex-col items-center gap-2 border-2 border-dashed rounded-lg text-center"
        onDrop={(e) => {
          e.preventDefault();

          const droppedImage = e.dataTransfer.files[0];
          if (droppedImage && droppedImage.type.startsWith('image/')) {
            setImage(droppedImage);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {preview ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={preview}
              alt="Selected cat image"
              className="w-full h-48 object-contain"
            />
            <p className="text-sm text-muted-foreground">{image?.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="size-6" />
            <div>
              <p className="text-sm font-bold">
                Drag and drop a cat image here
              </p>
              <p className="text-sm text-muted-foreground">
                or click below to select a file
              </p>
            </div>
          </div>
        )}
        <div>
          <label
            htmlFor="upload-btn"
            role="button"
            className="px-2.5 py-1.5 flex items-center gap-2 bg-secondary text-secondary-foreground rounded-md text-xs cursor-pointer transition-colors hover:bg-secondary/80"
          >
            <ImageUp className="size-4" />
            Browse images
          </label>
          <input
            id="upload-btn"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const selectedImage = e.currentTarget.files?.[0];
              if (selectedImage && selectedImage.type.startsWith('image/')) {
                setImage(selectedImage);
              }
            }}
          />
        </div>
      </div>

      <UploadSubmitBtn image={image} />
    </div>
  );
};

export default UploadForm;
