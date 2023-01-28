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
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from 'helpers/validate';
import convertToBase64 from 'helpers/convert';
import useFetch from 'hooks/fetch.hook';
import { updateUser } from 'helpers/helper';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store/store';


const updateProduct = () => {
  return (
    <Container component="main" maxWidth="md">   
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.alt, //setting background to be flipped based on dark mode
            borderRadius: "0.55rem",
          }}
        >
        <Typography variant="h2" component="div" color="secondary">
            Profile information
        </Typography>
        <Box component="form" noValidate sx={{mt:3}} gap="10">
        <FormControl>
          <InputLabel htmlFor="my-input">Full name</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('name')} />
          <FormHelperText id="my-helper-text">Update full name</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('email')} />
          <FormHelperText id="my-helper-text">We'll never share your email. Update your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Phone Number</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('phoneNumber')} />
          <FormHelperText id="my-helper-text">Update phone number</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Country</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('country')} />
          <FormHelperText id="my-helper-text">Update country</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">City</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('city')} />
          <FormHelperText id="my-helper-text">Update city</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">State</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('state')} />
          <FormHelperText id="my-helper-text">Update state</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Occupation</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('occupation')} />
          <FormHelperText id="my-helper-text">Update occupation</FormHelperText>
        </FormControl>
        </Box>

      </Box>
    </Container>
  )
}

export default updateProduct