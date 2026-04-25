import { useEffect, useMemo, useState } from 'react'
import AdminPublicFilesForm from './AdminPublicFilesForm'
import {
  createPublicFile,
  deletePublicFile,
  fetchPublicFiles,
  formatPublicFileMeta,
  updatePublicFile,
} from '../lib/publicFiles'

function AdminPublicFilesManager() {
  const [publicFiles, setPublicFiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [adminMessage, setAdminMessage] = useState({ type: 'idle', message: '' })
  const [editingFile, setEditingFile] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadPublicFiles() {
      setIsLoading(true)

      try {
        const nextPublicFiles = await fetchPublicFiles()

        if (isMounted) {
          setPublicFiles(nextPublicFiles)
          setAdminMessage({ type: 'idle', message: '' })
        }
      } catch (error) {
        if (isMounted) {
          setAdminMessage({
            type: 'error',
            message: error.message || 'We could not load the public files.',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPublicFiles()

    return () => {
      isMounted = false
    }
  }, [])

  const sortedFiles = useMemo(
    () => [...publicFiles].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    [publicFiles],
  )

  async function refreshPublicFiles(nextSelectedId) {
    const nextPublicFiles = await fetchPublicFiles()
    setPublicFiles(nextPublicFiles)
    setEditingFile(
      nextSelectedId ? nextPublicFiles.find((file) => file.id === nextSelectedId) || null : null,
    )
  }

  async function handleSave(values, selectedFile) {
    setIsSaving(true)
    setIsUploading(!editingFile)
    setAdminMessage({
      type: 'pending',
      message: editingFile ? 'Saving file details…' : 'Uploading file…',
    })

    try {
      const savedFile = editingFile
        ? await updatePublicFile(editingFile.id, values)
        : await createPublicFile(values, selectedFile)

      await refreshPublicFiles(savedFile.id)
      setAdminMessage({
        type: 'success',
        message: editingFile ? 'File details saved.' : 'File uploaded successfully.',
      })
    } catch (error) {
      setAdminMessage({
        type: 'error',
        message: error.message || 'We could not save this file.',
      })
    } finally {
      setIsUploading(false)
      setIsSaving(false)
    }
  }

  async function handleDelete(file) {
    const confirmed = window.confirm('Delete this public file? This action cannot be undone.')

    if (!confirmed) {
      return
    }

    setAdminMessage({ type: 'pending', message: 'Deleting file…' })

    try {
      await deletePublicFile(file)
      await refreshPublicFiles(editingFile?.id === file.id ? null : editingFile?.id)
      setAdminMessage({ type: 'success', message: 'File deleted.' })
    } catch (error) {
      setAdminMessage({
        type: 'error',
        message: error.message || 'We could not delete this file.',
      })
    }
  }

  return (
    <div className="admin-shell">
      <div className="admin-toolbar">
        <p className="muted-note">
          Upload, describe, and remove public documents shown on the Public Events &amp; Info page.
        </p>

        <div className="admin-toolbar-actions">
          <button type="button" className="button-secondary" onClick={() => setEditingFile(null)}>
            New File
          </button>
        </div>
      </div>

      {adminMessage.type !== 'idle' ? (
        <p className={`form-status form-status-${adminMessage.type}`}>
          {adminMessage.message}
        </p>
      ) : null}

      <div className="admin-grid">
        <div className="form-panel">
          <AdminPublicFilesForm
            initialFile={editingFile}
            isSaving={isSaving}
            isUploading={isUploading}
            onSubmit={handleSave}
            onCancel={() => setEditingFile(null)}
          />
        </div>

        <section className="document-section">
          <div className="document-section-header-wrap">
            <div className="document-section-header">
              <p className="eyebrow">Current Files</p>
              <h2>Published downloads</h2>
              <p>Review public files, update titles and descriptions, or delete files entirely.</p>
            </div>
          </div>

          {isLoading ? (
            <article className="content-card">
              <div className="content-card-body">
                <p className="card-meta">Loading</p>
                <h3>Loading public files</h3>
              </div>
            </article>
          ) : sortedFiles.length === 0 ? (
            <article className="content-card">
              <div className="content-card-body">
                <p className="card-meta">No files yet</p>
                <h3>Upload the first public file</h3>
                <p>New files will appear here after they are uploaded.</p>
              </div>
            </article>
          ) : (
            <div className="admin-list">
              {sortedFiles.map((file) => (
                <article key={file.id} className="admin-list-item">
                  <div className="admin-list-content">
                    <h3 className="admin-list-title">{file.title}</h3>
                    <p>{formatPublicFileMeta(file)}</p>
                    {file.description ? <p>{file.description}</p> : null}
                  </div>

                  <div className="admin-list-actions">
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => setEditingFile(file)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => handleDelete(file)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default AdminPublicFilesManager
