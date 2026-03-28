function TransparencySection({ eyebrow, title, description, children }) {
  return (
    <section className="document-section">
      <div className="document-section-header">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {children}
    </section>
  )
}

export default TransparencySection
