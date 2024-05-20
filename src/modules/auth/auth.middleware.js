import { AppError } from "../../../utils/error.handler.js"
import jwt from 'jsonwebtoken'
// authenticate
export const authenticate = (req,res,next)=>{
    const token = req.header('token')

    if (!token || !token.startsWith('Bearer'))
		throw new AppError('Unauthorized', 401)

    const bearerToken = token.split(" ")[1]
    
    try{
        const decoded = jwt.verify(bearerToken ,process.env.JWT_SECRET , {expiresIn:process.env.JWT_EXPIRES_IN})
        req.user = decoded
        next()
    }catch(err){
     throw new AppError(err.message , 498)
    }
}

// authorize

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) { 
        return next(new AppError('Forbidden', 403));
      }
      next();
    };
  };