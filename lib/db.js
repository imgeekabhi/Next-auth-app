import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://as_simform:qZuuk9fPXWtYcRUE@cluster0.ze4ag0i.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );
  return client;
};
