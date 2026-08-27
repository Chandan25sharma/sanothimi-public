import { getMongoClient } from '@/lib/mongodb';
import { sendContactEmail } from '@/lib/mailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let body: { from_name?: string; from_email?: string; subject?: string; message?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { from_name, from_email, subject, message, source } = body;

  if (!from_name || !from_email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  try {
    await sendContactEmail({ from_name, from_email, subject, message });
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 502 });
  }

  // Best-effort submission log — never blocks or fails the request if Mongo isn't configured.
  try {
    const client = getMongoClient();
    if (client) {
      const db = (await client).db();
      await db.collection('submissions').insertOne({
        from_name,
        from_email,
        subject,
        message,
        source: source || 'unknown',
        createdAt: new Date(),
      });
    }
  } catch (err) {
    console.error('Failed to log submission to MongoDB:', err);
  }

  return NextResponse.json({ ok: true });
}
