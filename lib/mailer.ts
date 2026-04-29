import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // atau SMTP lain
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,     // no-reply@email.com
    pass: process.env.EMAIL_PASS,     // app password
  },
});
