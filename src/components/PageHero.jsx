import ImagePlaceholder from './ImagePlaceholder'

function PageHero({ eyebrow, title, description, image, compact = false }) {
  return (
    <section className={`page-hero${compact ? ' page-hero-compact' : ''}`}>
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-text">{description}</p>
        </div>

        <div className="page-hero-media">
          <ImagePlaceholder
            src={image?.src}
            alt={image?.alt}
            label={image?.label}
            className="hero-image"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default PageHero
