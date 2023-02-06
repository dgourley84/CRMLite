import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {
  Box,
  Button,
} from "@mui/material";

import { gql, useMutation } from '@apollo/client'


export default function Review() {

let userArray = []
let productArray = []

let productReview = localStorage.getItem('savedItems');
productReview = JSON.parse(productReview);
console.log(productReview)

const purple = localStorage.getItem('CustomerID')
console.log('userId is: ', purple)
// userArray.push(purple)
// console.log('ARRAY: ', userArray)

const prices = productReview.map(product => parseFloat(product.price.replace(',', '')));
console.log(prices)

const productIds = productReview.map(product => product.id);
console.log('SHOWING:', productIds);
productArray.push(productIds)
console.log('PRODUCTS: ', productArray)


let quantityReview = localStorage.getItem('savedQuantity');
quantityReview = JSON.parse(quantityReview);
console.log(quantityReview)

function multiplyAndSumArrays(arr1, arr2) {
  let sum = 0;
  for (let i = 0; i < arr1.length; i++) {
    sum += arr1[i] * arr2[i];
  }
  return sum;
}


const total = multiplyAndSumArrays(quantityReview, prices);

const [createMutation] = useMutation(CREATE_TRANSACTION_MUTATION);
const handleSubmit = evt => {
  evt.preventDefault()
  createMutation({
    variables: {
      userId: purple
    }
  }).then(res => {
    console.log('Mutation response: ', res);
  })
  .catch(error => {
    console.error(error);
  });
  console.log('SUBMITTED SUCCESSFULLY')
}
  return (
    <React.Fragment>
      <form onSubmit={evt => handleSubmit(evt)}>
      <Box>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {productReview.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.id} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${total}
          </Typography>
        </ListItem>
      </List>
      <Button type='submit' variant="contained" color="primary" onClick={evt => handleSubmit(evt)} >
            Place Order
      </Button>
      </Box>
      </form>
    </React.Fragment>
  );
}

const CREATE_TRANSACTION_MUTATION = gql`
  mutation Mutation($userIds: [ID!]) {
    createTransaction(userIds: $userIds) {
      id
      userId {
        name
      }
    }
  }
`