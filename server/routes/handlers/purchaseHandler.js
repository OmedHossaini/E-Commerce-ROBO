const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const purchaseItemHandler = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;  // Number of items the user wants to purchase
    const clientInfo = req.body.clientInfo;

    try {
        await client.connect();
        const db = client.db("E-Commerce");

        // Insert client information into the "Data_Clients" collection
        await db.collection("Data_Clients").insertOne(clientInfo);

        // Check current stock for the item
        const item = await db.collection("Data_Items").findOne({ _id: itemId });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if (item.numInStock < quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }

        // Update the stock count
        const newStock = item.numInStock - quantity;
        await db.collection("Data_Items").updateOne({ _id: itemId }, { $set: { numInStock: newStock } });

        // Remove the item if no stock is left
        if (newStock === 0) {
            await db.collection("Data_Items").deleteOne({ _id: itemId });
        }

        res.status(200).json({ message: "Purchase successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
};

module.exports = purchaseItemHandler;
