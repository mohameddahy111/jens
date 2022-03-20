import { Alert, CircularProgress, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../compent/Layout';
import Product from '../compent/Product';
import styles from '../styles/Home.module.css';
import client from '../utiles/client';

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });
  const { products, error, loading } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <Layout title={'Home'}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert color='error'>{error} </Alert>
      ) : (
        <Grid container spacing={2} m={1} p={1}>
          {products.map(item => (
            <Grid item key={item._id} md={4} xs={12}>
              <Product item={item}></Product>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
