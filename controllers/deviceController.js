import Device from "../models/Device.js";

const getAllDeviceData = async (req, res, next) => {
  try {
    //read db
    const devices = await Device.find().populate("sensorData");

    //get response
    res.status(200).json({ devices });
  } catch (error) {
    next(error);
  }
};

const createDevice = async (req, res, next) => {
  try {
    const {
      deviceName,
      plateNo,
      origin,
      destination,
      passengerCapacity,
      longitude,
      latitude,
    } = req.body;

    // check null values
    if (!deviceName) {
      res.status(400).send("Please provide all values");
      throw new Error("Please provide all values");
    }

    //check device already exist
    const device = await Device.findOne({
      $or: [{ deviceName: deviceName }],
    });

    //check device already exist
    if (device) {
      res.status(401).send("Device Name already created");
      throw new Error("Device Name already created");
    }

    // create data object
    const data = new Device({
      deviceName,
      plateNo,
      origin,
      destination,
      longitude,
      latitude,
      passengerCapacity,
    });

    //save device
    await data.save();

    //get response
    res.status(200).json({ device: data });
  } catch (error) {
    next(error);
  }
};

const updateDevice = async (req, res, next) => {
  const { id } = req.params;
  const {
    deviceName,
    plateNo,
    origin,
    destination,
    passengerCapacity,
    longitude,
    latitude,
  } = req.body;

  try {
    // Read data from database
    const device = await Device.findOne({ _id: id });

    //if not device id found
    if (!device) {
      res.status(404).send(`Device with id ${id} not found`);
      throw new Error(`Device with id ${id} not found`);
    }

    //check device already exist
    const deviceAlreadyExist = await Device.findOne({
      $or: [{ deviceName: deviceName }],
    });

    //check device already exist
    if (deviceAlreadyExist) {
      res.status(401).send("Device Name already created");
      throw new Error("Device Name already created");
    }

    // create data object
    const data = {
      deviceName,
      plateNo,
      origin,
      destination,
      longitude,
      latitude,
      passengerCapacity,
    };

    //update database
    const updatedDevice = await Device.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ device: updatedDevice });
  } catch (error) {
    next(error);
  }
};

const deleteDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Read data from db
    const device = await Device.findOne({ _id: id });

    //check deice available or not
    if (!device) {
      res.status(404).send(`Device with id ${id} not found`);
      throw new Error(`Device with id ${id} not found`);
    }

    // device remove from database
    await Device.deleteOne({ _id: id });

    //get response msg
    res.status(200).json({ msg: "Device removed successfully" });
  } catch (error) {
    next(error);
  }
};

// const getAllSingleDeviceData = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     // Read data from database
//     const device = await Device.findOne({ deviceId: id });

//     if (!device) {
//       res.status(404).send(`Device with id ${id} not found`);
//       throw new Error(`Device with id ${id} not found`);
//     }

//     res.status(200).json({ device });
//   } catch (error) {
//     next(error);
//   }
// };

export {
  createDevice,
  getAllDeviceData,
  updateDevice,
  deleteDevice,
  // getAllSingleDeviceData,
};
