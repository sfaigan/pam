import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import moviesRouter from "./routes/movies";
import usersRouter from "./routes/users";
import genresRouter from "./routes/genres";
import peopleRouter from "./routes/people";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3001;
const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/pam";

const app = express();
app.use(cors());
app.use(express.json());

try {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
} catch (err) {
  console.log(err);
}

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/movies", moviesRouter);
app.use("/people", peopleRouter);
app.use("/users", usersRouter);
app.use("/genres", genresRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
