import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useAuthStore } from 'store/store';
import { emailValidate, passwordValidate } from 'helpers/validate';
import { verifyPassword } from 'helpers/helper';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        CRMLite
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate()
  //const setEmail = useAuthStore(state=> state.setEmail)
  //const email = useAuthStore(state=> state.auth.email) // this will enable the usage of the email login within all components
  
  const [email, setEmail] = useState('');

  const formikEmail = useFormik({
    initialValues: {
      email : ''
    },
    validate: emailValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setEmail(values.email)
      console.log(values)
      formikPassword.setFieldValue("email",values.email)
    }
  })

  const formikPassword = useFormik({
    initialValues: {
      email:'',
      password : ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      let loginPromise = verifyPassword({email:values.email , password:values.password})
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success: <b>Login successful</b>,
        error: <b>Password does not match</b>,
      });
      loginPromise.then(res => {
        let {token} = res.data;
        localStorage.setItem('token',token);
        navigate('/dashboard')
      })
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Toaster position='bottom-center' reverseOrder={false}></Toaster>
      <Container component="main" maxWidth="xs" sx={{display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.alt, //setting background to be flipped based on dark mode
            borderRadius: "0.55rem",
            p:3, //adds padding around the enitre form 
          }} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary[200] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formikPassword.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...formikEmail.getFieldProps('email')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...formikPassword.getFieldProps('password')}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
