import { normalizeOptionalText, slugify } from './listingUtils'
import { supabase } from './supabaseClient'

const PUBLIC_FILES_TABLE = 'public_files'
const PUBLIC_FILES_BUCKET = 'public-files'

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add the required Vite env variables.')
  }

  return supabase
}

function getFileExtension(fileName) {
  const parts = String(fileName || '').split('.')
  if (parts.length <= 1) {
    return ''
  }

  return parts.pop()?.toLowerCase() || ''
}

function getSafeFilePath(file) {
  const baseName = slugify(String(file?.name || '').replace(/\.[^/.]+$/, '')) || 'public-file'
  const extension = getFileExtension(file?.name)
  const uniqueSuffix =
    globalThis.crypto?.randomUUID?.().slice(0, 8) ||
    Math.random().toString(36).slice(2, 10)

  return `uploads/${Date.now()}-${uniqueSuffix}-${baseName}${extension ? `.${extension}` : ''}`
}

function getPublicUrl(filePath) {
  const client = requireSupabase()
  const { data } = client.storage.from(PUBLIC_FILES_BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}

function normalizePublicFilePayload(values) {
  return {
    title: String(values.title || '').trim(),
    description: normalizeOptionalText(values.description),
  }
}

export function getPublicFileFormValues(file) {
  return {
    title: file?.title || '',
    description: file?.description || '',
  }
}

export function validatePublicFile(values, { selectedFile, isEditing }) {
  const errors = {}

  if (!String(values.title || '').trim()) {
    errors.title = 'Title is required.'
  }

  if (!isEditing && !selectedFile) {
    errors.file = 'Choose a file to upload.'
  }

  return errors
}

export function formatPublicFileDate(value) {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatPublicFileSize(value) {
  const size = Number(value)

  if (!Number.isFinite(size) || size <= 0) {
    return ''
  }

  if (size < 1024) {
    return `${size} B`
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  }

  if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`
  }

  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

export function formatPublicFileMeta(file) {
  const extension = getFileExtension(file?.file_name)
  const typeLabel = extension ? extension.toUpperCase() : 'File'
  const sizeLabel = formatPublicFileSize(file?.file_size)
  const dateLabel = formatPublicFileDate(file?.created_at)

  return [typeLabel, sizeLabel, dateLabel].filter(Boolean).join(' · ')
}

export function getPublicFileDownloadUrl(filePath) {
  if (!filePath) {
    return ''
  }

  return getPublicUrl(filePath)
}

export async function fetchPublicFiles() {
  const client = requireSupabase()
  const { data, error } = await client
    .from(PUBLIC_FILES_TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data || []
}

export async function createPublicFile(values, file) {
  const client = requireSupabase()

  if (!file) {
    throw new Error('Choose a file to upload.')
  }

  const filePath = getSafeFilePath(file)
  const { error: uploadError } = await client.storage.from(PUBLIC_FILES_BUCKET).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (uploadError) {
    throw uploadError
  }

  const payload = {
    ...normalizePublicFilePayload(values),
    file_name: file.name,
    file_path: filePath,
    file_type: normalizeOptionalText(file.type),
    file_size: Number.isFinite(file.size) ? file.size : null,
  }

  const { data, error } = await client
    .from(PUBLIC_FILES_TABLE)
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    await client.storage.from(PUBLIC_FILES_BUCKET).remove([filePath])
    throw error
  }

  return data
}

export async function updatePublicFile(id, values) {
  const client = requireSupabase()
  const payload = normalizePublicFilePayload(values)

  const { data, error } = await client
    .from(PUBLIC_FILES_TABLE)
    .update(payload)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function deletePublicFile(file) {
  const client = requireSupabase()

  if (!file?.id) {
    throw new Error('The selected file could not be deleted because it is missing an id.')
  }

  if (file.file_path) {
    const { error: storageError } = await client.storage
      .from(PUBLIC_FILES_BUCKET)
      .remove([file.file_path])

    if (storageError) {
      throw storageError
    }
  }

  const { data, error } = await client
    .from(PUBLIC_FILES_TABLE)
    .delete()
    .eq('id', file.id)
    .select('id')

  if (error) {
    throw error
  }

  if (!data || data.length === 0) {
    throw new Error(
      'The file record was not deleted. Check that the public_files delete policy exists and that your admin account is allowed to delete rows.',
    )
  }
}
