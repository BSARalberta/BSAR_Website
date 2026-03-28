import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import VolunteerInquiryForm from '../components/VolunteerInquiryForm'
import { joinContent } from '../content/siteContent'

const serviceFitCards = [
  'Volunteers do well when they can show up reliably, follow through, and be counted on by the team.',
  'Training is part of the role, so a good fit is someone willing to learn procedures, build skills, and keep improving over time.',
  'Search and rescue is team-based work that depends on clear communication, cooperation, and trust in the people beside you.',
  'The role suits people who care about serving the community and want to contribute in a practical, organized way.',
  'Members are trusted with real responsibility, so maturity, sound judgment, and a serious approach to the work matter.',
  'This is best suited to people looking for meaningful service and steady involvement rather than occasional or casual participation.',
]

function JoinPage() {
  return (
    <>
      <PageHero {...joinContent.hero} compact />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Volunteer Service"
            title="Volunteer service is best suited to people who are ready to train, work as a team, and take the responsibility seriously"
          />

          <div className="card-grid card-grid-two">
            {serviceFitCards.map((item) => (
              <article key={item} className="feature-card">
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container action-panel donate-contact-panel">
          <div>
            <p className="eyebrow">Next Step</p>
            <h2>Ask about volunteer recruitment</h2>
            <p>
              If you are interested in serving with Badlands Search and Rescue,
              contact the team to learn about current recruitment, intake
              expectations, and the next step in the process.
            </p>
            <ul className="detail-list">
              <li>Share a few details about your interest, availability, and any relevant experience.</li>
              <li>A BSAR team member can follow up with information about recruitment and intake expectations.</li>
              <li>You will receive a confirmation email after your inquiry is submitted.</li>
            </ul>
            <p>
              Prefer to email us directly instead? Contact{' '}
              <a className="text-link" href="mailto:info@badlandsearchandrescue.com">
                info@badlandsearchandrescue.com
              </a>
              .
            </p>
            <p className="muted-note">
              Submitting this form sends your inquiry to the BSAR volunteer recruitment
              inbox and a confirmation email to the address you provide.
            </p>
          </div>

          <div className="form-panel" aria-label="Volunteer inquiry form">
            <VolunteerInquiryForm />
          </div>
        </div>
      </section>
    </>
  )
}

export default JoinPage
