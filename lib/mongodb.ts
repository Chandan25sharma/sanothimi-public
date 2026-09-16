import { MongoClient } from 'mongodb';

let clientPromise: Promise<MongoClient> | null = null;

// Optional — returns null if MONGODB_URI isn't set, so DB logging is always best-effort.
export function getMongoClient(): Promise<MongoClient> | null {
  if (!process.env.MONGODB_URI) return null;
  if (!clientPromise) {
    clientPromise = new MongoClient(process.env.MONGODB_URI).connect();
  }
  return clientPromise;
}
