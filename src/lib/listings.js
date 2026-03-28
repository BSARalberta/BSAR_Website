import { supabase } from './supabaseClient'
import {
  normalizeListingPayload,
  normalizeOptionalText,
  slugify,
} from './listingUtils'

const LISTINGS_TABLE = 'listings'
const IMAGE_BUCKET = 'event-images'

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add the required Vite env variables.')
  }

  return supabase
}

function queryUpcomingByType(type) {
  return requireSupabase()
    .from(LISTINGS_TABLE)
    .select('*')
    .eq('type', type)
    .eq('is_published', true)
    .gte('starts_at', new Date().toISOString())
    .order('starts_at', { ascending: true })
}

function queryPastByType(type) {
  return requireSupabase()
    .from(LISTINGS_TABLE)
    .select('*')
    .eq('type', type)
    .eq('is_published', true)
    .lt('starts_at', new Date().toISOString())
    .order('starts_at', { ascending: false })
}

async function generateUniqueSlug(title, existingId) {
  const client = requireSupabase()
  const baseSlug = slugify(title) || 'listing'
  const { data, error } = await client
    .from(LISTINGS_TABLE)
    .select('id, slug')
    .ilike('slug', `${baseSlug}%`)

  if (error) {
    throw error
  }

  const slugs = (data || [])
    .filter((item) => item.id !== existingId)
    .map((item) => item.slug)

  if (!slugs.includes(baseSlug)) {
    return baseSlug
  }

  let suffix = 2

  while (slugs.includes(`${baseSlug}-${suffix}`)) {
    suffix += 1
  }

  return `${baseSlug}-${suffix}`
}

export async function fetchUpcomingEvents() {
  const { data, error } = await queryUpcomingByType('event')

  if (error) {
    throw error
  }

  return data || []
}

export async function fetchPastEvents() {
  const { data, error } = await queryPastByType('event')

  if (error) {
    throw error
  }

  return data || []
}

export async function fetchUpcomingAgms() {
  const { data, error } = await queryUpcomingByType('agm')

  if (error) {
    throw error
  }

  return data || []
}

export async function fetchPastAgms() {
  const { data, error } = await queryPastByType('agm')

  if (error) {
    throw error
  }

  return data || []
}

export async function fetchListingBySlug(slug) {
  const client = requireSupabase()
  const { data, error } = await client
    .from(LISTINGS_TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function fetchAdminListings() {
  const client = requireSupabase()
  const { data, error } = await client
    .from(LISTINGS_TABLE)
    .select('*')
    .order('starts_at', { ascending: true })

  if (error) {
    throw error
  }

  return data || []
}

export async function createListing(values) {
  const client = requireSupabase()
  const payload = normalizeListingPayload(values)
  payload.slug = await generateUniqueSlug(payload.title)

  const { data, error } = await client
    .from(LISTINGS_TABLE)
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function updateListing(id, values, currentSlug) {
  const client = requireSupabase()
  const payload = normalizeListingPayload(values)
  const nextSlugBase = slugify(payload.title)
  const shouldRefreshSlug = nextSlugBase && nextSlugBase !== currentSlug

  payload.slug = shouldRefreshSlug
    ? await generateUniqueSlug(payload.title, id)
    : currentSlug

  const { data, error } = await client
    .from(LISTINGS_TABLE)
    .update(payload)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function deleteListing(id) {
  const client = requireSupabase()
  const { error } = await client.from(LISTINGS_TABLE).delete().eq('id', id)

  if (error) {
    throw error
  }
}

export async function uploadListingImage(file, title) {
  const client = requireSupabase()
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const baseName = slugify(title || file.name) || 'listing-image'
  const filePath = `${baseName}-${Date.now()}.${extension}`

  const { error: uploadError } = await client.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    throw uploadError
  }

  const { data } = client.storage.from(IMAGE_BUCKET).getPublicUrl(filePath)
  return normalizeOptionalText(data.publicUrl)
}
