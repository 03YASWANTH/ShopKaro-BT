const Product = require("../Models/ProductModel.js");

const addProduct = async (req, res) => {
  const { title, price, description, category } = req.body;
  const parsedPrice = parseFloat(price);

  if (!title || !category || !parsedPrice || !description) {
    return res.json({
      success: false,
      message: "Enter all the details correctly.",
    });
  }

  try {
    const response = await Product.create({
      title,
      price: parsedPrice,
      description,
      category,
      ImageUrl: req.Imageurl || null,
    });

    return res.json({
      success: true,
      message: "Data inserted successfully.",
      data: response,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Insert failed",
      error: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const response = await Product.find({});
    return res.json({ success: true, products: response });
  } catch (err) {
    return res.json({
      success: false,
      message: "Error while fetching the data",
      error: err.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.json({ success: true, product });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { title, price, description, category, id } = req.body;
  const parsedPrice = parseFloat(price);

  if (!title || !category || !parsedPrice || !description) {
    return res.json({
      success: false,
      message: "Enter all the details correctly.",
    });
  }

  try {
    const update = { title, price: parsedPrice, description, category };
    if (req.Imageurl) {
      update.ImageUrl = req.Imageurl;
    }
    const product = await Product.findByIdAndUpdate(id, update, { new: true });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await Product.findByIdAndDelete(id);
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        response,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
};