import { MongoClient } from "mongodb";

// TODO: Upgrade to MongoDB Node.js Driver v5:
// https://github.com/mongodb/node-mongodb-native/blob/HEAD/etc/notes/CHANGES_5.0.0.md

// See: https://next-auth.js.org/adapters/mongodb
// See: https://github.com/vercel/next.js/tree/canary/examples/with-mongodb

export const mongoDbUri = `${process.env.MONGODB_URI}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI" or "MONGODB_DB"');
}
const uri = mongoDbUri;
const options = {};
let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // See: https://github.com/nextauthjs/next-auth/discussions/3320
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
