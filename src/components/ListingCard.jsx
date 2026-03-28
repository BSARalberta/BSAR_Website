import { Link } from 'react-router-dom'
import { formatListingDate, isEventListing } from '../lib/listingUtils'

function ListingCard({ listing }) {
  const hasImage = Boolean(listing.image_url)

  return (
    <article className="listing-card">
      <Link className="listing-card-link" to={`/public-events-info/${listing.slug}`}>
        <div className={`listing-card-media${hasImage ? '' : ' listing-card-media-text'}`}>
          {hasImage ? (
            <img className="listing-card-image" src={listing.image_url} alt={listing.title} />
          ) : (
            <div className="listing-card-title-panel">
              <h3>{listing.title}</h3>
            </div>
          )}
        </div>

        <div className="listing-card-body">
          <p className="card-meta">{formatListingDate(listing.starts_at)}</p>
          {hasImage ? <h3>{listing.title}</h3> : null}
          {isEventListing(listing) && listing.price_text ? (
            <p className="listing-price">{listing.price_text}</p>
          ) : null}
        </div>
      </Link>
    </article>
  )
}

export default ListingCard
