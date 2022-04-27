import nodemailer from "nodemailer";

export const sendMail = async (
  to: string,
  subject: string,
  html: string
): Promise<boolean> => {
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

  let sendMailInfo = await transporter.sendMail(mailOptions);
  if (!sendMailInfo.rejected) return false;
  return true;
};
