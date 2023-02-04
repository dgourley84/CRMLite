import {
    Box, Button, Card,
    CardActions,
    CardContent,
    Collapse, Rating, Typography, useMediaQuery, useTheme
} from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



export default function Product({ product }) {
    let updateItems = [product.name, product.price, product.description, product.category, product.rating, product.supply];
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate()
    localStorage.removeItem('ID');
    function productUpdate() {
        navigate('/updateproduct')
        let ID = product.id;
        localStorage.setItem('Items', JSON.stringify(updateItems))
        console.log('Items'[0])
        localStorage.setItem('ID', ID)

    }
    function deleteProduct() {
        navigate('/deleteproduct')
        let deleteID = product.id;
        localStorage.setItem('deleteID', deleteID)
    }
    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt, //setting background to be flipped based on dark mode
                borderRadius: "0.55rem",
            }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
                    {product.category}
                </Typography>
                <Typography variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    ${Number(product.price).toFixed(2)}
                </Typography>
                <Rating value={product.rating} readOnly />

                <Typography variant="body2">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => productUpdate()}
                >
                    Update Product
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => deleteProduct()}
                >
                    Delete
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300]
                }}
            >
                <CardContent>
                    <Typography>id: {product.id}</Typography>
                    <Typography>Supply Left: {product.supply}</Typography>
                    <Typography>Yearly Sales This Year: </Typography>
                    <Typography>Yearly Units Sold This Year: </Typography>
                </CardContent>
            </Collapse>
        </Card>

    )
}
    // <tr>
    //     <td>{product.name}</td>
    //     <td>${product.price}</td>
    //     <td>{product.description}</td>
    //     <td>{product.category}</td>
    //     <td>{product.rating}</td>
    //     <td>{product.supply}</td>
    // </tr>