const OrderModel = require("../Models/OrderModel");
const ProductModel = require("../Models/ProductModel");

// Place order
const placeOrder = async (req, res) => {
  try {
    const { products } = req.body; // [{ productId, quantity }]

    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "No products in order" });
    }

    let totalPrice = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await ProductModel.findById(item.productId);
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });

      const price = product.price * item.quantity;
      totalPrice += price;

      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const newOrder = new OrderModel({
      user: req.user.userId,
      products: orderProducts,
      totalPrice,
    });

    await newOrder.save();

    res.json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "username Email")
      .populate("products.productId", "name price");

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user.userId }).populate("products.productId", "name price");
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { placeOrder, getAllOrders, getUserOrders, updateOrderStatus };
