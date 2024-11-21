const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/share_trading";
const client = new MongoClient(uri);

async function seedDatabase() {
    try {
        await client.connect();
        const database = client.db("share_trading");
        const shares = database.collection("shares");

        // Clear existing data
        await shares.deleteMany({});

        // Insert seed data
        const seedData = [
            {
                name: "ICICI Bank Ltd.",
                symbol: "ICICIBANK",
                price: 1250,
                change: 1.4,
                totquantity: 1000,
            },
            {
                name: "Dhani Services Ltd.",
                symbol: "DHANI",
                price: 73.79,
                change: 4.36,
                totquantity: 1000,
            },
            {
                name: "Prism Johnson Ltd",
                symbol: "PRSMJOHNSN",
                price: 182.4,
                change: 0.1,
                totquantity: 1000,
            },
            {
                name: "SEPC Ltd.",
                symbol: "SEPC",
                price: 21.99,
                change: -0.9,
                totquantity: 1000,
            },
        ];

        await shares.insertMany(seedData);

        console.log("Database seeded successfully");
    } finally {
        await client.close();
    }
}

seedDatabase().catch(console.error);
