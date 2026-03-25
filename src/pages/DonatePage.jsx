import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import { donateContent } from '../content/siteContent'

function DonatePage() {
  return (
    <>
      <PageHero {...donateContent.hero} compact />

      <section className="section">
        <div className="container two-column-section">
          <SectionHeading
            eyebrow="Why Donations Matter"
            title="Support helps sustain the practical resources a volunteer team depends on"
          />

          <div className="stack">
            <p>
              Financial support gives volunteer organizations more stability and
              more capacity to prepare responsibly. It helps turn community
              goodwill into meaningful readiness.
            </p>
            <ul className="detail-list">
              {donateContent.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container action-panel">
          <div>
            <p className="eyebrow">Call to Action</p>
            <h2>{donateContent.cta.title}</h2>
            <p>{donateContent.cta.description}</p>
            <p className="muted-note">
              {/* Replace this placeholder with a real donation URL or embed. */}
              Add your live donation link, donor platform embed, or campaign
              widget here when ready.
            </p>
          </div>

          <div className="action-box" aria-label="Donation platform placeholder">
            <span>{donateContent.cta.buttonLabel}</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default DonatePage
