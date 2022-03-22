import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import Layout from '../compent/Layout';
import { Store } from '../utiles/Store';

const cartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const updateHandelCart = async (item, quantity) => {
    closeSnackbar();
    const { data } = await axios.get(`api/product/${item._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar(`${item.name} out of stock `, { variant: 'error' });
    }
    dispatch({
      type: 'ADD_ITEM_CART',
      payload: {
        _key: item._key,
        name: item.name,
        price: item.price,
        slug: item.slug,
        countInStock: item.countInStock,
        image: item.image,
        quantity,
      },
    });
    enqueueSnackbar(`${item.name} is updated`, { variant: 'success' });
  };

  const removeHandler = item => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
    closeSnackbar();
    enqueueSnackbar(`${item.name} is removed`, { variant: 'error' });
  };
  const total = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const countItem = cartItems.reduce((a, c) => a + c.quantity, 0);
  return (
    <div>
      <Layout title={'cart'}>
        <Typography component={'h1'} variant={'h1'} align='center' m={4}>
          cart Items
        </Typography>
        {cartItems.length === 0 ? (
          <Box>
            <Typography component={'h1'} variant='h1' align='center' m={6}>
              your cart is emty ..
              <NextLink href={'/'} passHref>
                <Link>back to store</Link>
              </NextLink>
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
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
                      <TableCell>
                        <Typography component={'h6'} variant={'h6'}>
                          action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map(item => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <NextLink
                            href={`/product/${item.slug.current}`}
                            passHref
                          >
                            <Link>
                              <Image src={item.image} width={50} height={50} />
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell>
                          <NextLink
                            href={`/product/${item.slug.current}`}
                            passHref
                          >
                            <Link>
                              <Typography component={'h6'} variant='h6'>
                                {item.name}{' '}
                              </Typography>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell>
                          <Select
                            onChange={e =>
                              updateHandelCart(item, e.target.value)
                            }
                            defaultValue={item.quantity}
                          >
                            {[...Array(item.countInStock).keys()].map(x => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}{' '}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>{item.price * item.quantity} $</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              removeHandler(item);
                            }}
                          >
                            <Delete color='error' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={3} xs={12}>
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
                        <Button
                          fullWidth
                          variant='contained'
                          onClick={() => router.push('/login')}
                        >
                          <Typography component={'h6'} variant='h6'>
                            check out
                          </Typography>
                        </Button>
                      </ListItem>
                    </List>
                  </CardActionArea>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        )}
      </Layout>
    </div>
  );
};
export default dynamic(() => Promise.resolve(cartScreen), { ssr: false });
