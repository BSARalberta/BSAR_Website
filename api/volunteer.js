import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function normalizeField(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function getBody(req) {
  if (!req.body) {
    return {}
  }

  if (typeof req.body === 'string') {
    return JSON.parse(req.body)
  }

  return req.body
}

function messageHtml(value) {
  return escapeHtml(value || 'Not provided').replaceAll('\n', '<br>')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured.' })
  }

  const notifyTo = process.env.VOLUNTEER_NOTIFY_EMAIL
  const fromAddress = process.env.VOLUNTEER_FROM_EMAIL

  if (!notifyTo || !fromAddress) {
    return res.status(500).json({ error: 'Volunteer email settings are missing.' })
  }

  try {
    const body = getBody(req)
    const name = normalizeField(body.name)
    const email = normalizeField(body.email).toLowerCase()
    const phone = normalizeField(body.phone)
    const message = normalizeField(body.message)
    const website = normalizeField(body.website)

    if (website) {
      return res.status(200).json({ ok: true })
    }

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone || 'Not provided')

    const internalResult = await resend.emails.send({
      from: `BSAR Website <${fromAddress}>`,
      to: [notifyTo],
      replyTo: email,
      subject: `New volunteer inquiry from ${name}`,
      html: `
        <h2>New Volunteer Inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Message:</strong><br>${messageHtml(message)}</p>
      `,
    })

    if (internalResult.error) {
      console.error('Resend volunteer internal email error:', internalResult.error)
      return res.status(500).json({ error: 'Failed to send notification email.' })
    }

    const confirmationResult = await resend.emails.send({
      from: `Badlands Search and Rescue <${fromAddress}>`,
      to: [email],
      subject: 'Thank you for your interest in volunteering with Badlands Search and Rescue',
      html: `
        <p>Hi ${safeName},</p>
        <p>Thank you for contacting Badlands Search and Rescue about volunteering with our team.</p>
        <p>We’ve received your inquiry and a team member will follow up with you soon.</p>
        <p>Best regards,<br>Badlands Search and Rescue</p>
      `,
    })

    if (confirmationResult.error) {
      console.error('Resend volunteer confirmation email error:', confirmationResult.error)
      return res.status(500).json({ error: 'Failed to send confirmation email.' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Volunteer function error:', error)
    return res.status(500).json({ error: 'Server error.' })
  }
}
