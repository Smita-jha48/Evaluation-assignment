const{ MongoClient } = require( "mongodb");
const { MONGODB_URI, MONGODB_DB } = require('../config');

// Initialize a MongoDB client
const uri = MONGODB_URI;
const client = new MongoClient(uri);

let db;

// Connect to the MongoDB server
const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db(MONGODB_DB); // Assign the database instance
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

const getCollection = async (collectionName) => {
    if (!db) {
        await connectToMongoDB();
    }

    return await db.collection(collectionName);
};

// Close the connection when the application terminates (optional, but recommended)
process.on("SIGINT", async () => {
    if (client) {
        await client.close();
        console.log("Closed connection to MongoDB");
    }
    process.exit(0);
});

module.exports = { connectToMongoDB, getCollection}