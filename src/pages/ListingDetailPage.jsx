import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ListingDetailContent from '../components/ListingDetailContent'
import { fetchListingBySlug } from '../lib/listings'
import { hasSupabaseEnv } from '../lib/supabaseClient'

function ListingDetailPage() {
  const { slug } = useParams()
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadListing() {
      if (!hasSupabaseEnv) {
        if (isMounted) {
          setError('Supabase is not configured yet. Add the required env variables to load listing details.')
          setIsLoading(false)
        }
        return
      }

      try {
        const nextListing = await fetchListingBySlug(slug)

        if (isMounted) {
          setListing(nextListing)
          setError('')
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'We could not load this listing.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadListing()

    return () => {
      isMounted = false
    }
  }, [slug])

  return (
    <section className="section">
      <div className="container stack">
        <Link className="text-link" to="/public-events-info">
          Back to Public Events &amp; Info
        </Link>

        {isLoading ? (
          <article className="content-card">
            <div className="content-card-body">
              <p className="card-meta">Loading</p>
              <h3>Loading details</h3>
              <p>The selected event or AGM details are being loaded.</p>
            </div>
          </article>
        ) : null}

        {!isLoading && error ? (
          <article className="content-card">
            <div className="content-card-body">
              <p className="card-meta">Unavailable</p>
              <h3>We could not load this item</h3>
              <p>{error}</p>
            </div>
          </article>
        ) : null}

        {!isLoading && !error && listing ? <ListingDetailContent listing={listing} /> : null}
      </div>
    </section>
  )
}

export default ListingDetailPage
