const { query } = require("express");
const Product = require("../models/Product");
const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.service");

module.exports.getProducts = async (req, res, next) => {
  try {
    // const products = await Product.where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gte(10);

    let filters = { ...req.query };

    // mongodb operators
    // gt/gte/lt/lte/nte
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte|ne)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);

    // short , page , limit ->exclude
    const excludesField = ["sort", "page", "limit"];

    // console.log("Original object", req.query);
    // console.log("Query object", queryObject);

    excludesField.forEach((field) => delete filters[field]);

    const queries = {};
    if (req.query.sort) {
      //price,quantity => 'price,quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    const products = await getProductService(filters, queries);

    res.status(200).json({
      status: "Success",
      message: "Got the data Successfully",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get data",
      error: error.message,
    });
  }
};

module.exports.createProduct = async (req, res, next) => {
  try {
    // save
    // instance method

    const result = await createProductService(req.body);

    result.logger();

    // create
    // const result = await Product.create(req.body);
    res.status(200).json({
      status: "Success",
      message: "Inserted product Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.updatePorductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully Updated the product",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProductById = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully Updated the product",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Coudldn't update the product",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductByIdService(id);

    // if (!result.deletedCount) {
    //   res.status(400).json({
    //     status: "Failed",
    //     error: "Couldn't delete the product",
    //   });
    // }

    res.status(200).json({
      status: "success",
      message: "delete successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Failed to delete data",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      status: "success",
      message: "Succssfully deleted the given products",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't deleted the given product",
      error: error.message,
    });
  }
};
