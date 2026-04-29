import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // ini dpt dri google Simple Mail Transfer Protocol
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,     //ini di env, keknya harus ganti sesuai dengan email yang akan kirim
    pass: process.env.EMAIL_PASS,     //ini harus login dari google agak ribet (app password)
  },
});
