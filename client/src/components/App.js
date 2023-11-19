import GlobalStyles from './GlobalStyles';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart'; 
import Navbar from './Navbar';
import ItemDetail from './ItemDetail';
import { MainContext } from './MainContext';
import AboutUs from './AboutUsContent/AboutUs';
import ContactUs from './ContactUs';


const App = () => {
 
  const {
    actions: { requestItemPage,requestCart, addToCart, },
    state: { cartChanged, cart },
     } = useContext(MainContext);
 
   
  ///USE EFFECT TO FETCH ITEMS, SHOULD STAY IN APP
  const mainEffect = useEffect(() => { 
    requestItemPage(1);
    requestCart(); 
  }, []);
 

  return (
    <>
    <GlobalStyles/>
      <Router>
        <Navbar cartSize={cart.length} /> 
        <button onClick={()=>{addToCart(6547)}}>add item 6547 to cart</button>
        <Routes>
          {"temp text"}
          <Route path="/" element={<Home   />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contactus" element={<ContactUs />} /> 
        </Routes>
      </Router>
    </>
  );
};

export default App;


