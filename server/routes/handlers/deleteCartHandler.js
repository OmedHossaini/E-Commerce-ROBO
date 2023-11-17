const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const deleteItemFromCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("E-Commerce");

        // Assuming _id is sent in the request body and is a string
        const { _id } = req.body;

        // Query to find and delete the item with the given _id
        const result = await db.collection("Cart").deleteOne({ _id : _id});

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No items found with the given _id" });
        } else {
            return res.status(200).json({ message: "Item successfully removed from the cart" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    } finally {
        await client.close();
    }
};

module.exports =  deleteItemFromCart  ;
