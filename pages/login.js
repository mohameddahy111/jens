import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import Layout from '../compent/Layout';
import NextLink from 'next/link';
import { Controller, useForm } from 'react-hook-form';

export default function login() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const submitHandler = () => {};
  return (
    <div>
      <Layout>
        <Typography component={'h1'} variant='h1' align='center' m={6}>
          login
        </Typography>
        <form
          style={{ width: '60%', margin: 'auto' }}
          onSubmit={handleSubmit(submitHandler)}
        >
          <List>
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
              <Button fullWidth variant='contained' type='submit'>
                <Typography component={'h2'} variant='h2'>
                  login
                </Typography>
              </Button>
            </ListItem>
            <ListItem>
              <Typography component={'h6'} variant='h6'>
                 don't have account ?{' '}
                <NextLink href={'/register'} passHref>
                  <Link>register</Link>
                </NextLink>
              </Typography>
            </ListItem>
          </List>
        </form>
      </Layout>
    </div>
  );
}
