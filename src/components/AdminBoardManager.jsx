import { useCallback, useEffect, useMemo, useState } from 'react'
import AdminBoardForm from './AdminBoardForm'
import {
  createBoardMember,
  deleteBoardMember,
  fetchBoardMembers,
  updateBoardMember,
  uploadBoardMemberImage,
} from '../lib/boardMembers'
import { getEmptyBoardMember, hasBoardMemberInfo } from '../lib/boardUtils'

function AdminBoardManager() {
  const [boardMembers, setBoardMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [adminMessage, setAdminMessage] = useState({ type: 'idle', message: '' })
  const [selectedMemberId, setSelectedMemberId] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [draftMember, setDraftMember] = useState(null)
  const [draftImageUrl, setDraftImageUrl] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadBoardMembers() {
      setIsLoading(true)

      try {
        const nextBoardMembers = await fetchBoardMembers()

        if (isMounted) {
          setBoardMembers(nextBoardMembers)
          setSelectedMemberId((current) => current ?? nextBoardMembers[0]?.id ?? null)
          setAdminMessage({ type: 'idle', message: '' })
        }
      } catch (error) {
        if (isMounted) {
          setAdminMessage({
            type: 'error',
            message: error.message || 'We could not load the board directory.',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadBoardMembers()

    return () => {
      isMounted = false
    }
  }, [])

  const selectedMember = useMemo(() => {
    if (isCreating) {
      const nextOrder =
        boardMembers.reduce(
          (highest, member) => Math.max(highest, Number(member.display_order) || 0),
          0,
        ) + 1

      return {
        ...getEmptyBoardMember(),
        display_order: nextOrder,
      }
    }

    return boardMembers.find((member) => member.id === selectedMemberId) || null
  }, [boardMembers, isCreating, selectedMemberId])

  const previewMember = useMemo(() => {
    const member = draftMember || selectedMember

    if (!member) {
      return null
    }

    return member.remove_image
      ? {
          ...member,
          image_url: '',
        }
      : member
  }, [draftMember, selectedMember])

  useEffect(() => {
    if (!selectedMember) {
      setDraftMember(null)
      return
    }

    setDraftMember(selectedMember)
  }, [selectedMember])

  useEffect(() => {
    if (!draftImageUrl) {
      return undefined
    }

    return () => {
      URL.revokeObjectURL(draftImageUrl)
    }
  }, [draftImageUrl])

  async function refreshBoardMembers(nextSelectedId) {
    const nextBoardMembers = await fetchBoardMembers()
    setBoardMembers(nextBoardMembers)
    setIsCreating(false)
    setSelectedMemberId(nextSelectedId ?? nextBoardMembers[0]?.id ?? null)
  }

  function handleCreateNew() {
    setIsCreating(true)
    setSelectedMemberId(null)
    setAdminMessage({ type: 'idle', message: '' })
  }

  const handleDraftChange = useCallback((nextDraft) => {
    setDraftMember(nextDraft)
  }, [])

  const handleDraftFileChange = useCallback((file) => {
    setDraftImageUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current)
      }

      return file ? URL.createObjectURL(file) : ''
    })
  }, [])

  async function handleSave(values, selectedFile) {
    setIsSaving(true)
    setAdminMessage({ type: 'pending', message: 'Saving board position…' })

    try {
      const nextValues = { ...values }

      if (selectedFile) {
        setIsUploading(true)
        nextValues.image_url = await uploadBoardMemberImage(selectedFile, values.role)
      }

      const savedMember = selectedMember?.id
        ? await updateBoardMember(selectedMember.id, nextValues)
        : await createBoardMember(nextValues)

      await refreshBoardMembers(savedMember.id)
      setDraftImageUrl('')
      setAdminMessage({
        type: 'success',
        message: selectedMember?.id
          ? 'Board position saved successfully.'
          : 'Board position created successfully.',
      })
    } catch (error) {
      setAdminMessage({
        type: 'error',
        message: error.message || 'We could not save this board position.',
      })
    } finally {
      setIsUploading(false)
      setIsSaving(false)
    }
  }

  async function handleDelete(member) {
    if (!member?.id) {
      return
    }

    const confirmed = window.confirm('Delete this board position? This action cannot be undone.')

    if (!confirmed) {
      return
    }

    setIsSaving(true)
    setAdminMessage({ type: 'pending', message: 'Deleting board position…' })

    try {
      await deleteBoardMember(member.id)
      setDraftImageUrl('')
      await refreshBoardMembers()
      setAdminMessage({ type: 'success', message: 'Board position deleted.' })
    } catch (error) {
      setAdminMessage({
        type: 'error',
        message: error.message || 'We could not delete this board position.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="admin-shell">
      <div className="admin-toolbar">
        <p className="muted-note">
          Create, order, update, and remove board positions for the About page.
        </p>

        <div className="admin-toolbar-actions">
          <button type="button" className="button-secondary" onClick={handleCreateNew}>
            New Position
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
          <AdminBoardForm
            initialMember={selectedMember}
            isSaving={isSaving}
            isUploading={isUploading}
            onSubmit={handleSave}
            onDelete={handleDelete}
            onDraftChange={handleDraftChange}
            onDraftFileChange={handleDraftFileChange}
          />
        </div>

        <section className="document-section">
          <div className="document-section-header-wrap">
            <div className="document-section-header">
              <p className="eyebrow">Current Board</p>
              <h2>Select a position to edit</h2>
              <p>Choose a board position, then update its title, order, name, email, image, or acting status.</p>
            </div>
          </div>

          {isLoading ? (
            <article className="content-card">
              <div className="content-card-body">
                <p className="card-meta">Loading</p>
                <h3>Loading board directory</h3>
              </div>
            </article>
          ) : boardMembers.length === 0 ? (
            <article className="content-card">
              <div className="content-card-body">
                <p className="card-meta">No positions yet</p>
                <h3>Create the first board position</h3>
                <p>New positions will appear here after they are created.</p>
              </div>
            </article>
          ) : (
            <div className="board-selector-panel">
              <label className="form-field">
                <span>Board position</span>
                <select
                  className="board-selector"
                  value={isCreating ? '__new__' : selectedMemberId || ''}
                  onChange={(event) => {
                    const { value } = event.target

                    if (value === '__new__') {
                      handleCreateNew()
                      return
                    }

                    setIsCreating(false)
                    setSelectedMemberId(value)
                  }}
                  disabled={isSaving}
                >
                  <option value="__new__">Create new position</option>
                  {boardMembers.map((member) => {
                    const isOpen = !hasBoardMemberInfo(member)
                    const status = isOpen ? 'Open' : member.is_acting ? 'Acting' : 'Filled'

                    return (
                      <option key={member.id} value={member.id}>
                        {member.display_order}. {member.role} ({status})
                      </option>
                    )
                  })}
                </select>
              </label>

              {previewMember ? (
                <div className="board-preview-wrap">
                  <p className="card-meta">Live Preview</p>

                  <article className="board-card">
                    <div className="board-card-image-wrap">
                      {(draftImageUrl || previewMember.image_url) && !previewMember.remove_image ? (
                        <img
                          src={draftImageUrl || previewMember.image_url}
                          alt={
                            hasBoardMemberInfo(previewMember)
                              ? `${previewMember.name || previewMember.role} portrait preview`
                              : `${previewMember.role || 'Board position'} preview`
                          }
                          className="board-card-image"
                        />
                      ) : (
                        <div
                          className="image-fallback board-card-image"
                          role="img"
                          aria-label="No image preview"
                        >
                          <span>No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="board-card-body">
                      <h3>
                        {hasBoardMemberInfo(previewMember)
                          ? previewMember.name
                          : 'Position Open'}
                      </h3>
                      <p className="board-member-acting">
                        {!hasBoardMemberInfo(previewMember)
                          ? previewMember.role || 'Untitled Position'
                          : previewMember.is_acting
                            ? `Acting ${previewMember.role}`
                            : previewMember.role}
                      </p>

                      {previewMember.email && hasBoardMemberInfo(previewMember) ? (
                        <a
                          className="board-card-email"
                          href={`mailto:${previewMember.email}`}
                          aria-label={`Email ${previewMember.name || previewMember.role}`}
                          title={previewMember.email}
                          onClick={(event) => event.preventDefault()}
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="board-card-email-icon"
                          >
                            <path
                              d="M4 6.5h16a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Zm0 1 8 5 8-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      ) : !hasBoardMemberInfo(previewMember) ? (
                        <p className="muted-note">This position is currently open.</p>
                      ) : null}
                    </div>
                  </article>
                </div>
              ) : null}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default AdminBoardManager
