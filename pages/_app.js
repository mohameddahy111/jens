import { SnackbarProvider } from 'notistack';
import '../styles/globals.css';
import  {StoreProvider}  from '../utiles/Store';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider anchorOrigin={{vertical:'top' , horizontal:'center'}} >
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
    </SnackbarProvider>

  );
}

export default MyApp;
