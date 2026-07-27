import { useMutation } from '@tanstack/react-query';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { uploadImageMutationOptions } from './query-options';

const UploadSubmitBtn = ({ image }: { image: File | null }) => {
  const navigate = useNavigate();
  const { userId } = useRouteContext({ from: '__root__' });
  const {
    mutate: uploadImage,
    error,
    isPending,
  } = useMutation(uploadImageMutationOptions({ userId }));

  return (
    <div className="flex flex-col items-center gap-2">
      <div>
        <button
          type="button"
          disabled={!image || isPending}
          className="px-3 py-2 flex items-center gap-2 bg-primary text-primary-foreground rounded-md transition-colors hover:bg-primary/90 disabled:opacity-50"
          onClick={() => {
            if (!image) {
              return;
            }

            uploadImage(
              { image },
              {
                onSuccess: () => {
                  navigate({ to: '/' });
                },
              },
            );
          }}
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}
          Submit image
        </button>
      </div>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
};

export default UploadSubmitBtn;
