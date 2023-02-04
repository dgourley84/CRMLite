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
            New Transaction
        </Typography>
        <Box component="form" noValidate sx={{mt:3}} gap="10">
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Client Name</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('name')} />
            <FormHelperText id="my-helper-text">Client Name</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
      </Box>
    </Container>
  )
}