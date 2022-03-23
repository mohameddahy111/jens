import {
  AppBar,
  Badge,
  Box,
  createTheme,
  CssBaseline,
  IconButton,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import NextLink from 'next/link';
import styles from '../styles/layout.module.css';
import { Store } from '../utiles/Store';
import jsCookie from 'js-cookie';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Head from 'next/head';
import Profil from './Profil'

export default function Layout({ children, title }) {
  const { state, dispatch } = useContext(Store);
  const {
    darkMode,
    cart: { cartItems },
    userInfo,
  } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '2rem',
        textTransform: 'capitalize',
        fontStyle: 'italic',
        fontWeight: '700',
      },
      h2: {
        fontSize: '1.8rem',
        textTransform: 'capitalize',
        fontStyle: 'italic',
        fontWeight: '600',
      },
      h6: {
        textTransform: 'capitalize',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#203040',
      },
    },
  });
  const darkModeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  return (
    <div>
      <Head>
        <title> {title ? `${title}-jens ` : 'jens'}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static'>
          <Toolbar className={styles.Toolbar}>
            <Box className={styles.logo}>
              <NextLink href={'/'} passHref>
                <Link>
                  <Typography component={'h1'} variant='h1'>
                    jens
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Box className={styles.link}>
              <Switch checked={darkMode} onChange={darkModeHandler}></Switch>
              <NextLink href={'/cart'} passHref>
                <Link>
                  {cartItems.length > 0 ? (
                    <Badge
                      badgeContent={cartItems.length}
                      variant='standard'
                      color='secondary'
                      overlap='circular'
                    >
                      <IconButton>
                        <ShoppingCartOutlinedIcon
                          style={{ color: 'white', fontSize: '30px' }}
                        />
                      </IconButton>
                    </Badge>
                  ) : (
                    <Typography component={'h1'} variant='h1'>
                      cart
                    </Typography>
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <Profil text={userInfo.name} />
              ) : (
                <NextLink href={'/login'} passHref>
                  <Link>
                    <Typography component={'h1'} variant='h1'>
                      login
                    </Typography>
                  </Link>
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box className={styles.main}>{children}</Box>
        <footer className={styles.footer}>create by next ..</footer>
      </ThemeProvider>
    </div>
  );
}
