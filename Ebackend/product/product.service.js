import { Product } from "./product.model.js";
import {
  addProductValidationSchema,
  paginationDetailValidationSchema,
} from "./product.validation.js";
import mongoose from "mongoose";

// addProduct
export const addProduct = async (req, res) => {
  //   extract product from req.body
  const newProduct = req.body;

  //   validate product using Joi
  try {
    await addProductValidationSchema.validateAsync(newProduct);
  } catch (error) {
    //   if validation fail, terminate
    return res.status(400).send({ message: error.message });
  }

  //   add seller id
  newProduct.sellerId = req.loggedInUser._id;

  // create new product
  await Product.create(newProduct);

  // send response
  return res.status(201).send({ message: "Product is added successfully." });
};

//delete product
export const deleteProduct = async (req, res) => {
  // extract id from params
  const productId = req.params.id;

  // validate id for mongo id validity
  const isValidMongoId = mongoose.Types.ObjectId.isValid(productId);

  // if not valid mongo id, terminate
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product
  const product = await Product.findOne({ _id: productId });

  // if, not product, terminate

  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // check for product ownership
  // loggedInUser id must match with product's sellerId
  const isOwnerOfProduct = product.sellerId.equals(req.loggedInUser._id);

  // if no match, not allowed to delete
  if (!isOwnerOfProduct) {
    return res
      .status(403)
      .send({ message: "You are not owner of this product." });
  }

  // delete product
  await Product.deleteOne({ _id: productId });

  // send response
  return res.status(200).send({ message: "Product deleted successfully." });
};

//Product Details
export const productDetails = async (req, res) => {
  // extract id from params
  const productId = req.params.id;

  // check for mongo id validity
  const isValidMongoId = mongoose.Types.ObjectId.isValid(productId);

  // if not valid, terminate
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product
  const product = await Product.findOne({ _id: productId });

  // if not product, terminate
  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // return product
  return res.status(200).send(product);
};

//Seller Products
export const sellerProducts = async (req, res) => {
  // extract pagination details from req.body
  const paginationDetails = req.body;

  //validate pagination details
  try {
    await paginationDetailValidationSchema.validateAsync(paginationDetails);
  } catch (error) {
    // if not valid, terminate
    return res.status(400).send({ message: error.message });
  }

  // calculate skip
  const skip = (paginationDetails.page - 1) * paginationDetails.limit;

  // start find query
  const products = await Product.aggregate([
    {
      $match: {
        sellerId: req.loggedInUser._id,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: paginationDetails.limit,
    },
    {
      $project: {
        name: 1,
        price: 1,
        company: 1,
        description: 1,
        category: 1,
        image: 1,
        freeShipping: 1,
      },
    },
  ]);

  // total products
  const totalMatchingProduct = await Product.find({
    sellerId: req.loggedInUser._id,
  }).count();

  // page calculation
  const totalPage = Math.ceil(totalMatchingProduct / paginationDetails.limit);

  return res.status(200).send({ products, totalPage });
};

//Buyer Product
export const buyerProducts = async (req, res) => {
  // extract pagination details from req.body
  const paginationDetails = req.body;

  //validate pagination details
  try {
    await paginationDetailValidationSchema.validateAsync(paginationDetails);
  } catch (error) {
    // if not valid, terminate
    return res.status(400).send({ message: error.message });
  }

  // calculate skip
  // skip=(page-1)* limit
  const skip = (paginationDetails.page - 1) * paginationDetails.limit;

  const products = await Product.aggregate([
    {
      $match: {},
    },
    {
      $skip: skip,
    },
    {
      $limit: paginationDetails.limit,
    },
    {
      $project: {
        name: 1,
        price: 1,
        company: 1,
        description: 1,
        category: 1,
        freeShipping: 1,
        image: 1,
      },
    },
  ]);

  // calculate total page
  const totalProducts = await Product.find({}).count();

  const totalPage = Math.ceil(totalProducts / paginationDetails.limit);

  return res.status(200).send({ products, totalPage });
};

//edit product
export const editProduct = async (req, res) => {
  const productId = req.params.id;
  const newValues = req.body;

  // validate id for mongo id validity
  const isValidMongoId = mongoose.Types.ObjectId.isValid(productId);

  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // validate newValues from req.body

  try {
    await addProductValidationSchema.validateAsync(newValues);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  // check for product existence using productId
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // check if logged in user is owner of product
  const isOwnerOfProduct = product.sellerId.equals(req.loggedInUser._id);

  if (!isOwnerOfProduct) {
    return res
      .status(403)
      .send({ message: "You are not owner of this product." });
  }

  // update product
  await Product.updateOne({ _id: productId }, newValues);

  return res.status(200).send({ message: "Product updated successfully." });
};
