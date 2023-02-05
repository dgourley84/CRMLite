import { ApolloClient, gql, useQuery } from "@apollo/client";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Header from "components/Header";
import Transaction from "components/transaction.jsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTransactionsQuery } from "state/api";
import Product from "../../components/Product.js";

export const TRANSACTION_QUERY = gql`
	query Query {
		getAllTransactions {
			id
			userId {
				name
			}
			cost
			products {
				name
				price
			}
		}
	}
`;

const Transactions = () => {
	//protection on page navigation for only logged in Admins
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	//React.useEffect(() => {
		//if (!token) {
		//	navigate("/login");
		//}
	//}, [token]);

	const { data, loading, error } = useQuery(TRANSACTION_QUERY, {
		partialRefetch: [{ query: TRANSACTION_QUERY }],
	});
	console.log(data);
	const isNonMobile = useMediaQuery("(min-width:1000px)");
	if (error) {
		console.error("TRANSACTION_QUERY error", error);
	}

	return (
		<Box m="1.5rem 2.5rem">
			<Header title="TRANSACTIONS" subtitle="See your list of transactions" />
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
					data?.getAllTransactions.map((transaction) => (
						<Transaction transaction={transaction} key={transaction.id} />
					))}
			</Box>
		</Box>
	);
};

export default Transactions;
