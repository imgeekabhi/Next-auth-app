import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message: "Invalid inputs - password should also at least 7 characters!",
      });
      return;
    }
    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "User already exist!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = db
      .collection("users")
      .insertOne({ email: email, password: hashedPassword });

    res.status(201).json({ message: "Created User!" });
  }
};
export default handler;
