import { MongoClient } from "mongodb";

const url = "mongodb+srv://admin:qwer1234@cluster0.c42abti.mongodb.net/?retryWrites=true&w=majority";
// const options = { useNewUrlParser: true };
const options={
  useUnifiedTopology: true,
};

let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

export { connectDB };
