const express = require("express");
// const Controller = require("./../controllers/tourController");
const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");
// const reviewController = require('./../controllers/reviewController');
const router = express.Router();
const reviewRouter = require("./reviewRoutes");

// router.param('id', tourController.checkID);

router.use("/:productId/reviews", reviewRouter);

router
  .route("/top")
  .get(productController.aliasTopProducts, productController.getAllProducts);

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo("admin", "seller"),
    productController.setSellerId,
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "seller"),
    productController.actionAllowed,
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "seller"),
    productController.actionAllowed,
    productController.deleteProduct
  );

module.exports = router;
