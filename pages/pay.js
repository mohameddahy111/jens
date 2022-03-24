import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import Layout from '../compent/Layout';
import { Store } from '../utiles/Store';
import { useRouter } from 'next/router';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
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
        {/* <Grid container spacing={1}>
          <Grid item md={8} xs={12}> */}
        {/* </Grid>
        </Grid> */}
        <Grid container spacing={1}>
          <Grid item md={8} xs={12}>
            <Card>
              <Typography component={'h5'} variant='h5'>
                Name : {shipping.name}
              </Typography>
              <Typography component={'h5'} variant='h5'>
                Address : {shipping.address}
              </Typography>
              <Typography component={'h5'} variant='h5'>
                Mobile : {shipping.mobile}
              </Typography>
              <Typography component={'h5'} variant='h5'>
                building : {shipping.building}
              </Typography>
              <Typography component={'h5'} variant='h5'>
                floor : {shipping.floor}
              </Typography>
            </Card>
            <Divider fullWidth textAlign='center'>
              <Chip label={'items'} />
            </Divider>

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
          </Grid>
          <Grid item md={4} xs={12}>
            <Card>
              <CardActions>
                <CardActionArea>
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
                          Total :{' '}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography> {total} $</Typography>
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
                </CardActionArea>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
}
