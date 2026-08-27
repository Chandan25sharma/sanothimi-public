export interface ContactFormPayload {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  source?: string;
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
