import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Header from "components/Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTransactionsQuery } from "state/api";
import { gql, useQuery, ApolloClient } from '@apollo/client';
import Product from '../../components/Product.js'
import Transaction from "components/transaction.jsx";

export const TRANSACTION_QUERY = gql`
query GetAllTransactions {
    getAllTransactions {
      id
      userId
      cost
      products {
        name
        price
        id
      }
    }
  }
`



const Transactions = () => {
	const { data, loading, error } = useQuery(TRANSACTION_QUERY, {
        partialRefetch: [
            {query: TRANSACTION_QUERY}
        ]
    });
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    if (error) {
        console.error('TRANSACTION_QUERY error', error);
    }

    return (

                
                <Box m="1.5rem 2.5rem">
       <Header title="TRANSACTIONS" subtitle="See your list of transactions"/>
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
             {!loading && !error && data?.getAllTransactions.map(transaction => <Transaction transaction={transaction} key={transaction.id}/>)}
              
            </Box> 
         
    </Box>
    )
			}

export default Transactions;
