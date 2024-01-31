import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    required: [true, "Please provide device"],
  },

  rfId: {
    type: String,
    require: true,
  },

  empNo: {
    type: String,
    require: true,
  },

  empName: {
    type: String,
    require: true,
  },

  timestamp: {
    type: Number,
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

  error: {
    type: Object,
  },
});

export default mongoose.model("SensorData", SensorDataSchema);
