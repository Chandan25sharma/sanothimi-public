import { getMongoClient } from '@/lib/mongodb';
import { sendContactEmail } from '@/lib/mailer';
import { after, NextResponse } from 'next/server';

export async function POST(req: Request) {
  let body: { from_name?: string; from_email?: string; subject?: string; message?: string; source?: string; hp?: string; ts?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { from_name, from_email, subject, message, source, hp, ts } = body;

  if (!from_name || !from_email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  // Spam check: the honeypot field is invisible to real visitors, and no human
  // fills the form in under 2.5s. Pretend success either way so bots don't
  // learn to work around it — just skip the actual send below.
  const isBot = Boolean(hp) || (typeof ts === 'number' && Date.now() - ts < 2500);
  if (isBot) {
    return NextResponse.json({ ok: true });
  }

  // The actual SMTP handshake and Mongo write are the slow part (can take several
  // seconds depending on the mail host). Respond to the browser immediately once the
  // request is validated, then do the slow work after the response has been sent —
  // `after()` keeps it running (including on serverless) instead of a bare
  // fire-and-forget promise that could get killed once the response returns.
  after(async () => {
    try {
      await sendContactEmail({ from_name, from_email, subject, message });
    } catch (err) {
      console.error('Failed to send contact email:', err);
    }

    // Best-effort submission log — skipped entirely if Mongo isn't configured.
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
  });

  return NextResponse.json({ ok: true });
}
