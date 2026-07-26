import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { emailOTP } from "better-auth/plugins";
import nodemailer from "nodemailer";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("VerifyEmail");

// Nodemailer Transporter সেটআপ
const transporter = nodemailer.createTransport({
  service: "gmail", // অথবা আপনার SMTP হোস্ট
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // sedMail এর জায়গায় sendMail হবে
        await transporter.sendMail({
          from: `"PatelEats" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Verify your email address",
          html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
        });
      },
    }),
  ],
});