// routes/email.js
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { name, email, purpose, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "globalproperties.ae",
      port: 465,
      secure: true,
      auth: {
        user: "contact@globalproperties.ae",
        pass: "V10Y+,i%&9*,VX+=",
      },
    });

    // Prepare email subject
    const subject = purpose
      ? `Contact Form: ${purpose} - ${name}`
      : `Contact Form: Message from ${name}`;

    // Simple text email content
    const text = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${purpose ? `Purpose: ${purpose}` : ""}

Message:
${message}

This email was sent from GlobalProperties.ae contact form.
    `;

    // Send email
    const info = await transporter.sendMail({
      from: '"GlobalProperties Contact" <contact@globalproperties.ae>',
      to: `"nikhil@connexionsmobile.com <nikhil@connexionsmobile.com>"`, // Send to your own email
      subject: subject,
      text: text,
      replyTo: email, // Allow easy reply to the sender
    });

    console.log("✅ Email sent successfully:", info.messageId);

    res.status(200).json({
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
      error: error.message,
    });
  }
});

module.exports = router;
