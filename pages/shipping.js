import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CheckRethult from '../compent/CheckRethult';
import Layout from '../compent/Layout';
import { Store } from '../utiles/Store';
import { useRouter } from 'next/router';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { useSnackbar } from 'notistack';

export default function shipping() {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { userInfo , shipping } = state;
  useEffect(()=>{
    if (!userInfo) {
      router.push('/')
      
    }
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({
    name,
    email,
    mobile,
    address,
    building,
    floor,
  }) => {
    try {
      const { data } = await axios.post('/api/user/shipping', {
        name,
        email,
        mobile,
        address,
        building,
        floor,
      });
      dispatch({ type: 'SHIPPING_USER', payload: data });
      jsCookie.set('shipping', JSON.stringify(data));
      router.push('/pay');
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <Layout>
        <CheckRethult activeStep={1} />
        <form
          onSubmit={handleSubmit(submitHandler)}
          style={{ width: '80%', margin: 'auto' }}
        >
          <Typography component={'h1'} variant='h1' align='center' m={6}>
            shipping address
          </Typography>
          <List>
            <ListItem>
              <Controller
                name='name'
                control={control}
                defaultValue={userInfo ? userInfo.name : ''}
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    inputProps={{ type: 'text' }}
                    id='name'
                    label={userInfo ? '' : 'name'}
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name
                        ? errors.name.type === 'minLength'
                          ? 'name is vaild'
                          : 'name isrequired '
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
                control={control}
                defaultValue={userInfo ? userInfo.email : ''}
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    id='email'
                    inputProps={{ type: 'email' }}
                    label={userInfo ? '' : 'Email'}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === 'pattern'
                          ? 'email is vaild'
                          : 'email isrequired '
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
                control={control}
                defaultValue={userInfo ? userInfo.mobile : ''}
                rules={{
                  required: true,
                  pattern: /^[+0-9]/,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    id='mobile'
                    inputProps={{ type: 'text' }}
                    label={userInfo ? '' : 'mobile'}
                    error={Boolean(errors.mobile)}
                    helperText={
                      errors.mobile
                        ? errors.mobile.type === 'pattern'
                          ? 'mobile is vaild'
                          : 'mobile isrequired '
                        : null
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name='address'
                control={control}
                defaultValue={shipping ? shipping.address : ''}
                rules={{
                  required: true,
                  minLength: 4,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    id='address'
                    inputProps={{ type: 'text' }}
                    label={userInfo ? '' : 'Address'}
                    placeholder='Address'
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === 'minlength'
                          ? 'Address is vaild'
                          : 'Address isrequired '
                        : null
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name='building'
                control={control}
                defaultValue={shipping ? shipping.building : ''}
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    style={{ padding: '0px 10px 0px 0px' }}
                    fullWidth
                    inputProps={{ type: 'text' }}
                    id='building'
                    label={userInfo ? '' : 'Building'}
                    placeholder='Building'
                    error={Boolean(errors.building)}
                    helperText={
                      errors.building
                        ? errors.building.type === 'minlength'
                          ? 'Building is vaild'
                          : 'Building isrequired '
                        : null
                    }
                    {...field}
                  />
                )}
              />
              <Controller
                name='floor'
                control={control}
                defaultValue={shipping ? shipping.floor : ''}
                rules={{
                  required: true,
                  pattern: /^[0-9]/,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    id='floor'
                    inputProps={{ type: 'text' }}
                    label={userInfo ? '' : 'Floor'}
                    placeholder='Floor'
                    error={Boolean(errors.floor)}
                    helperText={
                      errors.floor
                        ? errors.floor.type === 'pattern'
                          ? 'Floor is vaild'
                          : 'Floor isrequired '
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
                  shipping
                </Typography>
              </Button>
            </ListItem>
          </List>
        </form>
      </Layout>
    </div>
  );
}
