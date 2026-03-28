import { publicDocumentMetadata } from './metadata'

// Place public-facing files in ./files and they will be picked up automatically
// at build time by Vite. This keeps the system simple for Vercel-hosted static
// delivery while still allowing optional metadata and grouping.
const documentFiles = import.meta.glob('./files/*', {
  eager: true,
  import: 'default',
  query: '?url',
})

function formatTitleFromFilename(filename) {
  return filename
    .replace(/\.[^/.]+$/, '')
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function formatFileTypeLabel(filename) {
  const extension = filename.split('.').pop()?.toUpperCase()
  return extension ? `${extension} file` : 'Document'
}

function compareByCategoryAndTitle(a, b) {
  return a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
}

export const publicDocuments = Object.entries(documentFiles)
  .filter(([path]) => !path.endsWith('/README.md'))
  .map(([path, href]) => {
    const filename = path.split('/').pop() || ''
    const metadata = publicDocumentMetadata[filename] || {}

    return {
      filename,
      href,
      title: metadata.title || formatTitleFromFilename(filename),
      description: metadata.description || '',
      category: metadata.category || 'Public Documents',
      meta: metadata.meta || formatFileTypeLabel(filename),
    }
  })
  .sort(compareByCategoryAndTitle)

export const publicDocumentGroups = publicDocuments.reduce((groups, document) => {
  const existingGroup = groups.find((group) => group.title === document.category)

  if (existingGroup) {
    existingGroup.items.push(document)
    return groups
  }

  groups.push({
    title: document.category,
    items: [document],
  })

  return groups
}, [])
