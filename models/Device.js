import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema(
  {
    deviceName: {
      type: String,
      require: true,
    },

    plateNo: {
      type: String,
      require: true,
    },

    origin: {
      type: String,
      require: true,
    },

    destination: {
      type: String,
      require: true,
    },

    latitude: {
      type: Number,
      require: true,
    },

    longitude: {
      type: Number,
      require: true,
    },

    passengerCapacity: {
      type: Number,
      require: true,
    },

    sensorData: [{ type: mongoose.Schema.Types.ObjectId, ref: "SensorData" }],
  },

  { timestamps: true }
);

export default mongoose.model("Devices", DeviceSchema);
