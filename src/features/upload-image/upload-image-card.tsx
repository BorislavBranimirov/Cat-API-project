import UploadForm from './upload-form';

const UploadImageCard = () => {
  return (
    <div className="p-4 w-full md:max-w-2/3 lg:max-w-1/3 flex flex-col items-center gap-4 bg-card text-card-foreground border rounded-lg">
      <div className="flex flex-col items-center text-center">
        <p className="text-lg font-bold">Upload a cat image to get started</p>
        <p className="text-sm text-muted-foreground">
          Only images containing cats will be accepted
        </p>
      </div>
      <UploadForm />
    </div>
  );
};

export default UploadImageCard;
