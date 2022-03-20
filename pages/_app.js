import '../styles/globals.css';
import  {StoreProvider}  from '../utiles/Store';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>

      <Component {...pageProps} />
    </StoreProvider>

  );
}

export default MyApp;
