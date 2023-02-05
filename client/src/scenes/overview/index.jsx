import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Overview = () => {
	const [view, setView] = useState("units"); //set default to units
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
			<Header
				title="OVERVIEW"
				subtitle="Overview of general revenue and profit"
			/>
			<Box height="75vh">
				{/* create dropdown of Sales and Units */}
				<FormControl sx={{ mt: "1rem" }}>
					<InputLabel>View</InputLabel>
					<Select
						value={view}
						label="View"
						onChange={(e) => setView(e.target.value)}
					>
						<MenuItem value="sales">Sales</MenuItem>
						<MenuItem value="units">Units</MenuItem>
					</Select>
				</FormControl>
				<OverviewChart view={view} />
			</Box>
		</Box>
	);
};

export default Overview;
