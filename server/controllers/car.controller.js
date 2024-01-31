import Car from "../models/car.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";
const create = async (req, res) => {
  console.log(req.body);
  const car = new Car(req.body);
  try {
    await car.save();
    return res.status(200).json({
      message: "Successfully registered your car!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const list = async (req, res) => {
  try {
    let cars = await Car.find().select("model description year seats transmission fuelType mileage email phone owner");
    res.json(cars);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const carByID = async (req, res, next, id) => {
  try {
    let car = await Car.findById(id);
    if (!car)
      return res.status("400").json({
        error: "Car not found",
      });
    req.profile = car;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve car",
    });
  }
};
const read = (req, res) => {
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let car = req.profile;
    car = extend(car, req.body);
    await car.save();
    res.json(car);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const remove = async (req, res) => {
  try {
    let car = req.profile;
    let deletedCar = await car.deleteOne();
    res.json(deletedCar);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, carByID, read, list, remove, update };
