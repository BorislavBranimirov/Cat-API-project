import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderTestApp } from '#/test/router-utils';

describe('Favourite button', () => {
  it('toggles favourite status on an image', async () => {
    const user = userEvent.setup();

    renderTestApp();

    const button = await screen.findByRole('button', {
      name: 'favourite the image',
    });

    await user.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-label', 'unfavourite the image');
    });

    await user.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-label', 'favourite the image');
    });
  });
});
