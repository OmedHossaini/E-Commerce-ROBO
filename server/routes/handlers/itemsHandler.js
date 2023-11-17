const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getItemsWithCompanyInfo = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("E-Commerce");

        // Retrieve items
        const items = await db.collection("Data_Items").find().toArray();

        // Retrieve companies
        const companies = await db.collection("Data_Companies").find().toArray();
        const companiesMap = new Map(companies.map(company => [company._id, company]));

        // Merge company information with items
        const itemsWithCompanies = items.map(item => {
            const companyInfo = companiesMap.get(item.companyId);
            return {
                ...item,
                company: companyInfo ? {
                    name: companyInfo.name,
                    url: companyInfo.url,
                    country: companyInfo.country
                } : null
            };
        });

        res.status(200).json(itemsWithCompanies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
};

module.exports = getItemsWithCompanyInfo;
