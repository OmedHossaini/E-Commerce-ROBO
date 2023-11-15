const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require('fs');

const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Read JSON files
const itemsData = JSON.parse(fs.readFileSync('./data/items.json', 'utf8'));
const companiesData = JSON.parse(fs.readFileSync('./data/companies.json', 'utf8'));

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("E-Commerce");

        // Import items data into Data_Items collection
        const resultItems = await db.collection("Data_Items").insertMany(itemsData);
        console.log(`Successfully inserted ${resultItems.insertedCount} items into Data_Items collection`);

        // Import companies data into Data_Companies collection
        const resultCompanies = await db.collection("Data_Companies").insertMany(companiesData);
        console.log(`Successfully inserted ${resultCompanies.insertedCount} companies into Data_Companies collection`);
    } catch (err) {
        console.error("Error in importing data", err);
    } finally {
        await client.close();
    }
};

batchImport();
