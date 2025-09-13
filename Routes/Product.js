const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../MiddleWares/AuthMiddleware");
const ImageUpload = require("../MiddleWares/ImageUpload")
const {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
} = require("../Controllers/ProductController");


router.get("/", AuthMiddleware(), getAllProducts);
router.get("/:id", AuthMiddleware(), getProduct);
router.post("/", AuthMiddleware(["admin"]),ImageUpload,addProduct);
router.put("/:id", AuthMiddleware(["admin"]), updateProduct);
router.delete("/:id", AuthMiddleware(["admin"]), deleteProduct);

module.exports = router;