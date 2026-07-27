import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { mockServer } from './mock-server';

// @ts-expect-error
global.IS_REACT_ACT_ENVIRONMENT = true;

beforeAll(() => mockServer.listen());

afterEach(() => {
  mockServer.resetHandlers();
});

afterAll(() => mockServer.close());

vi.stubGlobal(
  'IntersectionObserver',
  class IntersectionObserverMock {
    observe() {}
    disconnect() {}
  },
);
