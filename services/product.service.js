const Product = require("../models/Product");

exports.getProductService = async () => {
  const products = await Product.find({});
  return products;
};

exports.createProductService = async (data) => {
  const product = new Product(data);
  if (product.quantity == 0) {
    product.status = "Out-of-stock";
  }
  const result = await product.save();
  return result;
};

exports.updateProductService = async (productId, data) => {
  // We can use this way
  // const result = await Product.updateOne(
  //   { _id: productId },
  //   { $set: data },
  //   { runValidators: true }
  // );

  // Better way
  const product = await Product.findById(productId);
  const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  });
  return result;
};
