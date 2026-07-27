import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { getSavedUserId } from './lib/user/utils';
import { routeTree } from './routeTree.gen';
import ErrorScreen from './features/status-screens/error-screen';
import PendingScreen from './features/status-screens/pending-screen';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Consider data stale after 10 minutes
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
});

export const getRouter = () => {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    context: {
      queryClient,
      // Generate a persistent user id on initialisation
      userId: getSavedUserId(),
    },
    defaultErrorComponent: ErrorScreen,
    defaultPendingMs: 0,
    defaultPendingComponent: PendingScreen,
  });

  return router;
};

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
