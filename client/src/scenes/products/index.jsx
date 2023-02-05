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
import Header from "components/Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "state/api";
import Product from "../../components/Product.js";

import { ApolloClient, gql, useQuery } from "@apollo/client";

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
`;

export default function Products() {
	const { data, loading, error } = useQuery(PRODUCT_QUERY, {
		partialRefetch: [{ query: PRODUCT_QUERY }],
	});
	const isNonMobile = useMediaQuery("(min-width:1000px)");
	if (error) {
		console.error("PRODUCTS_QUERY error", error);
	}

	//protection on page navigation for only logged in Admins
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	React.useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token]);
	return (
		<Box m="1.5rem 2.5rem">
			<Header title="PRODUCTS" subtitle="See your list of products" />
			<Box
				mt="20px"
				display="grid"
				gridTemplateColumns="repeat(4, minmax( 0, 1fr))"
				justifyContent="space-between"
				rowGap="20px"
				columnGap="1.33%"
				sx={{
					"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
				}}
			>
				{loading && (
					<tr>
						<td>Loading...</td>
					</tr>
				)}
				{error && (
					<tr>
						<td>Check console log for error</td>
					</tr>
				)}
				{!loading &&
					!error &&
					data?.getAllProducts.map((product) => (
						<Product product={product} key={product.id} />
					))}
			</Box>
		</Box>
	);
}
