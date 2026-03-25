import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import { joinContent } from '../content/siteContent'

function JoinPage() {
  return (
    <>
      <PageHero {...joinContent.hero} compact />

      <section className="section">
        <div className="container two-column-section">
          <SectionHeading
            eyebrow="What Joining Means"
            title="Volunteer service is meaningful, but it also requires preparation and reliability"
          />

          <div className="stack">
            <p>
              This page is written to set realistic expectations while still
              welcoming people who want to contribute. It can later be adapted
              to reflect the organization’s specific intake process.
            </p>
            <ul className="detail-list">
              {joinContent.expectations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="Who May Be a Good Fit"
            title="Prospective volunteers should be community-minded and ready to grow into the role"
          />

          <div className="card-grid card-grid-two">
            {joinContent.goodFit.map((item) => (
              <article key={item} className="feature-card">
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container action-panel">
          <div>
            <p className="eyebrow">Next Step</p>
            <h2>{joinContent.cta.title}</h2>
            <p>{joinContent.cta.description}</p>
            <p className="muted-note">
              {/* Replace this area with the real application workflow. */}
              This can later become a real form, contact email, intake guide,
              or external recruitment portal.
            </p>
          </div>

          <div className="action-box" aria-label="Volunteer application placeholder">
            <span>{joinContent.cta.buttonLabel}</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default JoinPage
