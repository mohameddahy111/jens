import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
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


export default function Layout({children ,title ,  }) {
  const { state, dispatch } = useContext(Store);
  const {darkMode}=state
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
    dispatch({type : darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON'})
    const newDarkMode = !darkMode
    jsCookie.set('darkMode' , newDarkMode ? 'ON' :'OFF')
  };
  return (
    <div>
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
            <Switch
              checked={darkMode}
              onChange={darkModeHandler}
            ></Switch>
            <NextLink href={'/cart'} passHref>
              <Link>
                <Typography component={'h1'} variant='h1'>
                  cart
                </Typography>
              </Link>
            </NextLink>
            <NextLink href={'/login'} passHref>
              <Link>
                <Typography component={'h1'} variant='h1'>
                  login
                </Typography>
              </Link>
            </NextLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className={styles.main}>
        {children}
      </Box>
      <footer className={styles.footer}>
        create by next .. 
      </footer>
    </ThemeProvider>
    </div>
  );
}
