import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCustomersQuery } from "state/api";

const Customers = () => {
	//protection on page navigation for only logged in Admins
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	React.useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token]);
	const theme = useTheme();
	const { data, isLoading } = useGetCustomersQuery();
	console.log("Customers", data);
	localStorage.removeItem("CustomerID");

	const columns = [
		{
			field: "_id",
			headerName: "ID",
			flex: 1,
		},
		{
			field: "name",
			headerName: "Name",
			flex: 0.5,
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
		},
		{
			field: "phoneNumber",
			headerName: "Phone Number",
			flex: 0.5,
			renderCell: (params) => {
				return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$2");
			},
		},
		{
			field: "country",
			headerName: "Country",
			flex: 0.4,
		},
		{
			field: "occupation",
			headerName: "Occupation",
			flex: 1,
		},
		// {
		//     field: "role",
		//     headerName: "Role",
		//     flex: 0.5,
		// },
		{
			field: "addTransaction",
			headerName: "Add Transaction",
			flex: 1,
			renderCell: (row) => {
				return (
					<Button
						variant="contained"
						size="small"
						color="secondary"
						onClick={() => {
							localStorage.setItem("CustomerID", row.id);
							// Navigate to the new transactions page
							navigate(`/Checkout`);
						}}
					>
						Add Transaction
					</Button>
				);
			},
			disableClick: true,
		},
		{
			field: "update",
			headerName: "Update",
			flex: 0.5,
			renderCell: (row) => {
				return (
					<Button
						variant="contained"
						size="small"
						color="primary"
						onClick={() => {
							localStorage.setItem("CustomerID", row.id);
							//Navigate to the update customer update page
							navigate(`/updateCustomer`);
						}}
					>
						Update
					</Button>
				);
			},
			disableClick: true,
		},
	];

	return (
		<Box m="1.5rem 2.5rem">
			<Header title="CUSTOMERS" subtitle="List of Customers" />
			<Box
				mt="40px"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: theme.palette.primary.light,
					},
					"& .MuiDataGrid-footerContainer": {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderTop: "none",
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${theme.palette.secondary[200]} !important`,
					},
				}}
			>
				<DataGrid
					loading={isLoading || !data}
					getRowId={(row) => row._id}
					rows={data || []}
					columns={columns}
				/>
			</Box>
		</Box>
	);
};

export default Customers;
