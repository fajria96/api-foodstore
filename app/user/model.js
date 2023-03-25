const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//instal mongoose-sequence untuk plugin auto inc
const AutoIncrement = require("mongoose-sequence")(mongoose);
//install bcrypt untuk hashing password
const bcrypt = require("bcrypt");

let userSchema = Schema(
  {
    full_name: {
      type: String,
      required: [true, "Nama harus diisi"],
      maxlength: [255, "Panjang nama harus antara 3 - 255 karakter"],
      minlegth: [3, "Panjang nama harus antara 3 - 255 karakter"],
    },

    customer_id: {
      type: Number,
    },

    email: {
      type: String,
      required: [true, "Email harus diisi"],
      maxlength: [255, "Panjang email maksimal 255 karakter"],
    },

    passsword: {
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

//plugin untuk validasi email
userSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus menggunakan email yang valid`
);

//validasi email sudah terdaftar atau belum
userSchema.path("email").validate(
  async function (value) {
    try {
      // (1) Lakukan pencarian ke _collection_ User berdasarkan email
      const count = await this.model("User").count({ email: value });
      // (2) Jika user ditemukan maka mengembalikan nilai "false"
      // Jika "false" maka validasi gagal
      // Jika "true" maka validasi berhasil
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

// Membuat fitur hashing apabila user terdaftar password akan hashing
const HASH_ROUND = 10;
// Hook sebelum disimpan jalankan function yg isinya mengembalikan callback next
// Tidak memakai arrow function agar "this" tdk menangkap secara global
userSchema.pre("save", function (next) {
  this.passsword = bcrypt.hashSync(this.passsword, HASH_ROUND);
  next();
});

// Plugin untuk auto increment customer_id
userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = model("User", userSchema);
