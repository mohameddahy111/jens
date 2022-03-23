import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import Layout from '../compent/Layout';
import NextLink from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Store } from '../utiles/Store';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';

export default function register() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [router , userInfo]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const submitHandler = async ({
    email,
    password,
    name,
    confirmPassword,
    mobile,
  }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      return enqueueSnackbar('password not match', { variant: 'error' });
    }
    try {
      const { data } = await axios.post('/api/user/register', {
        email,
        name,
        password,
        mobile,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      jsCookie.set('userInfo', JSON.stringify(data));
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <Layout title={'register'}>
        <Typography component={'h1'} variant='h1' align='center' m={6}>
          register
        </Typography>
        <form
          style={{ width: '80%', margin: 'auto' }}
          onSubmit={handleSubmit(submitHandler)}
        >
          <List>
            <ListItem>
              <Controller
                name='name'
                defaultValue=''
                control={control}
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label='Name'
                    id='name'
                    error={Boolean(errors.name)}
                    inputProps={{ type: 'text' }}
                    helperText={
                      errors.name
                        ? errors.name.type === 'minLength'
                          ? 'name not avild'
                          : 'name is required'
                        : null
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name='email'
                defaultValue=''
                control={control}
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label='Email'
                    id='email'
                    error={Boolean(errors.email)}
                    inputProps={{ type: 'email' }}
                    helperText={
                      errors.email
                        ? errors.email.type === 'pattern'
                          ? 'Email not avild'
                          : 'Email is required'
                        : null
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name='mobile'
                defaultValue={'+02'}
                control={control}
                rules={{
                  required: true,
                  minLength: 11,
                  maxLength: 14,
                  pattern: /^[0-9]/,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    id='mobile'
                    label='Mobile'
                    error={Boolean(errors.mobile)}
                    inputProps={{ type: 'tel' }}
                    helperText={
                      errors.mobile
                        ? errors.mobile.type === 'pattern'
                          ? 'mobile not vaild'
                          : 'mobile is required'
                        : null
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>

            <ListItem>
              <Controller
                name='password'
                defaultValue=''
                control={control}
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label='password'
                    id='password'
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password
                        ? errors.password.type === 'minLength'
                          ? 'password is vild'
                          : 'password is required'
                        : null
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name='confirmPassword'
                defaultValue=''
                control={control}
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label='Confirm Password'
                    id='confirmPassword'
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.confirmPassword)}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.type === 'minLength'
                          ? 'confirm Password is vild'
                          : 'confirm Password is required'
                        : null
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>

            <ListItem>
              <Button fullWidth variant='contained' type='submit'>
                <Typography component={'h2'} variant='h2'>
                  register
                </Typography>
              </Button>
            </ListItem>
            <ListItem>
              <Typography component={'h6'} variant='h6'>
                i have account ?{' '}
                <NextLink href={'/login'} passHref>
                  <Link>login</Link>
                </NextLink>
              </Typography>
            </ListItem>
          </List>
        </form>
      </Layout>
    </div>
  );
}
