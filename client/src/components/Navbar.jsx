import {
    ArrowDropDownOutlined, DarkModeOutlined, LightModeOutlined, Menu as MenuIcon,
    Search,
    SettingsOutlined
} from "@mui/icons-material";
import {
    AppBar, Box, Button, IconButton,
    InputBase, Menu,
    MenuItem, Toolbar, Typography, useTheme
} from "@mui/material";
import axios from "axios";
import FlexBetween from "components/FlexBetween";
import { getUser } from "helpers/helper";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setMode } from "state";
import profileImage from "../assets/profile.jpg";

const Navbar = ({
    user,
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const navigate = useNavigate()

    // logout handler function
    function userLogout(){
        localStorage.removeItem('token');
        navigate('/')
    }

      // Navigate to update user page
    function userUpdate(){
        navigate('/profile')
    }

      // Navigate to add a user page
      function userAdd(){
        navigate('/adduser')
    }

    // Navigate to add a user page
      function adminAdd(){
        navigate('/register')
    }

    // Navigate to update product page
    function addProduct(){
        navigate('/addproduct')
    }
     //Navigate to new transaction page
    function newTransaction(){
        navigate('/Checkout')
    }

    const [userData, setUserData] = useState({});


    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setUserData("");
                return;
            }
    
            try {
                const response = await axios.get("/home/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    setUserData(null);
                } else {
                    console.error(error);
                }
            }
        };
    
        fetchUserData();
    }, []);

    return (
        <AppBar 
        sx={{
            position: "static",
            background: "none",
            boxShadow:"none"   
        }}>
            <Toolbar sx ={{ justifyContent:"space-between"}}>
                {/* LeftSide */}
                <FlexBetween>
                    <IconButton onClick={()=> setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon/>
                    </IconButton>
                    {/* <FlexBetween 
                        backgroundColor = {theme.palette.background.alt}
                        borderRadius = "9px"
                        gap = "3rem"
                        p ="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </FlexBetween> */}
                </FlexBetween>
                
                {/* RightSide */}
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={()=>dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlined sx ={{fontSize: "25px"}}/>
                        ):(
                            <LightModeOutlined sx ={{fontSize: "25px"}}/>
                        )}
                    </IconButton>
                    {/* <IconButton>
                        <SettingsOutlined sx ={{fontSize: "25px"}}/>
                    </IconButton> */}

                    <FlexBetween>
                        <Button onClick={handleClick} sx={{ display:"flex", justifyContent: "space-between", alignItems:"center", textTransform:"none", gap: "1rem"}}>
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="32px"
                                width="32px"
                                borderRadius="50%"
                                sx={{objectFit:"cover"}} //crops image as needed based on size
                            />
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize = "0.85rem" sx={{color:theme.palette.secondary[100]}}>
                                {userData.name || ""}
                                </Typography>
                                <Typography fontSize = "0.75rem" sx={{color:theme.palette.secondary[200]}}>
                                {userData.occupation || ""}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{color:theme.palette.secondary[300], fontSize: "25px"}}
                            />
                        </Button>
                        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:"bottom",horizontal:"center"}}>
                            <MenuItem onClick={() => {userAdd();handleClose();}}>Add Customer</MenuItem>
                            <MenuItem onClick={() => {adminAdd();handleClose();}}>Add Admin</MenuItem>
                            <MenuItem onClick={() => {userUpdate();handleClose();}}>Edit your details</MenuItem>
                            <MenuItem onClick={() => {addProduct();handleClose();}}>Add Product</MenuItem>
                            <MenuItem onClick={() => {newTransaction();handleClose();}}>New Transaction</MenuItem>
                            <MenuItem onClick={() => {userLogout(); handleClose();}}>Log out</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar