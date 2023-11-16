const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const postItemToCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("E-Commerce");
        
        // Assuming _id is sent in the request body and is a string
        const { _id } = req.body;

        // Query the 'Data_Items' collection for the item using string _id
        const item = await db.collection("Data_Items").findOne({ _id: _id });

        if (item) {
            // Insert only the _id to the 'Cart' collection as a string
            await db.collection("Cart").insertOne({ _id: _id });

            // Return the item information in the response
            res.status(200).json({ message: "Item added to cart", item });
        } else {
            // Item not found in 'Data_Items' collection
            res.status(404).json({ message: "Item not found" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    } finally {
        client.close();
    }
};
module.exports = postItemToCart ;
