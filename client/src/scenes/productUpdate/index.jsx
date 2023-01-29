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
import Header from "components/Header";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from 'helpers/validate';
import convertToBase64 from 'helpers/convert';
import useFetch from 'hooks/fetch.hook';
import { updateUser } from 'helpers/helper';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/profile.jpg';
import styles from '../../assets/Profile.module.css';
import extend from '../../assets/Username.module.css'
import { useAuthStore } from 'store/store';

export default function UpdateProduct() {

  const [file, setFile] = useState();
  const navigate = useNavigate()
  const [{ isLoading, apiData, serverError }] = useFetch();
 
  const formikProduct = useFormik({
    initialValues : {
      name : apiData?.name || '',
      price: apiData?.price || '',
      description: apiData?.description || '',
      category : apiData?.category || '',
      rating : apiData?.rating || '',
      supply : apiData?.supply || '',
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })

  const theme = useTheme();

  // logout handler function

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

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
            Product information
        </Typography>
        <Box component="form" noValidate sx={{mt:3}} gap="10">
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Product name</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('name')} />
            <FormHelperText id="my-helper-text">Update product name</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Price</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('email')} />
            <FormHelperText id="my-helper-text">Update product price</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Description</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('phoneNumber')} />
            <FormHelperText id="my-helper-text">Update product description</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Category</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('country')} />
            <FormHelperText id="my-helper-text">Update product category</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2}}>
            <InputLabel htmlFor="my-input">Rating</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProduct.getFieldProps('city')} />
            <FormHelperText id="my-helper-text">Update product rating</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" color="primary" type="submit" disabled={!formikProduct.isValid || formikProduct.isSubmitting} sx={{mb: 2}}>
          Update Product
        </Button>
        <Button variant="contained" color="secondary" onClick={formikProduct.handleReset} sx={{mb: 2,ml:2}}>
          Clear Form
        </Button>
      </Box>
    </Container>
  )
}