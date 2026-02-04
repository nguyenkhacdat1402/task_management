const nodemailer = require("nodemailer");

module.exports.sendMail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS
      },
    });

    const info = await transporter.sendMail({
      from: '"Your App" <nguyenkhacdatt396@gmail.com>',
      to: email,
      subject: subject,
      html: html,
    });

    return info;
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    throw error;
  }
};
