"use server";

import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { VerifyEmail } from "@/components/templates/email-verify";

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const SEND_VERIFICATION_EMAIL = async () => {
  const emailHtml = render(VerifyEmail());

  const options = {
    from: "apbnscoutsit@gmail.com",
    to: "anichuranis1000@gmail.com",
    subject: "Account Verification",
    html: emailHtml,
  };

  await transporter.sendMail(options);

  return true;
};
