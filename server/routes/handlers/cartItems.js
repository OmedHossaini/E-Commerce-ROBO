const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getCartItems = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("E-Commerce");

        // Retrieve all documents from the Cart collection
        const cartItems = await db.collection("Cart").find({}).toArray();

        // Check if _id in Cart exists in Data_Items and return matching items
        const itemsToReturn = [];
        for (const cartItem of cartItems) {
            const dataItem = await db.collection("Data_Items").findOne({ _id: cartItem._id });
            if (dataItem) {
                itemsToReturn.push(dataItem);
            }
        }

        res.status(200).json(itemsToReturn);
    } catch (e) {
        res.status(500).json({ error: e.message });
    } finally {
        await client.close();
    }
};

module.exports = getCartItems;