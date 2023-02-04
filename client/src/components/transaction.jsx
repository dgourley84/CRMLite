import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import { useQuery, gql } from '@apollo/client';

  import React, { useState } from "react";
  import { useNavigate } from 'react-router-dom';
  import Name from './name.jsx'

  export default function Transaction({transaction}) {
     const {id, userId, cost, products} = transaction
    // const  [{data}, getNameQuery]  = useQuery(TRANSACTION_NAME_QUERY)
    // getNameQuery({
    //     variables: {
    //         id: userId
    //     }
    // })
    const [isExpanded, setIsExpanded] = useState(false);
    const theme = useTheme();
    return (
        <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt, //setting background to be flipped based on dark mode
          borderRadius: "0.55rem",
        }}
      >
          <CardContent>
              <Typography sx={{fontSize:14}} color = {theme.palette.secondary[700]} gutterBottom>
                  
              </Typography>
              <Typography variant="h5" component="div">
                 Customer: {/* {JSON.stringify(data?.getOneUser[1])} */}
              </Typography>
              <Typography sx={{mb:"1.5rem"}} color = {theme.palette.secondary[400]}>
              Cost: ${Number(cost).toFixed(2)}
              </Typography>

          </CardContent>
          <CardActions>
              <Button 
              variant="contained"
              color="primary"
              size="small"
               
              >
                  Update Transaction: {id}
              </Button>
              
              <Button 
              variant="contained"
              color="secondary"
              size="small"
               onClick={()=> setIsExpanded(!isExpanded)}
              >
                  Products
              </Button>
              <Button 
              variant="contained"
              color="secondary"
              size="small"
               
              >
                  Delete
              </Button>
          </CardActions>
          <Collapse
              in = {isExpanded}
              timeout ="auto"
              unmountOnExit
              sx={{
                  color: theme.palette.neutral[300]
              }}
          >
              <CardContent>
                  <Typography>
                    {products.map(product => (
                        <li key={product.id}>
                            <p>Name: {product.name}</p>
                            <p>Price: {product.price}</p>
                        </li>
                    ))}

                  </Typography>
              </CardContent>
          </Collapse>
      </Card>
      
      )



    
  }

//   const TRANSACTION_NAME_QUERY = gql`
//   query GetOneUser($id: ID!) {
//     getOneUser(id: $id) {
//       name
//       id
//     }
//   }
//   `