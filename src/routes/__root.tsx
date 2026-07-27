import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import Header from '#/features/components/header';
import '../styles.css';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  userId: string;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="min-h-svh flex flex-col gap-2">
        <Header />
        <main className="w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: 'Tanstack Query',
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
