const express = require('express');
const router = express.Router();
const getItemsWithCompanyInfo = require('./handler.js/itemsHandler')
const postItemToCart = require('./handler.js/cartHandler')

router.use(express.json());

// Route to get items with company information from 'Data_Items' and 'Data_Companies' collections
router.get('/items', getItemsWithCompanyInfo);

router.post('/addToCart', postItemToCart);

module.exports = router;
