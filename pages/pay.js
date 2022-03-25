import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import Layout from '../compent/Layout';
import CheckRethult from '../compent/CheckRethult';

import { Store } from '../utiles/Store';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

export default function pay() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    userInfo,
    shipping,
    cart: { cartItems },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
  });
  const total = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const countItem = cartItems.reduce((a, c) => a + c.quantity, 0);

  return (
    <div>
      <Layout>
        <CheckRethult activeStep={2} />
        <Grid container spacing={1} style={{ margin: '10px' }}>
          <Grid item md={8} xs={12}>
            {shipping ? (
              <Box style={{ margin: '10px' }}>
                <Divider fullWidth textAlign='center'>
                  <Chip label={'Address'} />
                </Divider>
                <Card>
                  <TableContainer>
                    <Table>
                      <TableRow>
                        <TableCell
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Typography
                            marginRight={3}
                            component={'h6'}
                            variant='h6'
                          >
                            full name&nbsp; :
                          </Typography>
                          <Typography> {shipping.name} </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Typography
                            marginRight={3}
                            component={'h6'}
                            variant='h6'
                          >
                            address &nbsp;:{' '}
                          </Typography>
                          <Typography>{shipping.address} </Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}
                      >
                        <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            marginRight={3}
                            component={'h6'}
                            variant='h6'
                          >
                            {' '}
                            mobile &nbsp;:{' '}
                          </Typography>
                          <Typography> {shipping.mobile}</Typography>
                        </TableCell>

                        <TableCell
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Typography
                            marginRight={3}
                            component={'h6'}
                            variant='h6'
                          >
                            buliding &nbsp; :{' '}
                          </Typography>
                          <Typography>{shipping.building} </Typography>
                        </TableCell>
                        <TableCell
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Typography
                            marginRight={3}
                            component={'h6'}
                            variant='h6'
                          >
                            {' '}
                            floor &nbsp; :{' '}
                          </Typography>
                          <Typography> {shipping.floor} </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Typography
                            marginRight={3}
                            component={'h6'}
                            variant='h6'
                          >
                             Delivery notes&nbsp; :
                          </Typography>
                          <Typography> {shipping.nots} </Typography>
                        </TableCell>
                      </TableRow>
                    </Table>
                  </TableContainer>
                </Card>
              </Box>
            ) : (
              <Card>
                <Typography>please enter your address shipping</Typography>
              </Card>
            )}
            <Divider fullWidth textAlign='center' style={{ margin: '10px' }}>
              <Chip label={'items'} />
            </Divider>
            {cartItems ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography component={'h6'} variant={'h6'}>
                          image
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography component={'h6'} variant={'h6'}>
                          name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography component={'h6'} variant={'h6'}>
                          quantity
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography component={'h6'} variant={'h6'}>
                          price
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map(item => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Image src={item.image} width={50} height={50} />
                        </TableCell>
                        <TableCell>
                          <Typography component={'h6'} variant='h6'>
                            {item.name}{' '}
                          </Typography>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price * item.quantity} $</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box>
                <Typography>
                  your cart is emyt.. please back to store
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item md={4} xs={12}>
            <Card>
              <Divider fullWidth textAlign='center'>
                <Chip label={'Bill'} />
              </Divider>
              <List>
                <ListItem>
                  <Grid item xs={12}>
                    <Typography component={'h5'} variant='h5'>
                      Items :{' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>({countItem}) items </Typography>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid item xs={12}>
                    <Typography component={'h5'} variant='h5'>
                      price :{' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography> {total} </Typography>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid item xs={12}>
                    <Typography component={'h5'} variant='h5'>
                      Shipping :{' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography> {parseInt(total * 0.05)} </Typography>
                  </Grid>
                </ListItem>

                <ListItem>
                  <Grid item xs={12}>
                    <Typography component={'h5'} variant='h5'>
                      Taxes 14% :{' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{parseInt(total * 0.14)} </Typography>
                  </Grid>
                </ListItem>
                <Divider variant='fullWidth' textAlign='center'>
                  <Chip label={'Total'} />
                </Divider>
                <ListItem>
                  <Grid item xs={12}>
                    <Typography component={'h5'} variant='h5'>
                      Total :{' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      {' '}
                      {parseInt(total + total * 0.14 + total * 0.05)} $
                    </Typography>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button fullWidth variant='contained'>
                    <Typography component={'h6'} variant='h6'>
                      pay
                    </Typography>
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
}
