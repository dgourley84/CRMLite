import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import ENV from "../utils/jwtConfig.js"

//https://ethereal.email/create
let nodeConfig = { 
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
    },
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen ({
    theme:"default",
    product : {
        name: "Mailgen",
        link: "https://mailgen.js"
    }
})

/**POST: http://localhost:5001/home/registerMail
 * 
 * @param {
 * "name":"Dallas"
 * "userEmail":"dallas.gourley@yahoo.com"
 * "text":""
 * "subject":""
 * } 
 */
export const registerMail = async (req,res) => {
    const {name, userEmail, text, subject} = req.body;

    if (!name || !userEmail) {
        return res.status(400).send({error: "Name and email are required"});
    }

    try {
        //body of email 
        var email =  {
            body: {
                name: name,
                intro: text || "Welcome to CRMLite, we are excited to have you on board",
                outro: "Need help, or have questions? Just reply to this email, we would love to help."
            }
        }
    
        var emaiBody = MailGenerator.generate(email);
    
        let message = {
            from: ENV.EMAIL,
            to: userEmail,
            subject: subject || "Signup successful",
            html: emaiBody
        }
    
        //send mail
        await sendMail(message);
        return res.status(200).send({msg: "You should receive an email from us."});
    } catch (error) {
        console.error(error);
        return res.status(500).send({error: "Failed to send email"});
    }
}

const sendMail = async (message) => {
    try {
        await transporter.sendMail(message);
    } catch (error) {
        throw error;
    }
}
