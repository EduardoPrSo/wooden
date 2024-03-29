import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB;

let cachedClient = null;
let cachedDb = null;

if (!uri) {
    throw new Error(
        'Please define the MONGO_DB environment variable inside .env.local'
    );
}

if (!dbName) {
    throw new Error(
        'Please define the MONGO_DB environment variable inside .env.local'
    );
}

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}