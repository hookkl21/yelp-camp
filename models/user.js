const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
//plugin adds on into UserSchema (adds usernam/password shcema)
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
