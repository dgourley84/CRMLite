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

export default function  AddUser () {

  const formikUser = useFormik({
    initialValues : {
        name : '',
        email: '',
        city: '',
        state : '',
        country : '',
        occupation : '',
        phoneNumber : '',
      },
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
            Create new User
        </Typography>
        <Box component="form" noValidate sx={{mt:3}} gap="10">
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Full name</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikUser.getFieldProps('name')} />
            <FormHelperText id="my-helper-text">Update full name</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikUser.getFieldProps('email')} />
            <FormHelperText id="my-helper-text">We'll never share your email. Update your email.</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Phone Number</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikUser.getFieldProps('phoneNumber')} />
            <FormHelperText id="my-helper-text">Update phone number</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Country</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikUser.getFieldProps('country')} />
            <FormHelperText id="my-helper-text">Update country</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">City</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikUser.getFieldProps('city')} />
            <FormHelperText id="my-helper-text">Update city</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">State</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikUser.getFieldProps('state')} />
            <FormHelperText id="my-helper-text">Update state</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Occupation</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikUser.getFieldProps('occupation')} />
            <FormHelperText id="my-helper-text">Update occupation</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" color="primary" type="submit" disabled={!formikUser.isValid || formikUser.isSubmitting} sx={{mb: 2}}>
          Create User
        </Button>
        <Button variant="contained" color="secondary" onClick={formikUser.handleReset} sx={{mb: 2,ml:2}}>
          Clear Form
        </Button>
      </Box>
    </Container>
  )
}