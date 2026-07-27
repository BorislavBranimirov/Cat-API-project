import { Link, useRouteContext } from '@tanstack/react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { getUploadedImagesQueryOptions } from './query-options';

const EmptyGalleryState = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <div>
          <p className="text-lg text-bold">No images found</p>
          <p className="text-sm text-muted-foreground">
            Visit the upload page to start filling out your cat gallery
          </p>
        </div>
        <Link
          to="/upload"
          className="text-sm hover:underline hover:underline-offset-4"
        >
          Visit upload page
        </Link>
      </div>
    </div>
  );
};

const GalleryView = () => {
  const { userId } = useRouteContext({ from: '__root__' });
  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    getUploadedImagesQueryOptions({
      userId,
    }),
  );

  // Reference to the element used as a sentinel for the intersection observer
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  /**
   * Fetch the next page only if we are not currently loading data and there
   * is available content.
   */
  const fetchNextPageDeduped = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Fetch the next page of data whenever the user scrolls
        // near the sentinel element (bottom of the screen)
        if (entry?.isIntersecting) {
          fetchNextPageDeduped();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [status, fetchNextPageDeduped]);

  if (status === 'pending') {
    return (
      <div className="flex justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (status === 'error') {
    return <p className="text-sm text-destructive">{error.message}</p>;
  }

  if (data.pages[0]?.images.length === 0) {
    return <EmptyGalleryState />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.pages.map((page) => (
          <React.Fragment key={page.page}>
            {page.images.map((image) => (
              <div
                key={image.id}
                className="w-full aspect-square border rounded-lg overflow-hidden"
              >
                <img className="w-full h-full object-cover" src={image.url} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Element used to trigger loading a new page */}
      <div ref={sentinelRef}></div>
    </div>
  );
};

export default GalleryView;
