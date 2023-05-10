import type { NextApiRequest, NextApiResponse } from "next";

import formData from "form-data";
import Mailgun from "mailgun.js";

// Email best practices:
// https://help.mailgun.com/hc/en-us/articles/4401814149147-Adding-A-Reply-To-Address
// https://documentation.mailgun.com/en/latest/best_practices.html

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_PRIVATE_API_KEY
});
const config = {
  domain: process.env.CONTACT_EMAIL_DOMAIN,
  from: process.env.CONTACT_EMAIL_FROM,
  recipients: process.env.CONTACT_EMAIL_RECIPIENTS.split(",")
};

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  const { name = "", email = "", message = "" } = req.body || {};
  try {
    // See: https://github.com/mailgun/mailgun.js
    await mg.messages.create(config.domain, {
      from: `${name} <${config.from}>`,
      "h:Reply-To": `${name} <${email}>`,
      to: config.recipients,
      subject: "sandiplewis.com contact form submission",
      text: message
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ message: "success" });
}
