import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import { homeContent } from '../content/siteContent'

function HomePage() {
  return (
    <>
      <PageHero {...homeContent.hero} />

      <section className="section">
        <div className="container two-column-section">
          <SectionHeading
            eyebrow="Community Safety"
            title={homeContent.community.title}
          />
          <div className="stack">
            {homeContent.community.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="Values we cherish"
            title="Built on integrity, responsibility, teamwork, and professionalism"
            description="These values guide every search, every response, and every safe return home."
          />

          <div className="card-grid card-grid-three">
            {homeContent.values.map((item) => (
              <article key={item.title} className="feature-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Get Involved"
            title="Choose the path that fits how you want to support the team"
          />

          <div className="card-grid card-grid-two">
            {homeContent.ctas.map((item) => (
              <article key={item.title} className="cta-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link className="button button-secondary" to={item.to}>
                  {item.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
