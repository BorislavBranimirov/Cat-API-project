import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderTestApp } from '#/test/router-utils';

describe('Home page gallery', () => {
  it('loads images', async () => {
    renderTestApp();

    const images = await screen.findAllByRole('img');

    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('src', 'test-image-url');
  });
});
