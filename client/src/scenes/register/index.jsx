import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { registerUser } from "helpers/helper";
import { registerValidation } from "helpers/validate";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
	const navigate = useNavigate();

	const formikRegister = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validate: registerValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			values = await Object.assign(values);
			let registerPromise = registerUser(values);
			toast.promise(registerPromise, {
				loading: "Creating...",
				success: <b>Registered successfully</b>,
				error: <b>Could not register</b>,
			});

			registerPromise.then((res) => {
				let { token } = res.data;
				localStorage.setItem("token", token);
				navigate("/login");
			});
		},
	});

	//protection on page navigation for only logged in Admins
	const token = localStorage.getItem("token");
	if (!token) {
		navigate("/login");
	}

	return (
		<ThemeProvider theme={theme}>
			<Toaster position="top-center" reverseOrder={false}></Toaster>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						bgcolor: theme.palette.primary[500],
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: theme.palette.secondary[200] }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register admin
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={formikRegister.handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="name"
									name="name"
									required
									fullWidth
									id="firstName"
									label="Full Name"
									autoFocus
									{...formikRegister.getFieldProps("name")}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
									{...formikRegister.getFieldProps("email")}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									autoFocus
									{...formikRegister.getFieldProps("password")}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Register
						</Button>
					</Box>
				</Box>
				{/* <Copyright sx={{ mt: 5 }} /> */}
			</Container>
		</ThemeProvider>
	);
}
