import React, { useState } from 'react'
import {
  Box,
  Container,
  Button,
  Typography,
  Rating,
  useTheme,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";
import { useFormik } from 'formik';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function ProductForm() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const theme = useTheme();

  return (
    <Container component="main" maxWidth="md">   
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.alt, //setting background to be flipped based on dark mode
            borderRadius: "0.55rem",
            p:3, //adds padding around the enitre form
          }}
        >
        <Typography variant="h2" component="div" color="secondary" sx={{mb: 3}}>
          New Transaction
        </Typography>
        <Typography variant="h6" gutterBottom>
        Product
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Select
            required
            id="product-select"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            fullWidth
            variant="standard"
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.name}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="product-quantity"
            label="Product Quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            fullWidth
            autoComplete="off"
            variant="standard"
          />
        </Grid>
      </Grid>
      </Box>
    </Container>
  )
  }
