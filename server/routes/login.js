import express from "express";
const router = express.Router();

//import all controllers
import * as controller from '../controllers/login.js';
import { registerMail } from "../controllers/mailer.js";
import Auth, { localVariables } from "../utils/authMiddleWare.js";

//Post methods
router.route("/register").post(controller.register); //register user
router.route("/registerMail").post(registerMail); // send the email
router.route("/authenticate").post(controller.verifyUser, (req, res) => res.end()); // authenticate the user
router.route("/login").post(controller.verifyUser, controller.login); //login in app


//Get methods
router.route("/user/:email").get(controller.getUser); //get user with email
router.route("/generateOTP").get(controller.verifyUser, localVariables, controller.generateOTP); //generate random OTP
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route("/createResetSession").get(controller.createResetSession) // reset all the variables



//Put methods
router.route("/updateUser").put(Auth, controller.updateUser) // is used to update the user profile
router.route("/resetPassword").put(controller.verifyUser, controller.resetPassword) // use to rest password



export default router;