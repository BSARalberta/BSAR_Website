import { Link } from 'react-router-dom'

function ContentCard({ title, description, meta, href, linkLabel }) {
  const isInternal = href?.startsWith('/')

  return (
    <article className="content-card">
      <div className="content-card-body">
        <p className="card-meta">{meta}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {isInternal ? (
        <Link className="text-link" to={href}>
          {linkLabel}
        </Link>
      ) : (
        <a className="text-link" href={href}>
          {linkLabel}
        </a>
      )}
    </article>
  )
}

export default ContentCard
