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

export default function AddProduct () {

  const formikProduct = useFormik({
    initialValues : {
      name : '',
      price: '',
      description: '',
      category : '',
      rating :'',
      supply : '',
    }
  })

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
            Create new Product
        </Typography>
        <Box component="form" noValidate sx={{mt:3}} gap="10">
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Product name</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('name')} />
            <FormHelperText id="my-helper-text">Product name</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Price</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('email')} />
            <FormHelperText id="my-helper-text">Product price</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Description</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('phoneNumber')} />
            <FormHelperText id="my-helper-text">Product description</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Category</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('country')} />
            <FormHelperText id="my-helper-text">Product category</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2}}>
            <InputLabel htmlFor="my-input">Rating</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('city')} />
            <FormHelperText id="my-helper-text">Product rating</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" color="primary" type="submit" disabled={!formikProduct.isValid || formikProduct.isSubmitting} sx={{mb: 2}}>
          Create Product
        </Button>
        <Button variant="contained" color="secondary" onClick={formikProduct.handleReset} sx={{mb: 2,ml:2}}>
          Clear Form
        </Button>
      </Box>
    </Container>
  )
}