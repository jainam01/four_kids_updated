import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any SMTP provider
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Callback Request" <${process.env.SMTP_USER}>`,
      to: "admin@example.com", // 🔁 change to your admin email
      subject: "New Callback Request",
      text: `User ${name} has requested a callback. Email: ${email}`,
      html: `<p><strong>${name}</strong> has requested a callback.</p><p>Email: <a href="mailto:${email}">${email}</a></p>`,
    });

    return res.status(200).json({ message: "Callback request sent" });
  } catch (err) {
    return res.status(500).json({ message: "Error sending email" });
  }
}
