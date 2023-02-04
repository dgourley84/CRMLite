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
  const [products, setProducts] = useState([    { id: 1, name: 'Product 1' },    { id: 2, name: 'Product 2' },    { id: 3, name: 'Product 3' },  ]);
  const [selectedProducts, setSelectedProducts] = useState(['']);
  const [productQuantities, setProductQuantities] = useState(['']);
  const [numOfProducts, setNumOfProducts] = useState(1);
  const theme = useTheme();

  const addProduct = () => {
    setSelectedProducts([...selectedProducts, '']);
    setProductQuantities([...productQuantities, '']);
    setNumOfProducts(numOfProducts + 1);
  };

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
        {[...Array(numOfProducts)].map((_, i) => (
          <>
            <Typography variant="h6" gutterBottom>
              Product {i + 1}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Select
                  required
                  id={`product-select-${i}`}
                  value={selectedProducts[i]}
                  onChange={(e) => setSelectedProducts(selectedProducts.map((selected, j) => j === i ? e.target.value : selected))}
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
                  id={`product-quantity-${i}`}
                  label="Product Quantity"value={productQuantities[i]}
                  onChange={(e) => setProductQuantities(productQuantities.map((quantity, j) => j === i ? e.target.value : quantity))}
                  fullWidth
                  variant="standard"
                  type="number"
                  inputProps={{min: 0}}
                  />
                  </Grid>
                  </Grid>
                  </>
                  ))}
                  <Box sx={{mt: 3}}>
                  <Button variant="contained" color="primary" onClick={addProduct}>
                  Add another product
                  </Button>
                  </Box>
                  </Box>
                  </Container>
                  );
                  }