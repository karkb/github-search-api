import express from "express";
import cors from "cors";
import searchRouter from "../src/routes/search";
import { initRedis } from "../src/services/redis";

require("dotenv").config();

initRedis();
const app = express();

// allow localhost with port 3000
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use("/api", searchRouter);

app.listen(process.env.PORT || 5001, () => {
  console.log(`Node server started at port: ${process.env.PORT}`);
});
