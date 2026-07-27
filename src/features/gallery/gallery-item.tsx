import FavouriteBtn from './favourite/favourite-btn';
import type { GalleryImage } from '#/lib/api/validators';

const GalleryItem = ({ image }: { image: GalleryImage }) => {
  return (
    <div className="relative w-full aspect-square border rounded-lg overflow-hidden">
      <img className="w-full h-full object-cover" src={image.url} />
      <FavouriteBtn imageId={image.id} favouriteId={image.favourite?.id} />
    </div>
  );
};

export default GalleryItem;
