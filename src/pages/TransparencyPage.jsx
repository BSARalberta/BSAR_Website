import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import ContentCard from '../components/ContentCard'
import {
  transparencyBanner,
  transparencySections,
} from '../content/siteContent'

function TransparencyPage() {
  return (
    <>
      <PageHero {...transparencyBanner} compact />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Public Records"
            title="Organized sections make this page easy to maintain as updates are added"
            description="Each block below can be edited by updating the content arrays in the site data file."
          />

          <div className="stack-xl">
            {transparencySections.map((section) => (
              <section key={section.title} className="document-section">
                <div className="document-section-header">
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </div>

                <div className="card-grid card-grid-two">
                  {section.items.map((item) => (
                    <ContentCard key={item.title} {...item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default TransparencyPage
