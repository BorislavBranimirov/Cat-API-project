import { createFileRoute } from '@tanstack/react-router';
import GalleryView from '#/features/gallery/gallery-view';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div>
        <h1 className="text-2xl font-bold">Gallery</h1>
        <p className="text-sm text-muted-foreground">
          All of your uploaded cat images are displayed below
        </p>
      </div>

      <GalleryView />
    </div>
  );
}
