import ContentCard from './ContentCard'
import TransparencySection from './TransparencySection'
import { publicDocumentGroups } from '../content/publicDocuments'

function PublicDocumentsSection() {
  return (
    <TransparencySection
      eyebrow="Public Documents"
      title="Download and view public documents">
      {publicDocumentGroups.length > 0 ? (
        <div className="stack-xl">
          {publicDocumentGroups.map((group) => (
            <section key={group.title} className="document-group">
              <div className="document-group-header">
                <h3>{group.title}</h3>
                <p>
                  For public visibility and transparency.
                </p>
              </div>

              <div className="card-grid card-grid-two">
                {group.items.map((document) => (
                  <ContentCard
                    key={document.filename}
                    title={document.title}
                    description={document.description}
                    meta={document.meta}
                    href={document.href}
                    linkLabel="Open document"
                    useAnchor
                    newTab
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <article className="content-card">
          <div className="content-card-body">
            <p className="card-meta">No documents published yet</p>
            <h3>Public files will appear here automatically</h3>
            <p>
              Add files to the public documents folder and this section will generate
              document entries from them at build time.
            </p>
          </div>
        </article>
      )}
    </TransparencySection>
  )
}

export default PublicDocumentsSection
