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
import { Navigate, useNavigate } from 'react-router-dom';

export default function DeleteProduct(){

    const navigate = useNavigate();
    const [deleteMutation] = useMutation(DELETE_PRODUCT_MUTATION, {
      refetchQueries: [
        {query: PRODUCT_QUERY}
      ]
    });
    const productID = localStorage.getItem('deleteID');
    function noDelete() {
      localStorage.removeItem('deleteID');
      navigate('/products')
    }
    const handleSubmit = evt => {
        evt.preventDefault();
        deleteMutation({
            variables: {
                id: productID
            }
        }).then(() => {
          localStorage.removeItem('deleteID');
          navigate('/products')
        })
        console.info('deleted product: ', productID)
    }
    const theme = useTheme();
    return (
        <form>
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
        <Typography variant="h2" component="div" color="secondary" sx={{display: 'flex', justifyContent: 'center', mb: 3}}>
            ARE YOU SURE?
        </Typography>
        <Box component="form" noValidate sx={{mt:3}} gap="10">
      <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
        <Button variant="contained" color="primary" type="submit" onClick={evt => handleSubmit(evt)}  sx={{mb: 2}}>
          YES
        </Button>
        <Button variant="contained" color="secondary" onClick={() => noDelete()} sx={{mb: 2,ml:2}}>
          NO
        </Button>
      </Box>
         
        </Box>
      </Box>
    </Container>


        </form>
    )
}

const DELETE_PRODUCT_MUTATION = gql`
    mutation DeleteProduct($id: String) {
        deleteProduct(id: $id) {
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