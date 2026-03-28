import { useState } from 'react'

const initialValues = {
  inquiryType: 'financial-donation',
  name: '',
  organization: '',
  email: '',
  phone: '',
  message: '',
  website: '',
}

function DonationInquiryForm() {
  const [values, setValues] = useState(initialValues)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setIsSubmitting(true)
    setStatus({ type: 'pending', message: 'Sending...' })

    try {
      const response = await fetch('/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong.')
      }

      setValues(initialValues)
      setStatus({
        type: 'success',
        message: 'Your inquiry has been sent. A BSAR team member will follow up by email.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.message || 'We could not send your inquiry right now. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="donation-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <div className="donation-form-header">
        <p className="donation-form-kicker">Donation Inquiry</p>
        <h3>Contact the BSAR team</h3>
        <p>
          Required fields are marked with an asterisk.
        </p>
      </div>

      <div className="donation-form-grid">
        <label className="form-field form-field-wide">
          <span>Inquiry type *</span>
          <select
            name="inquiryType"
            value={values.inquiryType}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          >
            <option value="financial-donation">Financial donation</option>
            <option value="corporate-sponsorship">Corporate sponsorship</option>
            <option value="in-kind-support">In-kind equipment or service support</option>
            <option value="fundraising-partnership">Fundraising or event partnership</option>
            <option value="general-question">General donation question</option>
          </select>
        </label>

        <label className="form-field">
          <span>Name *</span>
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder="Your full name"
            autoComplete="name"
            disabled={isSubmitting}
            required
          />
        </label>

        <label className="form-field">
          <span>Organization</span>
          <input
            name="organization"
            type="text"
            value={values.organization}
            onChange={handleChange}
            placeholder="Company, group, or organization"
            autoComplete="organization"
            disabled={isSubmitting}
          />
        </label>

        <label className="form-field">
          <span>Email *</span>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="name@example.com"
            autoComplete="email"
            disabled={isSubmitting}
            required
          />
        </label>

        <label className="form-field">
          <span>Phone</span>
          <input
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder="Optional"
            autoComplete="tel"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <label className="form-field">
        <span>Message</span>
        <small className="form-helper">
          Include anything helpful, such as donation goals, sponsorship details,
          timelines, or questions for our team.
        </small>
        <textarea
          name="message"
          rows="5"
          value={values.message}
          onChange={handleChange}
          placeholder="Tell us how you would like to support BSAR and any details we should know."
          disabled={isSubmitting}
        />
      </label>

      <label className="sr-only" aria-hidden="true">
        <span>Website</span>
        <input
          name="website"
          type="text"
          value={values.website}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
          disabled={isSubmitting}
        />
      </label>

      <div className="donation-form-actions">
        <button className="button donation-submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}
        </button>

        {status.type !== 'idle' ? (
          <p
            className={`form-status form-status-${status.type}`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  )
}

export default DonationInquiryForm
