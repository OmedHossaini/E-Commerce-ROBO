const express = require('express');
const router = express.Router();
const itemsInfo = require('./handlers/itemsInfo');
const postItemToCart = require('./handlers/postItemToCart');
const deleteItemFromCart = require('./handlers/deleteItemFromCart');
const purchaseItem = require('./handlers/purchaseItem');
const cartItems = require('./handlers/cartItems'); 
const itemsByPage = require("./handlers/itemsByPage");
const companyInfo = require("./handlers/companyInfo")


router.use(express.json());

// Route to get items with company information from 'Data_Items' and 'Data_Companies' collections
router.get('/items', itemsInfo);

// Route to get 20 items by page with company information from 'Data_Items' and 'Data_Companies' collections 
router.get('/items/:page', itemsByPage);

// New GET route to retrieve items in the cart
router.get('/cart', cartItems); 

// New GET route to retrieve companies info
router.get('/companies', companyInfo)

// New POST route to add an item to the cart
router.post('/addToCart', postItemToCart);

// New DELETE route to remove an item from the cart
router.delete('/removeFromCart', deleteItemFromCart);

// New POST route for purchasing an item
router.post('/purchaseItem', purchaseItem);



module.exports = router;
