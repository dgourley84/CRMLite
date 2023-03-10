import { gql, useQuery } from "@apollo/client";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Collapse,
	Rating,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Transaction({ transaction }) {
	//protection on page navigation for only logged in Admins
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	// React.useEffect(() => {
	// 	if (!token) {
	// 		navigate("/login");
	// 	}
	// }, [token]);
	const { id, userId, cost, products } = transaction;
	//const customerName = userId[0].name
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
				<Typography
					sx={{ fontSize: 14 }}
					color={theme.palette.secondary[700]}
					gutterBottom
				></Typography>
				<Typography variant="h5" component="div">
					Customer: {userId.map((name) => name.name)}
				</Typography>
				<Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
					Cost: ${Number(cost).toFixed(2)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant="contained" color="primary" size="small">
					Update Transaction
				</Button>

				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					Products
				</Button>
				<Button variant="contained" color="secondary" size="small">
					Delete
				</Button>
			</CardActions>
			<Collapse
				in={isExpanded}
				timeout="auto"
				unmountOnExit
				sx={{
					color: theme.palette.neutral[300],
				}}
			>
				<CardContent>
					<Typography>
						{products.map((product) => (
							<li key={product.id}>
								<p>Name: {product.name}</p>
								<p>Price: {product.price}</p>
							</li>
						))}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
