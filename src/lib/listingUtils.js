export const LISTING_IMAGE_PLACEHOLDER = '/images/transparency-placeholder.svg'

export function isEventListing(listing) {
  return listing?.type === 'event'
}

export function formatListingDate(value) {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatListingDateTime(value) {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
}

export function normalizeOptionalText(value) {
  const normalized = typeof value === 'string' ? value.trim() : ''
  return normalized || null
}

export function normalizeListingPayload(values) {
  const type = values.type === 'agm' ? 'agm' : 'event'

  return {
    type,
    title: String(values.title || '').trim(),
    starts_at: values.starts_at ? new Date(values.starts_at).toISOString() : null,
    location: String(values.location || '').trim(),
    image_url: normalizeOptionalText(values.image_url),
    map_link: normalizeOptionalText(values.map_link),
    description: normalizeOptionalText(values.description),
    more_info: normalizeOptionalText(values.more_info),
    price_text: type === 'event' ? normalizeOptionalText(values.price_text) : null,
    cta_text: type === 'event' ? normalizeOptionalText(values.cta_text) : null,
    cta_link: type === 'event' ? normalizeOptionalText(values.cta_link) : null,
    is_published: Boolean(values.is_published),
  }
}

export function validateListing(values) {
  const errors = {}

  if (!String(values.title || '').trim()) {
    errors.title = 'Title is required.'
  }

  if (!values.starts_at) {
    errors.starts_at = 'Start date and time are required.'
  }

  if (!String(values.location || '').trim()) {
    errors.location = 'Location is required.'
  }

  const ctaText = String(values.cta_text || '').trim()
  const ctaLink = String(values.cta_link || '').trim()

  if ((ctaText && !ctaLink) || (!ctaText && ctaLink)) {
    const message = 'CTA text and CTA link must both be provided.'
    errors.cta_text = message
    errors.cta_link = message
  }

  return errors
}

export function getListingFormValues(listing) {
  if (!listing) {
    return {
      type: 'event',
      title: '',
      starts_at: '',
      location: '',
      map_link: '',
      description: '',
      more_info: '',
      price_text: '',
      cta_text: '',
      cta_link: '',
      image_url: '',
      is_published: false,
    }
  }

  return {
    type: listing.type || 'event',
    title: listing.title || '',
    starts_at: listing.starts_at ? listing.starts_at.slice(0, 16) : '',
    location: listing.location || '',
    map_link: listing.map_link || '',
    description: listing.description || '',
    more_info: listing.more_info || '',
    price_text: listing.price_text || '',
    cta_text: listing.cta_text || '',
    cta_link: listing.cta_link || '',
    image_url: listing.image_url || '',
    is_published: Boolean(listing.is_published),
  }
}
