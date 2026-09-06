export interface ContactFormPayload {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  source?: string;
}

// ponytail: no backend send — opens the visitor's own email client with the
// message pre-filled, so they send it themselves. Simpler than running a
// mail server, and there's nothing to go down.
export async function sendContactForm(payload: ContactFormPayload) {
  const body = `From: ${payload.from_name} <${payload.from_email}>\n\n${payload.message}`;
  const mailto = `mailto:info@sanothimi.com?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}
