import { useEffect, useRef, useState } from 'react'
import {
  formatPublicFileMeta,
  getPublicFileFormValues,
  validatePublicFile,
} from '../lib/publicFiles'

function AdminPublicFilesForm({ initialFile, isSaving, isUploading, onSubmit, onCancel }) {
  const [values, setValues] = useState(getPublicFileFormValues(initialFile))
  const [selectedFile, setSelectedFile] = useState(null)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  useEffect(() => {
    setValues(getPublicFileFormValues(initialFile))
    setSelectedFile(null)
    setErrors({})

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [initialFile])

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleFileChange(event) {
    setSelectedFile(event.target.files?.[0] || null)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validatePublicFile(values, {
      selectedFile,
      isEditing: Boolean(initialFile?.id),
    })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    await onSubmit(values, selectedFile)
  }

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <div className="donation-form-header">
        <p className="donation-form-kicker">
          {initialFile?.id ? 'Edit Public File' : 'New Public File'}
        </p>
        <h3>{initialFile?.id ? 'Update file details' : 'Upload a public file'}</h3>
        <p>
          Publish downloadable files for the Public Documents section. Files are stored in
          Supabase Storage and listed publicly on the website.
        </p>
      </div>

      <div className="admin-form-grid">
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

        <label className="form-field form-field-wide">
          <span>Description</span>
          <textarea
            name="description"
            rows="4"
            value={values.description}
            onChange={handleChange}
            disabled={isSaving}
            placeholder="Optional short summary shown on the public page."
          />
        </label>

        {!initialFile?.id ? (
          <label className="form-field form-field-wide">
            <span>File upload *</span>
            <input
              ref={fileInputRef}
              name="public_file"
              type="file"
              onChange={handleFileChange}
              disabled={isSaving || isUploading}
              required
            />
            {selectedFile ? <small className="form-help">Selected: {selectedFile.name}</small> : null}
            {errors.file ? <small className="form-error">{errors.file}</small> : null}
          </label>
        ) : (
          <div className="content-card form-field-wide admin-file-summary">
            <div className="content-card-body">
              <p className="card-meta">Current file</p>
              <h3>{initialFile.file_name}</h3>
              <p>{formatPublicFileMeta(initialFile)}</p>
              <p>Upload a new entry if the file itself changes. This editor updates metadata only.</p>
            </div>
          </div>
        )}
      </div>

      <div className="donation-form-actions">
        <button className="button donation-submit-button" type="submit" disabled={isSaving}>
          {isSaving
            ? initialFile?.id
              ? 'Saving…'
              : 'Uploading…'
            : initialFile?.id
              ? 'Save File Details'
              : 'Upload File'}
        </button>

        {initialFile?.id ? (
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

export default AdminPublicFilesForm
