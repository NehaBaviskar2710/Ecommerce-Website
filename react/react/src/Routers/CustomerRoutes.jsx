import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetails from "../customer/Components/Product/ProductDetails/ProductDetails";
import Product from "../customer/Components/Product/Product/Product";
import TearmsCondition from "../Pages/TearmsCondition";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import About from "../Pages/About";
import Homepage from "../Pages/Homepage";
import NotFound from "../Pages/Notfound";
import Navigation from "../customer/Components/Navbar/Navigation";
import Cart from "../customer/Components/Cart/Cart";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Button} from "@mui/material";
import { customTheme, customerTheme } from "../Admin/them/customeThem";
import Order from "../customer/Components/orders/Order";
import OrderDetails from "../customer/Components/orders/OrderDetails";
import Checkout from "../customer/Components/Checkout/Checkout";
import PaymentSuccess from "../customer/Components/paymentSuccess/PaymentSuccess";
import RateProduct from "../customer/Components/ReviewProduct/RateProduct";
import FooterNew from "../customer/Components/footer/FooterNew";
import Profile from "../customer/Components/Profile/Profile";
import ContactUs from "../customer/Components/ContactUs/ContactUs";
import BulkOrders from "../customer/Components/BulkOrders/BulkOrders";
import { PublicProtectedRoutes } from "./RouteProtection";
import { useState } from "react";
import AuthModal from "../customer/Components/Auth/AuthModal";

const CustomerRoutes = () => {
    const location = useLocation();
    const [protectedMessage, setProtectedMessage] = useState("");
    const showMessage = "useSelector((store) => store.someCondition)";

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const handleClose = () => {
      setOpenAuthModal(false);
     
    };
    const handleOpen = () => {
      setOpenAuthModal(true);
    };
    
  
    // Only show Navigation component when not on the NotFound page
    const showNavigation = location.pathname !== "*";

    // const path=["/","/home","/about","/privacy-policy","/terms-condition","/contact","/men",`/product/${productId}`]
  return (
    <div>
    
    <ThemeProvider theme={customerTheme}>
    {showNavigation && <Navigation />}
     <Routes>

      {/* Public */}
     <Route path="/login" element={<Homepage />}></Route>
     <Route path="/register" element={<Homepage />}></Route>

        <Route path="/" element={<Homepage />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/bulkorders" element={<BulkOrders />}></Route>
        <Route path="/privaciy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/terms-condition" element={<TearmsCondition />}></Route>
        <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Product />}></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="*" element={<NotFound />} />

        
        {/* <PublicProtectedRoutes path="/cart" element={<Cart />} protected="/login"/> */}
        {/* <Route element={<PublicProtectedRoutes />}> */}

        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/account/order" element={<Order />}></Route>
        <Route path="/account/order/:orderId" element={<OrderDetails />}></Route>
        <Route path="/account/rate/:productId" element={<RateProduct />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/payment/:orderId" element={<PaymentSuccess />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        {/* </Route> */}
        

        
      </Routes>
      <FooterNew/>
    </ThemeProvider>
      
    </div>
  );
};

export default CustomerRoutes;
