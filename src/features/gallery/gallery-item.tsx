import FavouriteBtn from './favourite/favourite-btn';
import VoteControls from './vote/vote-controls';
import VoteCounter from './vote/vote-counter';
import type { GalleryImage } from '#/lib/api/validators';

const GalleryItem = ({ image }: { image: GalleryImage }) => {
  const voteValue = image.vote?.value ?? 0;

  return (
    <div className="relative w-full aspect-square flex flex-col border rounded-lg overflow-hidden">
      <img className="w-full h-full object-cover" src={image.url} />
      <FavouriteBtn imageId={image.id} favouriteId={image.favourite?.id} />
      <VoteCounter value={voteValue} />
      <VoteControls imageId={image.id} value={voteValue} />
    </div>
  );
};

export default GalleryItem;
