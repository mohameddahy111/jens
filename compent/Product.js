import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import NextLink from 'next/link';
import { urlForThumbnail } from '../utiles/images';

export default function Product({ item }) {
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

        <Typography marginLeft={'20px'} > {item.price} $ </Typography>
        <Stack marginLeft={'20px'} >
          <Rating precision={0.5} readOnly  value={item.rating} >
            {' '}
          </Rating>
        </Stack>
        <Button fullWidth variant='contained'  disabled={item.countInStock >0 ? false : true} >
          add to cart
        </Button>
      </Card>
    </div>
  );
}
