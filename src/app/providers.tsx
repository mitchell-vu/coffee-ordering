'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: Omit<ThemeProviderProps, 'children'>;
}

const Providers: React.FC<ProvidersProps> = ({ children, themeProps }) => {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Providers;
