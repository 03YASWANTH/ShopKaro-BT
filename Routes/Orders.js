const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../MiddleWares/AuthMiddleware");
const {
  placeOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} = require("../Controllers/OrderController");


router.post("/", AuthMiddleware(), placeOrder);
router.get("/my-orders", AuthMiddleware(), getUserOrders);
router.get("/", AuthMiddleware(["admin"]), getAllOrders);
router.put("/:id", AuthMiddleware(["admin"]), updateOrderStatus);

module.exports = router;
