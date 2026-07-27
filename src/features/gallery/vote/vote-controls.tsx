import { useMutation } from '@tanstack/react-query';
import { useRouteContext } from '@tanstack/react-router';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { updateImageVoteMutationOptions } from './query-options';
import type React from 'react';

const VoteBtn = ({
  children,
  handleClick,
  disabled,
}: {
  children: React.ReactNode;
  handleClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      className="flex-1 px-3 py-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground border-t first:border-r last:border-l rounde-bl-md text-sm transition-colors hover:bg-primary/90 active:bg-primary/70"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const VoteControls = ({
  imageId,
  value,
}: {
  imageId: string;
  value: number;
}) => {
  const { userId } = useRouteContext({ from: '__root__' });
  const { mutate: updateImageVote, isPending } = useMutation(
    updateImageVoteMutationOptions({ userId }),
  );

  return (
    <div className="flex items-stretch">
      <VoteBtn
        handleClick={() => {
          updateImageVote({ imageId, value: value + 1 });
        }}
        disabled={isPending}
      >
        <ThumbsUp className="size-4" />
        Vote up
      </VoteBtn>

      <VoteBtn
        handleClick={() => {
          updateImageVote({ imageId, value: value - 1 });
        }}
        disabled={isPending}
      >
        <ThumbsDown className="size-4" />
        Vote down
      </VoteBtn>
    </div>
  );
};

export default VoteControls;
