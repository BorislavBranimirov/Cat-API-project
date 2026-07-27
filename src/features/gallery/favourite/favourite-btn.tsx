import { useMutation } from '@tanstack/react-query';
import { useRouteContext } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { updateImageFavouriteMutationOptions } from './query-options';

const FavouriteBtn = ({
  imageId,
  favouriteId,
}: {
  imageId: string;
  favouriteId: number | undefined;
}) => {
  const { userId } = useRouteContext({ from: '__root__' });
  const { mutate: updateImageFavourite, isPending } = useMutation(
    updateImageFavouriteMutationOptions({ userId }),
  );

  return (
    <button
      className="absolute top-2 right-2"
      disabled={isPending}
      aria-label={
        favouriteId !== undefined
          ? 'unfavourite the image'
          : 'favourite the image'
      }
      onClick={() => {
        updateImageFavourite({ imageId, favouriteIdToRemove: favouriteId });
      }}
    >
      <Heart
        className={`size-6 stroke-white ${favouriteId !== undefined ? 'fill-pink-500' : 'fill-white/0'} transition-colors duration-300`}
      />
    </button>
  );
};

export default FavouriteBtn;
