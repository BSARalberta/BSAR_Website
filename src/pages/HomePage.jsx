import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import ContentCard from '../components/ContentCard'
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
            eyebrow="Why It Matters"
            title="Built on professionalism, volunteer service, and public trust"
            description="The site highlights the values that help a volunteer team present itself clearly and credibly."
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

          <div className="card-grid card-grid-three">
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

      <section className="section section-alt">
        <div className="container announcement-panel">
          <div>
            <p className="eyebrow">{homeContent.latestAnnouncement.eyebrow}</p>
            <h2>{homeContent.latestAnnouncement.title}</h2>
            <p>{homeContent.latestAnnouncement.description}</p>
          </div>
          <Link className="button" to={homeContent.latestAnnouncement.to}>
            {homeContent.latestAnnouncement.linkLabel}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="At a Glance"
            title="A homepage designed to guide supporters, volunteers, and the public"
            description="These starter cards can be replaced or expanded later as the organization adds more content."
          />

          <div className="card-grid">
            <ContentCard
              title="Public information"
              description="The Transparency page is structured for AGM updates, documents, notices, and future downloads."
              meta="Update-friendly section"
              href="/transparency"
              linkLabel="Go to Transparency"
            />
            <ContentCard
              title="Support options"
              description="The Donate page includes a clear call to action and a ready-to-swap placeholder for a future platform."
              meta="Fundraising placeholder"
              href="/donate"
              linkLabel="Go to Donate"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
