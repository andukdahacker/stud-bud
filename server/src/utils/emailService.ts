import nodemailer from "nodemailer";
import {
  EMAIL_VERIFICATION_PREFIX,
  EMAIL_VERIFICATION_SUBJECT,
  FORGOT_PASSWORD_EMAIL_SUBJECT,
  FORGOT_PASSWORD_PREFIX,
} from "../constants";
import { Context } from "src/context";
import { v4 } from "uuid";

const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE as string,
    auth: {
      user: process.env.EMAIL_USERNAME as string,
      pass: process.env.EMAIL_PASSWORD as string,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL_FROM as string,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export const sendVerificationEmail = async (
  ctx: Context,
  userId: string,
  email: string
) => {
  const token = v4();
  const key = EMAIL_VERIFICATION_PREFIX + token;

  const expiringTime = 1000 * 60 * 60;

  await ctx.redis.set(key, userId, "EX", expiringTime);

  const emailVerificationURL = `http://localhost:3000/email-verify/${token}`;

  const message = `
      <h1>Thank you for signing up!</h1>
      <p>Click the link below to confirm your email address</p>
      <a href=${emailVerificationURL} clicktracking=off>${emailVerificationURL}</a>
      `;

  await sendMail(email, EMAIL_VERIFICATION_SUBJECT, message);
};

export const sendForgotPasswordEmail = async (
  ctx: Context,
  userId: string,
  email: string
) => {
  const token = v4();
  const expiringTime = 1000 * 60 * 60;
  const key = FORGOT_PASSWORD_PREFIX + token;

  await ctx.redis.set(key, userId, "EX", expiringTime);

  const changePasswordURL = `http://localhost:3000/changepassword/${token}`;

  const message = `
    <h1>You have requested a password reset</h1>
    <p>Click the link below to continue the process</p>
    <a href=${changePasswordURL} clicktracking=off>${changePasswordURL}</a>
    `;
  await sendMail(email, FORGOT_PASSWORD_EMAIL_SUBJECT, message);
};
