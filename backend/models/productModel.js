const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "This Product name is already taken"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
      required: [true, "Please provide product name"],
    },
    slug: String,
    stock: {
      type: Number,
      required: [true, "Please provide product quantity"],
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating must be above 0.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.66666 => 46.6666 => 47 => 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      // price should store in paise
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },

    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    imageCover: {
      type: String,
    },
    images: [String],
    brand: {
      type: String,
      required: [true, "Please provide product brand"],
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
    },
    sellers: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    secretProduct: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ price: 1 });
productSchema.virtual("priceInRupees").get(function () {
  return this.price / 100;
});

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "productRef",
  localField: "_id",
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.pre(/^find/, function (next) {
  // here this is query object
  this.find({ secretProduct: { $ne: true } });

  this.start = Date.now();
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sellers",
    select: "-__v -passwordChangedAt -role",
  });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
