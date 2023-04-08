const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");
// const sequencing = require("../config/sequencing");

let userSchema = mongoose.Schema(
  {
    customer_id: { type: Number, unique: true },
    full_name: {
      type: String,
      required: [true, "Nama harus diisi"],
      maxlength: [255, "Panjang nama harus antara 3 - 255 karakter"],
      minlength: [3, "Panjang nama harus antara 3 - 255 karakter"],
    },

    email: {
      type: String,
      required: [true, "Email harus diisi"],
      maxlength: [255, "Panjang email maksimal 255 karakter"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Harap isi email yang valid"],
    },

    password: {
      type: String,
      required: [true, "Password harus diisi"],
      maxlength: [255, "Panjang password maksimal 255 karakter"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    token: [String],
  },
  { timestamps: true }
);

// userSchema.pre("save", function (next) {
//   var doc = this;
//   mongoose
//     .model("User")
//     .updateOne(
//       {},
//       { $inc: { customer_id: 1 } },
//       { sort: { customer_id: -1 }, new: true },
//       function (err, result) {
//         if (err) throw err;
//         doc.customer_id = result.customer_id + 1;
//         next();
//       }
//     );
// });

// userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });
// userSchema.plugin(AutoIncrement);

module.exports = model("User", userSchema);
