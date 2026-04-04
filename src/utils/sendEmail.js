import sgMail from "@sendgrid/mail";
import { config } from "../config/env.js";

sgMail.setApiKey(config.sendgridApiKey);

const sendMail = async (options) => {
  const msg = {
    to: options.email,
    from: config.emailFrom, // MUST be verified in SendGrid
    subject: options.subject,
    text: options.message,
    html: `
  <div style="background-color:#F6F5F5;padding:2%;margin:2%;text-align:center">
    <img src="https://yourdomain.com/logo.png" width="120" style="border-radius:50%" />
    <h1>${options.subject}</h1>
    <p>${options.message}</p>
  </div>
`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error);
    throw error;
  }
};

export default sendMail;
