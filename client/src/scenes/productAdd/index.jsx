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
//import { useFormik } from 'formik';
import { gql, useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';


export default function AddProduct () {

  const navigate = useNavigate();
  function navToProd() {
    navigate('/products')
  }
  const [createMutation] = useMutation(ADD_PRODUCT_MUTATION);
  const [ name, setName ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ rating, setRating ] = useState('');
  const [ supply, setSupply ] = useState('');
  const handleSubmit = evt => {
      evt.preventDefault();
      createMutation({
          variables: {
              name,
              price: +price,
              description,
              category,
              rating: +rating,
              supply: +supply
          }
      }).then(() => {
          navToProd()
      });
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setRating('');
      setSupply('');
  }

  

  const theme = useTheme();

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
            Create new Product
        </Typography>
        <Box component="form" noValidate sx={{mt:3}} gap="10">
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Product name</InputLabel>
            <Input id="my-input" type='text' value={name} onChange={evt => setName(evt.target.value)} aria-describedby="my-helper-text"  />
            <FormHelperText id="my-helper-text">Product name</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Price</InputLabel>
            <Input id="my-input" type="number" value={price} onChange={evt => setPrice(evt.target.value)} aria-describedby="my-helper-text"  />
            <FormHelperText id="my-helper-text">Product price</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Description</InputLabel>
            <Input id="my-input" type="text" value={description} onChange={evt => setDescription(evt.target.value)} aria-describedby="my-helper-text"  />
            <FormHelperText id="my-helper-text">Product description</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Category</InputLabel>
            <Input id="my-input" type="text" value={category} onChange={evt => setCategory(evt.target.value)} aria-describedby="my-helper-text"  />
            <FormHelperText id="my-helper-text">Product category</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Rating</InputLabel>
            <Input id="my-input" type="number" value={rating} onChange={evt => setRating(evt.target.value)} aria-describedby="my-helper-text"  />
            <FormHelperText id="my-helper-text">Product rating</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Supply</InputLabel>
            <Input id="my-input" type="number" value={supply} onChange={evt => setSupply(evt.target.value)} aria-describedby="my-helper-text"  />
            <FormHelperText id="my-helper-text">Product supply</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" color="primary" type="submit" sx={{mb: 2}}>
          Create Product
        </Button>
        <Button variant="contained" color="secondary" sx={{mb: 2,ml:2}}>
          Clear Form
        </Button>
      </Box>
    </Container>
        </form>
  )
}

const ADD_PRODUCT_MUTATION = gql`
  mutation Mutation($name: String, $price: Int, $description: String, $category: String, $rating: Int, $supply: Int) {
    createProduct(name: $name, price: $price, description: $description, category: $category, rating: $rating, supply: $supply) {
      name
      id
      price
      description
      category
      rating
      supply
    }
  }
`