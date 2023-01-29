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

export default function UpdateProfile() {

  const [file, setFile] = useState();
  const navigate = useNavigate()
  const {email} =useAuthStore(state=> state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch();
 
  const formikProfile = useFormik({
    initialValues : {
      name : apiData?.name || '',
      email: apiData?.email || '',
      city: apiData?.city || '',
      state : apiData?.state || '',
      country : apiData?.country || '',
      occupation : apiData?.occupation || '',
      phoneNumber : apiData?.phoneNumber || '',
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

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  const theme = useTheme();

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

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
            Profile information
        </Typography>
        <Box component="form" noValidate sx={{mt:3}} gap="10">
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Full name</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('name')} />
            <FormHelperText id="my-helper-text">Update full name</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('email')} />
            <FormHelperText id="my-helper-text">We'll never share your email. Update your email.</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Phone Number</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('phoneNumber')} />
            <FormHelperText id="my-helper-text">Update phone number</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Country</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('country')} />
            <FormHelperText id="my-helper-text">Update country</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">City</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('city')} />
            <FormHelperText id="my-helper-text">Update city</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">State</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('state')} />
            <FormHelperText id="my-helper-text">Update state</FormHelperText>
          </FormControl>
          <FormControl sx={{mb: 2, mr:1}}>
            <InputLabel htmlFor="my-input">Occupation</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" {...formikProfile.getFieldProps('occupation')} />
            <FormHelperText id="my-helper-text">Update occupation</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" color="primary" type="submit" disabled={!formikProfile.isValid || formikProfile.isSubmitting} sx={{mb: 2}}>
          Update Profile
        </Button>
        <Button variant="contained" color="secondary" onClick={formikProfile.handleReset} sx={{mb: 2,ml:2}}>
          Clear Form
        </Button>
      </Box>
    </Container>
  )
}