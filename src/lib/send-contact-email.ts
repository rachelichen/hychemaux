import 'server-only';

import nodemailer from 'nodemailer';
import { CONTACT_RECIPIENT_EMAIL } from '@/lib/contact-email';

type ContactEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  message: string;
  productId?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    const missing: string[] = [];
    if (!host) missing.push('SMTP_HOST');
    if (!user) missing.push('SMTP_USER');
    if (!pass) missing.push('SMTP_PASSWORD');
    throw new Error(`SMTP is not configured (missing: ${missing.join(', ')})`);
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: {
      user,
      pass
    },
    from: process.env.SMTP_FROM || user
  };
}

export async function sendContactEmail({
  name,
  email,
  phone,
  country,
  message,
  productId
}: ContactEmailPayload) {
  const smtp = getSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.auth
  });

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || ''],
    ['Country', country || ''],
    ['Message', message],
    ...(productId ? ([['Product ID', productId]] as const) : [])
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n\n');
  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">Website Contact Message</h2>
      <table style="border-collapse: collapse; width: 100%;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: 700; width: 140px;">${escapeHtml(label)}</td>
                <td style="padding: 8px 12px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join('')}
      </table>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: smtp.from,
      to: CONTACT_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Website Contact Message from ${name}`,
      text,
      html
    });
  } catch (sendError) {
    const err = sendError instanceof Error ? sendError : new Error(String(sendError));
    err.message = `sendMail failed (from=${smtp.from}, to=${CONTACT_RECIPIENT_EMAIL}): ${err.message}`;
    throw err;
  }
}
