import Product from "../models/productModel.js";

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal server error",
  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCT_ALREADY_EXISTS: (name) => `Product ${name} already exists`,
  NO_PRODUCTS: "There are no products",
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    if (products.length === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.NO_PRODUCTS });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error });
  }
};

export const create = async (req, res) => {
  try {
    const productData = new Product(req.body);
    const { name } = productData;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).json({ message: ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS(name) });
    }
    const savedProduct = await productData.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error });
  }
};

export const findOne = async (req, res) => {
  try {
    const name = req.params.name.trim().toLowerCase();
    const productExist = await Product.findOne({ name });
    if (!productExist) {
      return res.status(400).json({ message: `${name} not exist` });
    }
    res.status(200).json(productExist);
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
    }
    await Product.findByIdAndDelete(id);
    res.status(201).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error });
  }
};
