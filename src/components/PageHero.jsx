import ImagePlaceholder from './ImagePlaceholder'

function PageHero({ eyebrow, title, description, image, compact = false }) {
  const heroImageClassName = `hero-image${image?.squareContain ? ' hero-image-square-contain' : ''}`

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
            className={heroImageClassName}
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default PageHero
