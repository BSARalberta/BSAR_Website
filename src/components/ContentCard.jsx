import { Link } from 'react-router-dom'

function ContentCard({
  title,
  description,
  meta,
  href,
  linkLabel,
  useAnchor = false,
  newTab = false,
}) {
  const isInternal = href?.startsWith('/') && !useAnchor
  const hasLink = Boolean(href && linkLabel)

  return (
    <article className="content-card">
      <div className="content-card-body">
        {meta ? <p className="card-meta">{meta}</p> : null}
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {hasLink
        ? isInternal
          ? (
            <Link className="text-link" to={href}>
              {linkLabel}
            </Link>
            )
          : (
            <a
              className="text-link"
              href={href}
              target={newTab ? '_blank' : undefined}
              rel={newTab ? 'noreferrer' : undefined}
            >
              {linkLabel}
            </a>
            )
        : null}
    </article>
  )
}

export default ContentCard
