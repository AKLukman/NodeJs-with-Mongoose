const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middlewares
app.use(express.json());
app.use(cors());

// Schema->Model->Query
// Schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      // trim extra space remove kore
      trim: true,
      unique: [true, "Name must be unique"],
      minLenght: [3, "Name must be at least 3 characters"],
      maxLenght: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,

      enum: {
        values: ["Kg", "Litre", "Pcs"],
        message: "unit value can't be {VALUE} must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be neagative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      required: true,

      enum: {
        values: ["In-stock", "Out-of-stock", "Discontinued"],
        message: "Status can't be {VALUE}",
      },
    },
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   updatedAt:{
    //     type: Date,
    //     default: Date.now,
    //   }

    // r ekta document er reference
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },

    // embaded system
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  { timestamps: true }
);

// Mongoose middlewares for saving data : pre / post

productSchema.pre("save", function (next) {
  console.log("Before saving data");
  // this ->
  if (this.quantity == 0) {
    this.status = "Out-of-stock";
  }
  next();
});

// Post middleware
// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// });

productSchema.methods.logger = function () {
  console.log(`Data save for ${this.name}`);
};

// Schema->Model->Query

// Model
const Product = mongoose.model("Product", productSchema);

app.post("/api/v1/product", async (req, res, next) => {
  try {
    // save
    // instance method
    const product = new Product(req.body);

    const result = await product.save();

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
});

app.get("/api/v1/product", async (req, res, next) => {
  try {
    const products = await Product.find({
      $or: [{ _id: "638798626e5cc210ec6d02c5" }, { name: "dhhd" }],
    });
    res.status(200).json({
      status: "Success",
      message: "Successfully got the data",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get data",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Route is working");
});

module.exports = app;
