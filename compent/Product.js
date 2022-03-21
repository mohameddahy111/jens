import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Link,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import NextLink from 'next/link';
import { urlForThumbnail } from '../utiles/images';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Store } from '../utiles/Store';

export default function Product({ item }) {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handlerAddToCard = async () => {
    closeSnackbar();
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
    <div>
      <Card>
        <CardActions>
          <CardActionArea>
            <NextLink href={`/product/${item.slug.current}`} passHref>
              <Link>
                <CardMedia
                  component={'img'}
                  src={urlForThumbnail(item.image)}
                />
                <Typography component={'h2'} variant='h2'>
                  {item.name}
                </Typography>
              </Link>
            </NextLink>
          </CardActionArea>
        </CardActions>

        <Typography marginLeft={'20px'}> {item.price} $ </Typography>
        <Stack marginLeft={'20px'}>
          <Rating precision={0.5} readOnly value={item.rating}>
            {' '}
          </Rating>
        </Stack>
        <Button
          fullWidth
          variant='contained'
          disabled={item.countInStock > 0 ? false : true}
          onClick={handlerAddToCard}
        >
          add to cart
        </Button>
      </Card>
    </div>
  );
}
