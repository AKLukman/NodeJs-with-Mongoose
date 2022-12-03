const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.route("/bulk-update").patch(productController.bulkUpdateProductById);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .patch(productController.updatePorductById)
  .delete(productController.deleteProductById);

module.exports = router;
