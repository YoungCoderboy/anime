const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
const {
  deleteOne,
  updateOne,
  createOne,
  getAll,
  findOne,
} = require("./handleFactory");
const { uploadImage } = require("./../utils/cloudinaryUtil");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Process cover image
  const imageCoverFilename = `product-${req.params.id}-${Date.now()}-cover`;
  const img_buffer = await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("png")
    .png({ quality: 100 })
    .toBuffer();
  const uploadResult = await uploadImage(img_buffer, imageCoverFilename);
  req.body.imageCover = uploadResult.url;

  req.body.images = [];
  // 2) Process other images
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${req.params.id}-${Date.now()}-${i + 1}`;
      const buffer = await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("png")
        .png({ quality: 100 })
        .toBuffer();
      const uploadResult = await uploadImage(buffer, filename);
      req.body.images.push(uploadResult.url);
    })
  );
  next();
});
// Alias routing middleware
exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "ratingsAverage,-price";
  req.query.fields = "name,price,ratingsAverage,description imageCover";
  next();
};

exports.getAllProducts = getAll(Product);
exports.getProduct = findOne(Product, { path: "reviews" });
exports.createProduct = createOne(Product);
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
exports.setSellerId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.sellers) req.body.sellers = req.user.id;
  next();
};

exports.actionAllowed = catchAsync(async (req, res, next) => {
  if (req.user.role === "admin") return next();

  const productId = req.params.id;
  const product = await Product.findById(productId);
  console.log(product.sellers.id.toString(), req.user.id);
  if (product.sellers.id.toString() !== req.user.id) {
    return next(
      new AppError("You are not allowed to perform this action", 403)
    );
  }
  next();
});
