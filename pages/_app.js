import { SnackbarProvider } from 'notistack';
import '../styles/globals.css';
import { StoreProvider } from '../utiles/Store';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const clientSideEmotionCache = createCache({ key: 'css' });
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>

    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SnackbarProvider>
    </CacheProvider>
  );
}

export default MyApp;
