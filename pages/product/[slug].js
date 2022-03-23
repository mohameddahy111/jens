import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../compent/Layout';
import client from '../../utiles/client';
import NextLink from 'next/link';
import Image from 'next/image';
import { urlFor, urlForThumbnail } from '../../utiles/images';
import styles from '../../styles/Home.module.css';
import { Store } from '../../utiles/Store';
import { useSnackbar } from 'notistack';
import axios from 'axios';

export default function ProductScreen(props) {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const { slug } = props;
  const [state, setState] = useState({
    item: null,
    loading: true,
    error: '',
  });
  const { item, loading, error } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );
        setState({ ...state, item, loading: false });
      } catch (error) {
        setState({ ...state, error: error.message, loading: false });
      }
    };
    fetchData();
  }, []);
  const handlerAddToCard = async () => {
    closeSnackbar()
    const exisetItem = cart.cartItems.find(x => x._id === item._id);
    const quantity = exisetItem ? exisetItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/product/${item._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('this product out off stork', { variant: 'error' });
      return;
    }
    dispatch({
      type: 'ADD_ITEM_CART',
      payload: {
        _key: item._id,
        name: item.name,
        brand: item.brand,
        description: item.description,
        price: item.price,
        rating: item.rating,
        numReviews: item.numReviews,
        category: item.category,
        slug: item.slug,
        countInStock: item.countInStock,
        image: urlForThumbnail(item.image),
        quantity,
      },
    });
    enqueueSnackbar(`${item.name} add to cart`, { variant: 'success' });
  };
  return (
    <Layout title={item?.name}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert color='error'>{error} </Alert>
      ) : (
        <Box className={styles.box}>
          <Box m={2}>
            <NextLink href={'/'} passHref>
              <Link>
                <Typography component={'h2'} variant='h2'>
                  back to store{' '}
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box>
            <Grid container spacing={1}>
              <Grid md={6} xs={12} item>
                <Image
                  src={urlFor(item.image)}
                  width={640}
                  height={640}
                  alt={item.name}
                  layout='responsive'
                  priority
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <List className={styles.list}>
                  <ListItem>
                    <Typography component={'h6'} variant='h6'>
                      <span>Name</span> : {item.name}{' '}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography component={'h6'} variant='h6'>
                      <span>brand</span> : {item.brand}{' '}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography component={'h6'} variant='h6'>
                      <span>category</span> : {item.category}{' '}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography component={'h6'} variant='h6'>
                      <span>rating</span> :
                      <Stack>
                        <Rating value={item.rating} readOnly precision={0.5}>
                          {item.rating}{' '}
                        </Rating>
                      </Stack>
                      ({item.numReviews}) <span>Review</span>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography component={'h6'} variant='h6'>
                      <span>description</span> : {item.description}{' '}
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card>
                  <List>
                    <ListItem>
                      <Grid item xs={12}>
                        <Typography component={'h6'} variant='h6'>
                          price
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component={'h6'} variant='h6'>
                          {item.price} $
                        </Typography>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid item xs={12}>
                        <Typography component={'h6'} variant='h6'>
                          status
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component={'h6'} variant='h6'>
                          {item.countInStock > 0
                            ? 'allow in stock'
                            : 'not allow now'}
                        </Typography>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Button
                        fullWidth
                        variant='contained'
                        disabled={item.countInStock < 1 ? true : false}
                        onClick={handlerAddToCard}
                      >
                        <Typography component={'h6'} variant='h6'>
                          add to cart{' '}
                        </Typography>
                      </Button>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Layout>
  );
}
export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
