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
    actions: { receiveItemInfoFromServer },
    state: { items, itemsIndex },
     } = useContext(MainContext);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("quite fetching");
    fetch('/items',
      {
       method: "GET",
       header: {
          "Content-Type":"application/json",
        } 
      }
    )
    .then(res => res.json())
    .then(data => receiveItemInfoFromServer(data)) 
    .catch((error)=>{
      console.log(error); 
    })
  }, []);


  const addToCart = (item) => {
    
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
    
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId));
  };

  return (
    <>
    <GlobalStyles/>
      <Router>
        <Navbar cartSize={cart.length} />
        <Routes>
          {"temp text"}
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/item/:id" element={<span>AddToCart</span>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;


