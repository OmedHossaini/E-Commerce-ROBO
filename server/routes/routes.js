const express = require('express');
const router = express.Router();
const getItemsWithCompanyInfo = require('./handlers/itemsHandler');
const postItemToCart = require('./handlers/cartHandler');
const deleteItemFromCart = require('./handlers/deleteCartHandler');
const purchaseItemHandler = require('./handlers/purchaseHandler');
const getCartItems = require('./handlers/cartItems'); // Import the getCartItems function

router.use(express.json());

// Route to get items with company information from 'Data_Items' and 'Data_Companies' collections
router.get('/items', getItemsWithCompanyInfo);

router.post('/addToCart', postItemToCart);

// New DELETE route to remove an item from the cart
router.delete('/removeFromCart', deleteItemFromCart);

// New POST route for purchasing an item
router.post('/purchaseItem', purchaseItemHandler);

// New GET route to retrieve items in the cart
router.get('/cart', getCartItems); // Add this line for the new route

module.exports = router;
