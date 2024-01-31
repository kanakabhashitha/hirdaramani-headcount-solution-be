import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

// database connection
import connectBD from "./db/connect.js";

//routes import
import deviceRouter from "./routes/deviceRoutes.js";
import sensorDataRouter from "./routes/sensorDataRoutes.js";
import mapRouter from "./routes/mapRoutes.js";

//routes
app.use("/api/v1/device", deviceRouter);
app.use("/api/v1/sensor-data", sensorDataRouter);
app.use("/api/v1/map", mapRouter);

//define port
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectBD(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server Is Listening Port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
