export interface ContactFormPayload {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  source?: string;
  hp?: string; // honeypot — real visitors never fill this in
  ts?: number; // Date.now() when the form was rendered, for a bot-speed check
}

export async function sendContactForm(payload: ContactFormPayload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || 'Failed to send message.');
  }
}
