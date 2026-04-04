import sgMail from "@sendgrid/mail";
import { config } from "../config/env.js";

sgMail.setApiKey(config.sendgridApiKey);

const receiveEmail = async (options) => {
  const msg = {
    to: config.emailUsername, // your inbox
    from: config.emailFrom,   // MUST be verified in SendGrid
    replyTo: options.email,   // 👈 key replacement for "from"
    subject: `[Contact Form] ${options.subject}`,
    text: options.message,
    html: `
      <div style="background-color:#F6F5F5;padding:2%;margin:2%">
        <h2>${options.subject}</h2>
        <p>${options.message}</p>
        <hr/>
        <p><strong>Sender Email:</strong> ${options.email}</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Email received successfully");
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error);
    throw error;
  }
};

export default receiveEmail;
