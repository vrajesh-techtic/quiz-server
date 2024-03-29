const nodemailer = require("nodemailer");
const quizEmailTemplate = require("./emailTemplate");
const env = require("dotenv").config();

const email = process.env.SENDER_EMAIL;
const pwd = process.env.SENDER_EMAIL_APP_PWD;

// Function to send email
function demoEmail(recepientEmail, otp) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: pwd,
      },
    });

    const mail_configs = {
      from: process.env.SENDER_EMAIL,
      to: recepientEmail,
      subject: "Quizify OTP Verification",
      text: "Your OTP is ...",
      html: quizEmailTemplate(JSON.stringify(otp)),
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error.message);
        return reject({
          status: false,
          message: "An error occured in sending email!",
        });
      }

      console.log("Email Sent");
      return resolve({
        status: true,
        message: "OTP sent to email !",
        statusCode: 200,
      });
    });
  });
}

// This function is called when '/send-email' api is called
const sendEmail = async (req, res) => {
  const otp = req.body.otp;
  const recepientEmail = req.body.userEmail;
  const resp = await demoEmail(recepientEmail, otp);
  return res.send(resp);
};

module.exports = { sendEmail, demoEmail };
