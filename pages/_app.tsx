import logger from '@/lib/logger';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

const LOGGER = logger(import.meta.url);

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light'
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: 'sans-serif',
          colorScheme
        }}
      >
        <ModalsProvider>
          <SWRConfig
            value={{
              fetcher: (url: string) => axios(url).then((res) => res.data),
              onError: (err) => {
                LOGGER.error(err);
                console.error(err);
              }
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
