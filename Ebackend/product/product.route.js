import express from "express";
import { isBuyer, isSeller, isUser } from "../auth/auth.middleware.js";
import {
  addProduct,
  buyerProducts,
  deleteProduct,
  editProduct,
  productDetails,
  sellerProducts,
} from "./product.service.js";

const router = express.Router();

// add product
router.post("/product/add", isSeller, addProduct);

// delete product
router.delete("/product/delete/:id", isSeller, deleteProduct);

// get product details
router.get("/product/detail/:id", isUser, productDetails);

// get products
// seller point of view
router.post("/product/seller/all", isSeller, sellerProducts);

// get products
// buyer point of view
router.post("/product/buyer/all", isBuyer, buyerProducts);

// edit products
router.put("/product/edit/:id", isSeller, editProduct);
export default router;
