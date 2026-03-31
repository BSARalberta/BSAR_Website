import { supabase } from './supabaseClient'
import {
  normalizeBoardMemberPayload,
  sortBoardMembers,
} from './boardUtils'
import { slugify } from './listingUtils'

const BOARD_MEMBERS_TABLE = 'board_members'
const BOARD_IMAGES_BUCKET = 'board-member-images'

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add the required Vite env variables.')
  }

  return supabase
}

export async function fetchBoardMembers() {
  const client = requireSupabase()
  const { data, error } = await client
    .from(BOARD_MEMBERS_TABLE)
    .select('*')
    .order('display_order', { ascending: true })
    .order('role', { ascending: true })

  if (error) {
    throw error
  }

  return (data || []).sort(sortBoardMembers)
}

export async function createBoardMember(values) {
  const client = requireSupabase()
  const payload = normalizeBoardMemberPayload(values)

  const { data, error } = await client
    .from(BOARD_MEMBERS_TABLE)
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function updateBoardMember(id, values) {
  const client = requireSupabase()
  const payload = normalizeBoardMemberPayload(values)

  const { data, error } = await client
    .from(BOARD_MEMBERS_TABLE)
    .update(payload)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function deleteBoardMember(id) {
  const client = requireSupabase()
  const { error } = await client.from(BOARD_MEMBERS_TABLE).delete().eq('id', id)

  if (error) {
    throw error
  }
}

export async function uploadBoardMemberImage(file, role) {
  const client = requireSupabase()
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const baseName = slugify(role || file.name) || 'board-member'
  const filePath = `${baseName}-${Date.now()}.${extension}`

  const { error: uploadError } = await client.storage
    .from(BOARD_IMAGES_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    throw uploadError
  }

  const { data } = client.storage.from(BOARD_IMAGES_BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}
