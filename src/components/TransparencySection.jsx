function TransparencySection({ eyebrow, title, description, headerActions = null, children }) {
  return (
    <section className="document-section">
      <div className="document-section-header-wrap">
        <div className="document-section-header">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        {headerActions ? <div className="document-section-actions">{headerActions}</div> : null}
      </div>

      {children}
    </section>
  )
}

export default TransparencySection
