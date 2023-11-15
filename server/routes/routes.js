const express = require('express');
const router = express.Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Route to get items from 'Data_Items' collection
router.get('/items', async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("E-Commerce");
        const items = await db.collection("Data_Items").find().toArray();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
});

module.exports = router;