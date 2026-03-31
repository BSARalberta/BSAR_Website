import SectionHeading from '../components/SectionHeading'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { aboutContent } from '../content/siteContent'

function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container founder-layout">
          <div className="founder-story">
            <SectionHeading
              eyebrow={aboutContent.hero.eyebrow}
              title={aboutContent.hero.title}
              description={aboutContent.hero.description}
            />

            <SectionHeading
              eyebrow={aboutContent.founderMessage.subtitle}
              title={aboutContent.founderMessage.title}
            />

            <div className="stack">
              {aboutContent.founderMessage.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="founder-signoff">
                <p>{aboutContent.founderMessage.signoff}</p>
                <p className="founder-byline">{aboutContent.founderMessage.byline}</p>
              </div>
            </div>
          </div>

          <aside className="founder-aside">
            <ImagePlaceholder
              src={aboutContent.hero.image.src}
              alt={aboutContent.hero.image.alt}
              label={aboutContent.hero.image.label}
              className="founder-portrait"
              priority
            />
          </aside>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="Leadership"
            title={aboutContent.board.title}
            description={aboutContent.board.description}
          />

          <div className="board-grid">
            {aboutContent.board.members.map((member, index) => (
              <article key={`${member.role}-${index}`} className="board-card">
                <div className="board-card-image-wrap">
                  <ImagePlaceholder
                    src={member.image}
                    alt={`${member.role} portrait placeholder`}
                    label="Board photo"
                    className="board-card-image"
                  />
                </div>

                <div className="board-card-body">
                  <p className="card-meta">{member.role}</p>
                  <h3>{member.name}</h3>
                  <a className="text-link" href={`mailto:${member.email}`}>
                    {member.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
