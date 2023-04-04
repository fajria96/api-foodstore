const { check, validationResult } = require("express-validator");
const User = require("../app/user/model");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: false,
      message: errors.array()[0].msg,
    });
  }
  next();
};

exports.validationDaftar = [
  check("email")
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already in use");
      }
      return true;
    }),
];
