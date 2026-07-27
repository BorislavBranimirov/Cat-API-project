import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderTestApp } from '#/test/router-utils';

describe('Vote controls', () => {
  it('changes image score repeatedly', async () => {
    const user = userEvent.setup();

    renderTestApp();

    const upvoteButton = await screen.findByRole('button', {
      name: 'Vote up',
    });
    const downvoteButton = await screen.findByRole('button', {
      name: 'Vote down',
    });
    const scoreLine = await screen.findByRole('paragraph', {
      name: 'voting score',
    });

    await user.click(upvoteButton);

    await waitFor(() => {
      expect(scoreLine).toHaveTextContent('+1');
    });

    await user.click(downvoteButton);

    await waitFor(() => {
      expect(scoreLine).toHaveTextContent('0');
    });

    await user.click(downvoteButton);

    await waitFor(() => {
      expect(scoreLine).toHaveTextContent('-1');
    });
  });
});
