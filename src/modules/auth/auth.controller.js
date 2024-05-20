import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import { catchError } from "../../../utils/error.handler.js";


const Register = catchError(async(req,res)=>{
    const {name ,email,password,phone } = req.body
    // check if user exist 
    let user = await User.findOne({email})
    if(user) return res.status('400').json({message : 'user already exist'})
    
     // check if phone exist
    let CheckPhone = await User.findOne({phone})
    if(CheckPhone) return res.status('400').json({message : 'this phone already exist'})
   
     // hash Password
    const HashedPassword = bcrypt.hashSync(password ,+process.env.SALT)
    // create user
   user = await User.create({
    name ,email,password:HashedPassword,phone
  })

  return res.status(201).json({message : 'User Register Success'})
})


const Login = catchError(async(req,res)=>{
  const {email,password} = req.body
  
  const user = await User.findOne({email})

  if(!user || !bcrypt.compareSync(password,user.password)) return res.status(404).json({message:'user credential error ! '})

    const {_id:id ,Role ,name} = user
    const token = jwt.sign({ name, Role, id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return res.json({message: 'success login' , user , token})
})


// forgotPassword
export {
    Register,
    Login
}