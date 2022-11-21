import React from 'react';
import { QueryClientProvider, QueryClient, QueryKey } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // TODO this is for debug purposes only
      cacheTime: Infinity, // TODO this is for debug purposes only
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      onError: (err) => console.error(err), // TODO common errors handler usage
    },
  },
});

type Props = {
  children?: React.ReactNode;
};

export const DataAccessProvider: React.FC<Props> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export const invalidate = async (queryKey: string) => {
  return queryClient.invalidateQueries([queryKey]);
};
