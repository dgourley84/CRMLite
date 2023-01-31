import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import otpGenerator from "otp-generator";
import User from "../models/User.js";
import ENV from "../utils/jwtConfig.js";



//Middleware for verify user
export async function verifyUser(req, res, next) {
    try {
        const { email } = req.method == "GET" ? req.query : req.body;
        // check the user existance
        let exist = await User.findOne({ email });
        if (!exist) return res.status(404).send({ error: "Cannot find User!" });
        next();

    } catch (error) {
        return res.status(400).send({ error: "Authentication Error" });
    }
}


/**POST http://localhost:5001/home/register
 * @param {
 * "name":"example123",
 * "email":"test@email.com",
 * "password":"test1",
 * "city": "brisbane",
 * "state": "QLD",
 * "country":"AU",
 * "occupation": "Accountant",
 * "phoneNumber": "1234567890",
 * "role": "user"
 * }
 */
export async function register(req, res) {
    try {
        const { email, password, name } = req.body;

        //check the existing user
        const existEmail = new Promise((resolve, reject) => {
            User.findOne({ email }, function (err, email) {
                if (err) reject(new Error(err))
                if (email) reject({ error: "Please use unique email" });
                resolve();
            })
        });

        Promise.all([existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            const user = new User({
                                name,
                                email,
                                password: hashedPassword,
                            });
                            //return save result as a reposone
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Registeration Successful" }))
                                .catch(error => res.status(500).send({ msg: "this is where it is failing" }))
                        }).catch(error => {
                            return res.status(500).send({
                                error: "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })

    } catch (error) {
        return res.status(500).send(error);
    }
}

/**POST http://localhost:5001/home/login
 * @param {
* "email":"test@email.com"
* "password":"test1"
* }
*/
export async function login(req, res) {
    const { email, password } = req.body;
    try {

        User.findOne({ email })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) return res.status(400).send({ error: "Does not have password" })

                        //create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            email: user.email
                        }, ENV.JWT_SECRET, { expiresIn: "24h" });

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            email: user.email,
                            token
                        })

                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Email not found" });
            })

    } catch (error) {
        return res.staus(500).send({ error })
    }
}

/**GET http://localhost:5001/home/user/test@email.com*/
export async function getUser(req, res) {
    const { email } = req.params;
    try {
        if (!email) return res.status(501).send({ error: "Invalid Email" });
        User.findOne({ email }, function (err, user) {
            if (err) return res.status(500).send({ err });
            if (!user) return res.status(501).send({ error: "Couldnt find the user" })

            //Remove password from user
            //mongoose return unnecessary data with object so convert it into JSON
            const { password, ...rest } = Object.assign({}, user.toJSON());
            return res.status(201).send(rest);
        });
    } catch (error) {
        res.status(404).json({ message: "Cannot find User Data" });
    }
}

/**PUT http://localhost:5001/home/updateuser
 * @param {
* "email":"test@email.com"
* }
* body: {
* name: "",
* city: "",
* state: "",
* country:"",
* occupation: "",
* phoneNumber: "",
* role: "",
* }
*/
export async function updateUser(req, res) {
    try {
        const { userId } = req.user;
        const body = req.body;

        //check if there is a userId in the token body
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized access. User not found in request." });
        }
        //search DB to find user by ID.
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found in the database." });
        }

        // update the data
        const updateResult = await User.updateOne({ _id: userId }, body);
        if (!updateResult) {
            return res.status(500).json({ error: "Failed to update user. Internal server error." });
        }

        return res.status(200).json({ msg: "User updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update user. Internal server error." });
    }
}





/**GET http://localhost:5001/home/generateOTP*/
export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

    res.status(201).send({ code: req.app.locals.OTP });
}

/**GET http://localhost:5001/home/verifyOTP*/
export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; //reset the OTP valuue
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verified successfully' })
    }
    return res.status(400).send({ error: "Invalid OTP" })
}

//succesfully redirect user when OTP is valid
/**GET http://localhost:5001/home/createResetSession*/
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false; //allow acces to this route only once
        return res.status(201).send({ msg: 'Access Granted' })
    }
    return res.status(440).send({ error: "Session expired" })
}

/**PUT http://localhost:5001/home/resetPassword*/
export async function resetPassword(req, res) {
    try {

        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired" })

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: "Email not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne({ email: user.email }, { password: hashedPassword });
        req.app.locals.resetSession = false; //reset the session
        return res.status(201).send({ msg: "Password Updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Failed to reset password" });
    }
}