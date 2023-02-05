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

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

export default function Review() {

let productReview = localStorage.getItem('savedItems');
productReview = JSON.parse(productReview);
console.log(productReview)

const prices = productReview.map(product => parseFloat(product.price.replace(',', '')));
console.log(prices)



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

  return (
    <React.Fragment>
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
      <Button variant="contained" color="primary">
            Place Order
      </Button>
      </Box>
    </React.Fragment>
  );
}
