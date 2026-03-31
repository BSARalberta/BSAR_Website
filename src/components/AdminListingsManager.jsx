import { useEffect, useMemo, useState } from 'react'
import AdminListingForm from './AdminListingForm'
import {
  createListing,
  deleteListing,
  fetchAdminListings,
  updateListing,
  uploadListingImage,
} from '../lib/listings'
import { formatListingDateTime } from '../lib/listingUtils'

function AdminListingsManager() {
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [adminMessage, setAdminMessage] = useState({ type: 'idle', message: '' })
  const [editingListing, setEditingListing] = useState(null)
  const [listingTypeView, setListingTypeView] = useState('event')

  useEffect(() => {
    let isMounted = true

    async function loadListings() {
      setIsLoading(true)

      try {
        const nextListings = await fetchAdminListings()

        if (isMounted) {
          setListings(nextListings)
          setAdminMessage({ type: 'idle', message: '' })
        }
      } catch (error) {
        if (isMounted) {
          setAdminMessage({
            type: 'error',
            message: error.message || 'We could not load the admin listings.',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadListings()

    return () => {
      isMounted = false
    }
  }, [])

  const sortedListings = useMemo(
    () =>
      [...listings]
        .filter((listing) => listing.type === listingTypeView)
        .sort((a, b) => new Date(b.starts_at) - new Date(a.starts_at)),
    [listings, listingTypeView],
  )

  async function refreshListingsAndSelect(nextSelectedId) {
    const nextListings = await fetchAdminListings()
    setListings(nextListings)
    setEditingListing(
      nextSelectedId ? nextListings.find((item) => item.id === nextSelectedId) || null : null,
    )
  }

  async function handleSave(values, selectedFile) {
    setIsSaving(true)
    setAdminMessage({ type: 'pending', message: 'Saving listing…' })

    try {
      const nextValues = { ...values }

      if (selectedFile) {
        setIsUploading(true)
        const imageUrl = await uploadListingImage(selectedFile, values.title)
        nextValues.image_url = imageUrl
      }

      let savedListing

      if (editingListing) {
        savedListing = await updateListing(editingListing.id, nextValues, editingListing.slug)
      } else {
        savedListing = await createListing(nextValues)
      }

      await refreshListingsAndSelect(savedListing.id)
      setAdminMessage({ type: 'success', message: 'Listing saved successfully.' })
    } catch (error) {
      setAdminMessage({
        type: 'error',
        message: error.message || 'We could not save this listing.',
      })
    } finally {
      setIsUploading(false)
      setIsSaving(false)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Delete this listing? This action cannot be undone.')

    if (!confirmed) {
      return
    }

    setAdminMessage({ type: 'pending', message: 'Deleting listing…' })

    try {
      await deleteListing(id)
      await refreshListingsAndSelect(editingListing?.id === id ? null : editingListing?.id)
      setAdminMessage({ type: 'success', message: 'Listing deleted.' })
    } catch (error) {
      setAdminMessage({
        type: 'error',
        message: error.message || 'We could not delete this listing.',
      })
    }
  }

  return (
    <div className="admin-shell">
      <div className="admin-toolbar">
        <p className="muted-note">Manage events and AGMs from one shared publishing system.</p>

        <div className="admin-toolbar-actions">
          <button
            type="button"
            className="button-secondary"
            onClick={() => setEditingListing(null)}
          >
            New Listing
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
          <AdminListingForm
            initialListing={editingListing}
            isSaving={isSaving}
            isUploading={isUploading}
            onSubmit={handleSave}
            onCancel={() => setEditingListing(null)}
          />
        </div>

        <section className="document-section">
          <div className="document-section-header-wrap">
            <div className="document-section-header">
              <p className="eyebrow">Current Listings</p>
              <h2>Published and draft items</h2>
              <p>Review current entries, filter by type, and reopen any item for editing.</p>
            </div>

            <div className="document-section-actions">
              <div className="listing-toggle" role="tablist" aria-label="Listing type filter">
                <button
                  type="button"
                  className={`listing-toggle-button${listingTypeView === 'event' ? ' listing-toggle-button-active' : ''}`}
                  onClick={() => setListingTypeView('event')}
                  aria-pressed={listingTypeView === 'event'}
                >
                  Events
                </button>
                <button
                  type="button"
                  className={`listing-toggle-button${listingTypeView === 'agm' ? ' listing-toggle-button-active' : ''}`}
                  onClick={() => setListingTypeView('agm')}
                  aria-pressed={listingTypeView === 'agm'}
                >
                  AGMs
                </button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <article className="content-card">
              <div className="content-card-body">
                <p className="card-meta">Loading</p>
                <h3>Loading admin listings</h3>
              </div>
            </article>
          ) : sortedListings.length === 0 ? (
            <article className="content-card">
              <div className="content-card-body">
                <p className="card-meta">No entries yet</p>
                <h3>Create your first {listingTypeView === 'event' ? 'event' : 'AGM'}</h3>
                <p>New items will appear here after they are created.</p>
              </div>
            </article>
          ) : (
            <div className="admin-list">
              {sortedListings.map((listing) => (
                <article key={listing.id} className="admin-list-item">
                  <div className="admin-list-content">
                    <h3 className="admin-list-title">
                      {listing.title}{' '}
                      <span
                        className={
                          listing.is_published
                            ? 'status-pill status-pill-published'
                            : 'status-pill status-pill-draft'
                        }
                      >
                        {listing.is_published ? 'Published' : 'Draft'}
                      </span>
                    </h3>
                    <p>{formatListingDateTime(listing.starts_at)}</p>
                  </div>

                  <div className="admin-list-actions">
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => setEditingListing(listing)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => handleDelete(listing.id)}
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

export default AdminListingsManager
