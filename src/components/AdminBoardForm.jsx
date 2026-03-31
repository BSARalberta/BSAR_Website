import { useEffect, useRef, useState } from 'react'
import {
  getBoardMemberFormValues,
  hasBoardMemberInfo,
  validateBoardMember,
} from '../lib/boardUtils'

function AdminBoardForm({
  initialMember,
  isSaving,
  isUploading,
  onSubmit,
  onDelete,
  onDraftChange,
  onDraftFileChange,
}) {
  const [values, setValues] = useState(getBoardMemberFormValues(initialMember))
  const [selectedFile, setSelectedFile] = useState(null)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  useEffect(() => {
    const nextValues = getBoardMemberFormValues(initialMember)
    setValues(nextValues)
    setSelectedFile(null)
    setErrors({})
    onDraftChange(nextValues)
    onDraftFileChange(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [initialMember, onDraftChange, onDraftFileChange])

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setValues((current) => {
      const nextValues = {
        ...current,
        [name]: nextValue,
      }
      onDraftChange(nextValues)
      return nextValues
    })
  }

  function handleFileChange(event) {
    const nextFile = event.target.files?.[0] || null
    setSelectedFile(nextFile)
    onDraftFileChange(nextFile)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateBoardMember(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const nextValues = values.remove_image ? { ...values, image_url: '' } : values
    await onSubmit(nextValues, selectedFile)
  }

  const isOpen = !hasBoardMemberInfo(values)

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <div className="donation-form-header">
        <p className="donation-form-kicker">Board Directory</p>
        <h3>{initialMember?.id ? `Edit ${values.role || 'Position'}` : 'Create Position'}</h3>
        <p>
          Set the position title and display order. Leave the name, email, and image empty to
          show this role as open on the About page.
        </p>
      </div>

      <div className="admin-form-grid">
        <label className="form-field">
          <span>Position</span>
          <input
            name="role"
            type="text"
            value={values.role}
            onChange={handleChange}
            disabled={isSaving}
            placeholder="President"
          />
          {errors.role ? <small className="form-error">{errors.role}</small> : null}
        </label>

        <label className="form-field">
          <span>Display order</span>
          <input
            name="display_order"
            type="number"
            min="1"
            step="1"
            value={values.display_order}
            onChange={handleChange}
            disabled={isSaving}
            placeholder="1"
          />
          {errors.display_order ? (
            <small className="form-error">{errors.display_order}</small>
          ) : null}
        </label>

        <label className="form-field">
          <span>Name</span>
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            disabled={isSaving}
            placeholder="Board member name"
          />
        </label>

        <label className="form-field">
          <span>Email address</span>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            disabled={isSaving}
            placeholder="name@example.com"
          />
          {errors.email ? <small className="form-error">{errors.email}</small> : null}
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

        {values.image_url ? (
          <label className="form-checkbox form-field-wide">
            <input
              name="remove_image"
              type="checkbox"
              checked={values.remove_image}
              onChange={handleChange}
              disabled={isSaving}
            />
            <span>Remove the current image for this role</span>
          </label>
        ) : null}

        <label className="form-checkbox form-field-wide">
          <input
            name="is_acting"
            type="checkbox"
            checked={values.is_acting}
            onChange={handleChange}
            disabled={isSaving}
          />
          <span>Mark this person as acting in the role</span>
        </label>
      </div>

      <div className="donation-form-actions">
        <button className="button donation-submit-button" type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : initialMember?.id ? 'Save Position' : 'Create Position'}
        </button>

        {initialMember?.id ? (
          <button
            className="button-secondary donation-submit-button"
            type="button"
            onClick={() => onDelete(initialMember)}
            disabled={isSaving}
          >
            Delete Position
          </button>
        ) : null}

        <p className={`form-status ${isOpen ? 'form-status-pending' : 'form-status-success'}`}>
          {isOpen
            ? 'This role will display as open until a name, email, or image is added.'
            : 'This role will display as filled on the About page.'}
        </p>
      </div>
    </form>
  )
}

export default AdminBoardForm
