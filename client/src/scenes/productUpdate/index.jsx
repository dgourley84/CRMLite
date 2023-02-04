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
import { gql, useMutation } from '@apollo/client';
import { PRODUCT_QUERY } from 'scenes/products';
import { useNavigate } from 'react-router-dom';
import Header from "components/Header";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from 'helpers/validate';
import convertToBase64 from 'helpers/convert';
import useFetch from 'hooks/fetch.hook';
import { updateUser } from 'helpers/helper';
import profileImg from '../../assets/profile.jpg';
import styles from '../../assets/Profile.module.css';
import extend from '../../assets/Username.module.css'
import { useAuthStore } from 'store/store';
import Product from '../../components/Product.js';





export default function UpdateProduct({product}) {
//const productID = Product.product.id

  const navigate = useNavigate();
  function navigateBack() {
    navigate('/products')
  } 
  const theme = useTheme();
  const productID = localStorage.getItem('ID');
  let UP = localStorage.getItem('Items');
  UP = JSON.parse(UP);
  console.log(UP)
  // let updatedProducts = localStorage.getItem('Items')
  // updatedProducts = JSON.parse(updatedProducts);
  const [ updateMutation ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: [
      {query: PRODUCT_QUERY}
    ]
  });
  const [ name, setName ] = useState(UP[0]);
  const [ price, setPrice ] = useState(UP[1]);
  const [ description, setDescription ] = useState(UP[2]);
  const [ category, setCategory ] = useState(UP[3]);
  const [ rating, setRating ] = useState(UP[4]);
  const [ supply, setSupply ] = useState(UP[5]);
  const handleSubmit = evt => {
    evt.preventDefault();
    console.info('UPDATED PRODUCT', name)
    updateMutation({
      variables: {
        id: productID,
        name: name,
        price: +price,
        description: description,
        category: category,
        rating: +rating,
        supply: +supply
      }
    }).then(() => {
      navigateBack()
    })
    setName('');
    setPrice('');
    setDescription('');
    setCategory('');
    setRating('');
    setSupply('');
  
  }
  return (
    <form onSubmit={evt => handleSubmit(evt)}>
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
            Product information
        </Typography>
        <Box component="form" noValidate sx={{mt:3}} gap="10">
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Product Name</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" type="text" value={name} onChange={evt => setName(evt.target.value)} />
            <FormHelperText id="my-helper-text">Update product name</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Product Price</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" type="number" value={price} onChange={evt => setPrice(evt.target.value)} />
            <FormHelperText id="my-helper-text">Update product price</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Product Description</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" type="text" value={description} onChange={evt => setDescription(evt.target.value)} />
            <FormHelperText id="my-helper-text">Update product description</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Product Category</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" type="text" value={category} onChange={evt => setCategory(evt.target.value)} />
            <FormHelperText id="my-helper-text">Update product category</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Product Rating</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" type="number" value={rating} onChange={evt => setRating(evt.target.value)} />
            <FormHelperText id="my-helper-text">Update product rating</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Product Supply</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" type="number" value={supply} onChange={evt => setSupply(evt.target.value)} />
            <FormHelperText id="my-helper-text">Update product supply</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" color="primary" type="submit"   sx={{mb: 2}}>
          Update Product
        </Button>
        <Button variant="contained" color="secondary"  sx={{mb: 2,ml:2}}>
          Clear Form
        </Button>
       
      </Box>
    </Container>


    </form>

  )
};

const UPDATE_PRODUCT_MUTATION = gql`
mutation Mutation($id: ID!, $name: String, $price: Int, $description: String, $category: String, $rating: Int, $supply: Int) {
  updateProduct(id: $id, name: $name, price: $price, description: $description, category: $category, rating: $rating, supply: $supply) {
    id
    name
    price
    description
    category
    rating
    supply
  }
}
`