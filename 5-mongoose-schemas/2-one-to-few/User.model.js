const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Sub Schema
const SocialMediaSchema = new Schema({ 
  platform: String,
  link: String
});
// example entry: { platform: "twitter", link: "https://twitter.com/myProfileId" }

// ONE TO FEW Relation
// we can have few, limited social media profile links
// so we can nest it directly in the user (not in separate collection)
const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  socialMedia: [SocialMediaSchema] // we can have an array of social media profile links for the user 
});

const User = model("User", UserSchema);

module.exports = User;
