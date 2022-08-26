const mongoose = require("mongoose")
const { Schema, model } = mongoose

const AddressSchema = new Schema({
  streetNr: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true, default: 'Germany' }
}, { 
  _id: false // addresses should not have an ID field if I nest them somewhere...
})

const OrderSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  deliveryAddress: AddressSchema, // optional separate delivery address
  billingAddress: AddressSchema, // optional, separate billing address
})

const Order = model("Order", OrderSchema)

module.exports = Order