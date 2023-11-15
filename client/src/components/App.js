import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ItemDetail from './components/ItemDetail';
import Navbar from './components/Navbar';

const App = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
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
    <Router>
      <Navbar cartSize={cart.length} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/item/:id" element={<ItemDetail addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
};

export default App;


