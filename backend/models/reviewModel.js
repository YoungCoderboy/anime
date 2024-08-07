const mongoose = require("mongoose");
const Product = require("./productModel");
const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    userRef: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Product must belong to a user"],
    },
    productRef: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Product must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// This will prevent a user from writing multiple reviews for the same tour
reviewSchema.index({ productRef: 1, userRef: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'productRef',
  //     select: 'name'
  //   }).populate({
  //     path: 'userRef',
  //     select: 'name photo'
  //   });
  this.populate({
    path: "userRef",
    select: "name photo email",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { productRef: productId },
    },
    {
      $group: {
        _id: "$productRef",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// This is a document middleware used to update the ratingsAverage and ratingsQuantity when a review is created or saved, here this points to the current review
reviewSchema.post("save", function () {
  // this points to the current review
  this.constructor.calcAverageRatings(this.productRef);
});
// This is a query middleware used to update the ratingsAverage and ratingsQuantity when a review is updated or deleted
// In query middleware this points to the current query
reviewSchema.pre(/^findOneAnd/, async function (next) {
  // we are doing this because we need to pass the productId to the post middleware
  this.r = await this.findOne();
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.productRef);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

// POST: /tours/5c88fa8cf4afda39709c2951/reviews should like this
// GET: /tours/5c88fa8cf4afda39709c2951/reviews should like this
// GET: /tours/5c88fa8cf4afda39709c2951/reviews/ID should like this
// nested routes is best suited for parent child relationship
