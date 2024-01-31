import SensorData from "../models/SensorData.js";
import Device from "../models/Device.js";

const createSensorData = async (req, res, next) => {
  const configData = [];
  const userData = [
    { rfId: "000 00 000 00 001", empNo: "020034", empName: "Kanaka Bhashitha" },
    { rfId: "000 00 000 00 002", empNo: "020054", empName: "Sri Branawan" },
    { rfId: "000 00 000 00 003", empNo: "020053", empName: "Kalindu Silva" },
    {
      rfId: "000 00 000 00 004",
      empNo: "000088",
      empName: "Sakunika Katukithula",
    },
    {
      rfId: "000 00 000 00 005",
      empNo: "020010",
      empName: "Chathunka Tennakoon",
    },
    {
      rfId: "000 00 000 00 006",
      empNo: "019857",
      empName: "Gayan Amarasinghe",
    },
    {
      rfId: "000 00 000 00 007",
      empNo: "016328",
      empName: "Salinda Ekanayake",
    },
  ];

  try {
    const { deviceName, latitude, longitude, rfId, error } = req.body;

    // check null values
    if (!deviceName || !latitude || !longitude || !rfId) {
      res.status(400).send("Please provide all values");
      throw new Error("Please provide all values");
    }

    // check if the device exists
    const device = await Device.findOne({ deviceName });

    if (!device) {
      res.status(404).send("Device not found");
      throw new Error("Device not found");
    }

    // Remove spaces from the rfId in the request body
    const cleanRfId = rfId.replace(/\s/g, "");

    for (let i = 0; i < userData.length; i++) {
      // Remove spaces from the rfId in the userData array
      const cleanUserDataRfId = userData[i].rfId.replace(/\s/g, "");

      if (cleanUserDataRfId === cleanRfId) {
        configData.push({
          deviceId: device._id,
          timestamp: Date.now(),
          rfId,
          empNo: userData[i].empNo,
          empName: userData[i].empName,
          latitude,
          longitude,
          error,
        });
      }
    }

    // create sensor data object
    const sensorData = new SensorData({
      deviceId: configData[0].deviceId,
      timestamp: configData[0].timestamp,
      rfId: configData[0].rfId,
      empName: configData[0].empName,
      empNo: configData[0].empNo,
      latitude: configData[0].latitude,
      longitude: configData[0].longitude,
      error: configData[0].error,
    });

    // save sensor data
    await sensorData.save();

    // Update the 'sensorData' field in the corresponding Device document
    device.sensorData.push(sensorData._id);
    await device.save();

    // get response
    res.status(200).json(sensorData);
  } catch (error) {
    next(error);
  }
};

export { createSensorData };
