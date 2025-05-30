import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { Box, Grid } from '@mui/joy';
import JoyProductCard from './JoyProductCard';

const products = [
  {
    id: '1',
    name: 'Sun Care Lotion',
    description: 'Protects your skin from UV rays and keeps it hydrated all day.',
    price: 19.99,
    image: 'https://islom.uz/img/section/2025/05/1748607077.jpg',
  },
  {
    id: '1',
    name: 'Sun Care Lotion',
    description: 'Protects your skin from UV rays and keeps it hydrated all day.',
    price: 19.99,
    image: 'https://islom.uz/img/section/2025/05/1748607077.jpg',
  },
  {
    id: '1',
    name: 'Sun Care Lotion',
    description: 'Protects your skin from UV rays and keeps it hydrated all day.',
    price: 19.99,
    image: 'https://islom.uz/img/section/2025/05/1748607077.jpg',
  },
  {
    id: '1',
    name: 'Sun Care Lotion',
    description: 'Protects your skin from UV rays and keeps it hydrated all day.',
    price: 19.99,
    image: 'https://islom.uz/img/section/2025/05/1748607077.jpg',
  },
];

export default function ProductList() {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={product.id}>
          <JoyProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
