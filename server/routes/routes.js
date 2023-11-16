const express = require('express');
const router = express.Router();
const getItemsWithCompanyInfo = require('./handler.js/itemsHandler')


// Route to get items with company information from 'Data_Items' and 'Data_Companies' collections
router.get('/items', getItemsWithCompanyInfo);

module.exports = router;
