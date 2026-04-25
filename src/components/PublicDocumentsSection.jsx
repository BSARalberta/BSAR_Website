import { useEffect, useState } from 'react'
import ContentCard from './ContentCard'
import TransparencySection from './TransparencySection'
import {
  fetchPublicFiles,
  getPublicFileDownloadUrl,
} from '../lib/publicFiles'
import { hasSupabaseEnv } from '../lib/supabaseClient'

function PublicDocumentsSection() {
  const [publicFiles, setPublicFiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadPublicFiles() {
      if (!hasSupabaseEnv) {
        if (isMounted) {
          setError('Supabase is not configured yet. Add the required env variables to load public files.')
          setIsLoading(false)
        }
        return
      }

      try {
        const nextPublicFiles = await fetchPublicFiles()

        if (!isMounted) {
          return
        }

        setPublicFiles(nextPublicFiles)
        setError('')
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'We could not load public files right now.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPublicFiles()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <TransparencySection
      eyebrow="Public Documents"
      title="Download and view public documents"
      description="Public reference files published by Badlands Search and Rescue.">
      {isLoading ? (
        <article className="content-card">
          <div className="content-card-body">
            <p className="card-meta">Loading</p>
            <h3>Loading public files</h3>
            <p>Published downloads will appear here shortly.</p>
          </div>
        </article>
      ) : error ? (
        <article className="content-card">
          <div className="content-card-body">
            <p className="card-meta">Unavailable</p>
            <h3>Public files could not be loaded</h3>
            <p>{error}</p>
          </div>
        </article>
      ) : publicFiles.length > 0 ? (
        <div className="card-grid card-grid-two">
          {publicFiles.map((file) => (
            <ContentCard
              key={file.id}
              className="public-document-card"
              title={file.title}
              description={file.description}
              href={getPublicFileDownloadUrl(file.file_path)}
              useAnchor
              newTab
              linkTitle
            />
          ))}
        </div>
      ) : (
        <article className="content-card">
          <div className="content-card-body">
            <p className="card-meta">No documents published yet</p>
            <h3>Public files will appear here automatically</h3>
            <p>
              When admins upload files in the admin portal, they will appear here automatically
              for public viewing and download.
            </p>
          </div>
        </article>
      )}
    </TransparencySection>
  )
}

export default PublicDocumentsSection
