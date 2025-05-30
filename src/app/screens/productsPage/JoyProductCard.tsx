import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CssVarsProvider } from '@mui/joy';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Props {
  product: Product;
}

export default function JoyProductCard({ product }: Props) {
  return (
    <CssVarsProvider>
      <Card>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <CardContent>
          <Typography level="title-md">{product.name}</Typography>
          <Typography level="body-sm">{product.description}</Typography>
          <Typography level="body-lg" sx={{ mt: 1, fontWeight: 'bold' }}>
            ${product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button fullWidth>Buy Now</Button>
        </CardActions>
      </Card>
    </CssVarsProvider>
  );
}
