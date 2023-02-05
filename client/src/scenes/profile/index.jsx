import {
	Box,
	Button,
	Container,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	Typography,
	useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
	//protection on page navigation for only logged in Admins
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	if (!token) {
		navigate("/login");
	}
	const [name, setName] = useState({});
	const [email, setEmail] = useState({});
	const [city, setCity] = useState({});
	const [state, setState] = useState({});
	const [country, setCountry] = useState({});
	const [occupation, setOccupation] = useState({});
	const [phoneNumber, setPhoneNumber] = useState({});

	async function handleSubmit(evt) {
		const token = localStorage.getItem("token");
		evt.preventDefault();
		console.info("Adding user");
		try {
			const values = {
				name,
				email,
				city,
				state,
				country,
				occupation,
				phoneNumber,
			};
			const response = await axios.put("/home/updateUser", values, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);
			toast.success("Profile updated successfully!");
		} catch (error) {
			console.error(error);
			toast.error("Failed to update profile. Please try again.");
		}
	}

	const theme = useTheme();

	return (
		<form onSubmit={(evt) => handleSubmit(evt)}>
			<Container component="main" maxWidth="md">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						backgroundColor: theme.palette.background.alt, //setting background to be flipped based on dark mode
						borderRadius: "0.55rem",
						p: 3, //adds padding around the entire form
					}}
				>
					<Typography
						variant="h2"
						component="div"
						color="secondary"
						sx={{ mb: 3 }}
					>
						Update your information
					</Typography>
					<Box component="main" noValidate sx={{ mt: 3 }} gap="10">
						<FormControl sx={{ mb: 2, mr: 1 }}>
							<InputLabel htmlFor="name-input">Full name</InputLabel>
							<Input
								id="name-input"
								aria-describedby="name-helper-text"
								onChange={(e) => setName(e.target.value)}
							/>
							<FormHelperText id="name-helper-text">
								Update full name
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ mb: 2, mr: 1 }}>
							<InputLabel htmlFor="email-input">Email address</InputLabel>
							<Input
								id="email-input"
								aria-describedby="email-helper-text"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<FormHelperText id="email-helper-text">
								We'll never share your email. Update your email.
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ mb: 2, mr: 1 }}>
							<InputLabel htmlFor="phone-input">Phone Number</InputLabel>
							<Input
								id="phone-input"
								aria-describedby="phone-helper-text"
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
							<FormHelperText id="phone-helper-text">
								Update phone number
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ mb: 2, mr: 1 }}>
							<InputLabel htmlFor="country-input">Country</InputLabel>
							<Input
								id="city-input"
								aria-describedby="county-helper-text"
								onChange={(e) => setCountry(e.target.value)}
							/>
							<FormHelperText id="country-helper-text">
								Update country
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ mb: 2, mr: 1 }}>
							<InputLabel htmlFor="City-input">City</InputLabel>
							<Input
								id="city-input"
								aria-describedby="city-helper-text"
								onChange={(e) => setCity(e.target.value)}
							/>
							<FormHelperText id="city-helper-text">Update city</FormHelperText>
						</FormControl>
						<FormControl sx={{ mb: 2, mr: 1 }}>
							<InputLabel htmlFor="state-input">State</InputLabel>
							<Input
								id="state-input"
								aria-describedby="state-helper-text"
								onChange={(e) => setState(e.target.value)}
							/>
							<FormHelperText id="state-helper-text">
								Update state
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ mb: 2, mr: 1 }}>
							<InputLabel htmlFor="occupation-input">Occupation</InputLabel>
							<Input
								id="occupation-input"
								aria-describedby="occupation-helper-text"
								onChange={(e) => setOccupation(e.target.value)}
							/>
							<FormHelperText id="occupation-helper-text">
								Update occupation
							</FormHelperText>
						</FormControl>
					</Box>
				</Box>
				<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						sx={{ mb: 2 }}
					>
						Create User
					</Button>
					<Button variant="contained" color="secondary" sx={{ mb: 2, ml: 2 }}>
						Reset
					</Button>
				</Box>
			</Container>
		</form>
	);
}
