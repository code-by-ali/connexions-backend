// routes/email.js
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    const transporter = nodemailer.createTransport({
      host: "mail.globalproperties.ae",
      port: 465,           // Changed to number
      secure: true,        // Changed to boolean
      auth: {
        user: "contact@globalproperties.ae",
        pass: "V10Y+,i%&9*,VX+=",
      },
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
      }
    });

    // Verify connection before sending
    await transporter.verify();

    const info = await transporter.sendMail({
      from: '"Global Properties" <contact@globalproperties.ae>', // Added sender name
      to,
      subject,
      html,
      text: html.replace(/<[^>]*>/g, ''), // Add plain text version
    });

    console.log("Email sent successfully:",  to);

    res.status(200).json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response || error.code, // More debugging info
    });
  }
});

module.exports = router;