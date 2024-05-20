import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: [{
    street: String,
    city: String,
    state: String,
  }],
  phone: {
    type: String,
    required: true,
    unique: true
  },
  role:{
    type:String,
    enum:['admin','user'],
    default:'user'
  }

},{timestamps: true });;

const User = mongoose.model('User', UserSchema);

export default User