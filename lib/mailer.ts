import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS.');
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export interface ContactSubmission {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactSubmission) {
  const { SMTP_USER, CONTACT_EMAIL } = process.env;
  const to = CONTACT_EMAIL || SMTP_USER;

  await getTransporter().sendMail({
    from: `"${data.from_name}" <${SMTP_USER}>`,
    to,
    replyTo: data.from_email,
    subject: data.subject,
    text: `From: ${data.from_name} <${data.from_email}>\n\n${data.message}`,
  });
}
