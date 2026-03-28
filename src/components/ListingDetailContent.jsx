import ImagePlaceholder from './ImagePlaceholder'
import {
  formatListingDateTime,
  isEventListing,
  LISTING_IMAGE_PLACEHOLDER,
} from '../lib/listingUtils'

function ListingDetailContent({ listing }) {
  const showCta = isEventListing(listing) && listing.cta_text && listing.cta_link

  return (
    <article className="detail-panel">
      <ImagePlaceholder
        src={listing.image_url || LISTING_IMAGE_PLACEHOLDER}
        alt={listing.title}
        label="Listing image"
        className="detail-panel-image"
        priority
      />

      <div className="detail-panel-body">
        <p className="eyebrow">{listing.type === 'agm' ? 'AGM' : 'Event'}</p>
        <h1>{listing.title}</h1>

        <div className="detail-meta-list">
          <div>
            <span className="detail-label">Date and time</span>
            <p>{formatListingDateTime(listing.starts_at)}</p>
          </div>

          {listing.location ? (
            <div>
              <span className="detail-label">Location</span>
              <p>{listing.location}</p>
              {listing.map_link ? (
                <p>
                  <a
                    className="text-link"
                    href={listing.map_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open map
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}

          {isEventListing(listing) && listing.price_text ? (
            <div>
              <span className="detail-label">Price</span>
              <p>{listing.price_text}</p>
            </div>
          ) : null}
        </div>

        {listing.description ? (
          <div className="detail-copy">
            <h2>Description</h2>
            <p>{listing.description}</p>
          </div>
        ) : null}

        {listing.more_info ? (
          <div className="detail-copy">
            <h2>More Information</h2>
            <p>{listing.more_info}</p>
          </div>
        ) : null}

        {showCta ? (
          <a className="button" href={listing.cta_link} target="_blank" rel="noreferrer">
            {listing.cta_text}
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default ListingDetailContent
