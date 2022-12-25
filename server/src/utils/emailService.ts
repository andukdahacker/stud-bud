import nodemailer from "nodemailer";
import {
  EMAIL_VERIFICATION_PREFIX,
  EMAIL_VERIFICATION_SUBJECT,
  FORGOT_PASSWORD_EMAIL_SUBJECT,
  FORGOT_PASSWORD_PREFIX,
} from "../constants";
import { Context } from "../context";
import { v4 } from "uuid";
import { BASE_URL } from "../config";

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

export const sendIMail = async (
  ctx: Context,
  userId: string,
  email: string,
  options: "verifyEmail" | "forgotPassword"
) => {
  const token = v4();
  const key =
    options === "verifyEmail"
      ? EMAIL_VERIFICATION_PREFIX + token
      : options === "forgotPassword"
      ? FORGOT_PASSWORD_PREFIX + token
      : "";

  const expiringTime = 1000 * 60 * 60;

  await ctx.redis.set(key, userId, "EX", expiringTime);

  if (options === "verifyEmail") {
    const emailVerificationURL = `${BASE_URL}/verify-email/${token}`;

    const message = `
      <h1>Thank you for signing up!</h1>
      <p>Click the link below to confirm your email address</p>
      <a href=${emailVerificationURL} clicktracking=off>${emailVerificationURL}</a>
      `;

    await sendMail(email, EMAIL_VERIFICATION_SUBJECT, message);
  } else if (options === "forgotPassword") {
    const changePasswordURL = `${BASE_URL}/change-password/${token}`;

    const message = `
    <h1>You have requested a password reset</h1>
    <p>Click the link below to continue the process</p>
    <a href=${changePasswordURL} clicktracking=off>${changePasswordURL}</a>
    `;
    await sendMail(email, FORGOT_PASSWORD_EMAIL_SUBJECT, message);
  }
};
