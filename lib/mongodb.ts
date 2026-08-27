import { MongoClient } from 'mongodb';

let clientPromise: Promise<MongoClient> | null = null;

// Returns null when MONGODB_URI isn't configured — submission logging is optional,
// email delivery must not depend on a database being set up.
export function getMongoClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}
