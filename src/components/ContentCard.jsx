import { Link } from 'react-router-dom'

function ContentCard({
  title,
  description,
  meta,
  href,
  linkLabel,
  useAnchor = false,
  newTab = false,
  linkTitle = false,
  className = '',
}) {
  const isInternal = href?.startsWith('/') && !useAnchor
  const hasLink = Boolean(href && linkLabel)
  const titleContent = linkTitle && href
    ? isInternal
      ? (
        <Link className="content-card-title-link" to={href}>
          {title}
        </Link>
        )
      : (
        <a
          className="content-card-title-link"
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noreferrer' : undefined}
        >
          {title}
        </a>
        )
    : title

  return (
    <article className={`content-card${className ? ` ${className}` : ''}`}>
      <div className="content-card-body">
        {meta ? <p className="card-meta">{meta}</p> : null}
        <h3>{titleContent}</h3>
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
