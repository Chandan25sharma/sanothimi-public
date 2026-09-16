import nodemailer, { type Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendContactEmail(payload: {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}) {
  const { from_name, from_email, subject, message } = payload;
  await getTransporter().sendMail({
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo: from_email,
    subject,
    text: `From: ${from_name} <${from_email}>\n\n${message}`,
  });
}
