const { MongoClient } = require("mongodb"); // Import MongoClient from the MongoDB driver.
require("dotenv").config(); // Load environment variables from a .env file.

const { MONGO_URI } = process.env; // Extract the MONGO_URI environment variable.
const options = { // Define options for the MongoDB client.
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const postItemToCart = async (req, res) => { // Define an async function to handle item addition to the cart.
    const client = new MongoClient(MONGO_URI, options); // Create a new MongoDB client instance.
    try {
        await client.connect(); // Connect to the MongoDB database.
        const db = client.db("E-Commerce"); // Select the "E-Commerce" database.
        
        // Assuming _id is sent in the request body and is a string
        const { _id } = req.body; // Extract the item ID from the request body.

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

module.exports = postItemToCart;