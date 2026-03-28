import { useEffect, useRef, useState } from 'react'
import {
  getListingFormValues,
  validateListing,
} from '../lib/listingUtils'

function AdminListingForm({
  initialListing,
  isSaving,
  isUploading,
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState(getListingFormValues(initialListing))
  const [selectedFile, setSelectedFile] = useState(null)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  useEffect(() => {
    setValues(getListingFormValues(initialListing))
    setSelectedFile(null)
    setErrors({})

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [initialListing])

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setValues((current) => {
      const nextValues = { ...current, [name]: nextValue }

      if (name === 'type' && value === 'agm') {
        nextValues.price_text = ''
        nextValues.cta_text = ''
        nextValues.cta_link = ''
      }

      return nextValues
    })
  }

  function handleFileChange(event) {
    setSelectedFile(event.target.files?.[0] || null)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateListing(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    await onSubmit(values, selectedFile)
  }

  const isEvent = values.type === 'event'

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <div className="donation-form-header">
        <p className="donation-form-kicker">
          {initialListing ? 'Edit Listing' : 'New Listing'}
        </p>
        <h3>{initialListing ? 'Update event or AGM' : 'Create event or AGM'}</h3>
        <p>Events and AGMs share one form, with event-only fields shown when needed.</p>
      </div>

      <div className="admin-form-grid">
        <label className="form-field">
          <span>Type *</span>
          <select name="type" value={values.type} onChange={handleChange} disabled={isSaving}>
            <option value="event">Event</option>
            <option value="agm">AGM</option>
          </select>
        </label>

        <label className="form-field">
          <span>Title *</span>
          <input
            name="title"
            type="text"
            value={values.title}
            onChange={handleChange}
            disabled={isSaving}
            required
          />
          {errors.title ? <small className="form-error">{errors.title}</small> : null}
        </label>

        <label className="form-field">
          <span>Start date and time *</span>
          <input
            name="starts_at"
            type="datetime-local"
            value={values.starts_at}
            onChange={handleChange}
            disabled={isSaving}
            required
          />
          {errors.starts_at ? <small className="form-error">{errors.starts_at}</small> : null}
        </label>

        <label className="form-field">
          <span>Location *</span>
          <input
            name="location"
            type="text"
            value={values.location}
            onChange={handleChange}
            disabled={isSaving}
            required
          />
          {errors.location ? <small className="form-error">{errors.location}</small> : null}
        </label>

        <label className="form-field">
          <span>Map link</span>
          <input
            name="map_link"
            type="url"
            value={values.map_link}
            onChange={handleChange}
            placeholder="https://maps.google.com/..."
            disabled={isSaving}
          />
        </label>

        <label className="form-field">
          <span>Image upload</span>
          <input
            ref={fileInputRef}
            name="image_file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSaving || isUploading}
          />
        </label>

        {isEvent ? (
          <label className="form-field">
            <span>Price</span>
            <input
              name="price_text"
              type="text"
              value={values.price_text}
              onChange={handleChange}
              placeholder="$25 per ticket"
              disabled={isSaving}
            />
          </label>
        ) : null}

        {isEvent ? (
          <label className="form-field">
            <span>CTA button text</span>
            <input
              name="cta_text"
              type="text"
              value={values.cta_text}
              onChange={handleChange}
              placeholder="Register now"
              disabled={isSaving}
            />
            {errors.cta_text ? <small className="form-error">{errors.cta_text}</small> : null}
          </label>
        ) : null}

        {isEvent ? (
          <label className="form-field">
            <span>CTA link</span>
            <input
              name="cta_link"
              type="url"
              value={values.cta_link}
              onChange={handleChange}
              placeholder="https://..."
              disabled={isSaving}
            />
            {errors.cta_link ? <small className="form-error">{errors.cta_link}</small> : null}
          </label>
        ) : null}

        <label className="form-field form-field-wide">
          <span>Description</span>
          <textarea
            name="description"
            rows="5"
            value={values.description}
            onChange={handleChange}
            disabled={isSaving}
          />
        </label>

        <label className="form-field form-field-wide">
          <span>More information</span>
          <textarea
            name="more_info"
            rows="4"
            value={values.more_info}
            onChange={handleChange}
            disabled={isSaving}
          />
        </label>

        <label className="form-checkbox">
          <input
            name="is_published"
            type="checkbox"
            checked={values.is_published}
            onChange={handleChange}
            disabled={isSaving}
          />
          <span>Published</span>
        </label>
      </div>

      <div className="donation-form-actions">
        <button className="button donation-submit-button" type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : initialListing ? 'Update Listing' : 'Create Listing'}
        </button>

        {initialListing ? (
          <button
            className="button-secondary donation-submit-button"
            type="button"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel Editing
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default AdminListingForm
