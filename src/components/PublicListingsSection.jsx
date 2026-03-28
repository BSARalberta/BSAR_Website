import ListingCard from './ListingCard'
import TransparencySection from './TransparencySection'

function PublicListingsSection({
  eyebrow,
  title,
  description,
  items,
  isLoading,
  error,
  emptyTitle,
  emptyDescription,
  headerActions,
  loadingTitle = 'Checking upcoming listings',
  loadingDescription = 'Published items will appear here as soon as they are available.',
}) {
  let content = null

  if (isLoading) {
    content = (
      <article className="content-card">
        <div className="content-card-body">
          <p className="card-meta">Loading</p>
          <h3>{loadingTitle}</h3>
          <p>{loadingDescription}</p>
        </div>
      </article>
    )
  } else if (error) {
    content = (
      <article className="content-card">
        <div className="content-card-body">
          <p className="card-meta">Unable to load content</p>
          <h3>We could not load this section right now</h3>
          <p>{error}</p>
        </div>
      </article>
    )
  } else if (items.length === 0) {
    content = (
      <article className="content-card">
        <div className="content-card-body">
          <p className="card-meta">Nothing scheduled yet</p>
          <h3>{emptyTitle}</h3>
          <p>{emptyDescription}</p>
        </div>
      </article>
    )
  } else {
    content = (
      <div className="listing-grid">
        {items.map((item) => (
          <ListingCard key={item.id} listing={item} />
        ))}
      </div>
    )
  }

  return (
    <TransparencySection
      eyebrow={eyebrow}
      title={title}
      description={description}
      headerActions={headerActions}
    >
      {content}
    </TransparencySection>
  )
}

export default PublicListingsSection
