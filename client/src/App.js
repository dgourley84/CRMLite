import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "scenes/admin";
import Breakdown from "scenes/breakdown";
import Customers from "scenes/customers";
import Daily from "scenes/daily";
import Dashboard from "scenes/dashboard";
import Geography from "scenes/geography";
import Layout from "scenes/layout";
import Login from "scenes/login";
import Monthly from "scenes/monthly";
import Overview from "scenes/overview";
import Performance from "scenes/performance";
import AddProduct from "scenes/productAdd";
import Products from "scenes/products";
import UpdateProduct from "scenes/productUpdate";
import UpdateUser from "scenes/profile";
import AddUser from "scenes/profileAdd";
import Register from "scenes/register";
import Transactions from "scenes/transactions";
import { themeSettings } from "theme";


//auth middleware
// import { AuthorizeUser } from "middleware/auth";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route exact path="/login" element={<Login />} />
              <Route path="/" element={<Navigate replace to="/login" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/profile" element={<UpdateUser />} />
              <Route path="/updateproduct" element={<UpdateProduct />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
