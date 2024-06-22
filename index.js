const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB connection string
const uri = "mongodb+srv://arjunsk923:XwyFwXGZOr7fh86s@cluster0.yyhpzd6.mongodb.net/contest?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello from middleware!!");
    next();
});

let db;

// Connect to MongoDB using MongoClient
async function connectToDatabase() {
    try {
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        await client.connect();
        db = client.db('contests'); // Use your database name here
        console.log('Connected successfully to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

// Call the async function to connect to the database
connectToDatabase();

app.get("/", async (req, res) => {

    res.send("WELCOME TO THE CP-ALERT API!!!");

});

// API endpoint to get all contests
app.get("/api/v1/contests", async (req, res) => {
    console.log("Hello from contests!!");

    try {
        const contests = await db.collection('items').find().toArray();
        console.log(contests);
        res.status(200).json({
            status: 'success',
            data: { contests }
        });
    } catch (err) {
        console.error('Error fetching contests:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to create a new contest entry
app.post("/api/v1/contests", async (req, res) => {
    try {
        const newContest = req.body;
        const result = await db.collection('contests').insertOne(newContest);
        res.status(201).json(result.ops[0]); // Send back the inserted document
    } catch (err) {
        console.error('Error creating contest:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
