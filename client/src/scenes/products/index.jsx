import Product from '../../components/Product.js'
import React, { useState } from "react";
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
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import { useNavigate } from 'react-router-dom';


import { gql, useQuery, ApolloClient } from '@apollo/client';

export const PRODUCT_QUERY = gql`
    query Query {
        getAllProducts {
        id
        name
        price
        description
        category
        supply
        rating
        }
    }
`

export default function Products() {
    const { data, loading, error } = useQuery(PRODUCT_QUERY, {
        partialRefetch: [
            {query: PRODUCT_QUERY}
        ]
    });
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    if (error) {
        console.error('PRODUCTS_QUERY error', error);
    }

    return (

                
                <Box m="1.5rem 2.5rem">
       <Header title="PRODUCTS" subtitle="See your list of products"/>
            <Box 
                mt="20px" 
                display="grid" 
                gridTemplateColumns="repeat(4, minmax( 0, 1fr))"
                justifyContent="space-between"
                rowGap="20px"
                columnGap="1.33%"
                sx ={{
                    "& > div": {gridColumn : isNonMobile ? undefined : "span 4"}
                }}
            >
                {loading && <tr><td>Loading...</td></tr>}
                {error && <tr><td>Check console log for error</td></tr>}
             {!loading && !error && data?.getAllProducts.map(product => <Product product={product} key={product.id}/>)}
              
            </Box> 
         
    </Box>
    )
       
    
        
}
