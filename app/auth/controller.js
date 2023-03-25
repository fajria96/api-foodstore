const User = require("../user/model");

const register = async (req, res, next) => {
  try {
    const payload = req.body;
    let user = new User(payload);
    await user.save();
    return res.json(user);
  } catch (err) {
    // (1) Cek kemungkinan kesalahan tehadap validasi
    if (err && err.name === "ValidatinError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    // (2) Error lainnya
    next(err);
  }
};

module.exports = {
  register,
};
