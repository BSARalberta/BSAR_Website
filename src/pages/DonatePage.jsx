import PageHero from '../components/PageHero'
import DonationInquiryForm from '../components/DonationInquiryForm'
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
              Financial support directly improves our ability to prepare, respond, and save lives. It ensures our team has the training, equipment, and skills needed to act quickly and effectively when every second counts.
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
        <div className="container action-panel donate-contact-panel">
          <div>
            <p className="eyebrow">Support BSAR</p>
            <h2>{donateContent.cta.title}</h2>
            <p>{donateContent.cta.description}</p>
            <ul className="detail-list">
              {donateContent.cta.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Prefer to email us directly instead? Contact{' '}
              <a className="text-link" href="mailto:info@badlandsearchandrescue.com">
                info@badlandsearchandrescue.com
              </a>
              .
            </p>
            <p className="muted-note">
              Submitting this form sends your inquiry to the BSAR team and a
              confirmation email to the address you provide.
            </p>
          </div>

          <div className="form-panel" aria-label="Donation inquiry form">
            <DonationInquiryForm />
          </div>
        </div>
      </section>
    </>
  )
}

export default DonatePage
