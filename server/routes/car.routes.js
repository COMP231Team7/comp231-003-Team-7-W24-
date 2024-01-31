import express from "express";
import carCtrl from "../controllers/car.controller.js";
const router = express.Router();
router.route("/api/car").get(carCtrl.list).post(carCtrl.create);
router.param("carId", carCtrl.carByID);
router.route("/api/car").post(carCtrl.create);
router.route("/api/car").get(carCtrl.list);
router.param("carId", carCtrl.carByID);
router.route("/api/car/:carId").get(carCtrl.read);
router.route("/api/car/:carId").put(carCtrl.update);
router.route("/api/car/:carId").delete(carCtrl.remove);

export default router;
