import { Router } from "express";
import { Login, Register } from "./auth.controller.js";
import { LoginSchema, RegisterSchema } from "./auth.validate.js";
import {validate} from '../../middleware/validation.middleware.js'

const router = Router();

router.post('/register',validate(RegisterSchema),Register)
router.post('/login',validate(LoginSchema),Login)



export default router;
