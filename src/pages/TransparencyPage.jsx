import PageHero from '../components/PageHero'
import ContentCard from '../components/ContentCard'
import PublicDocumentsSection from '../components/PublicDocumentsSection'
import TransparencySection from '../components/TransparencySection'
import { transparencyBanner, transparencyContent } from '../content/siteContent'

function TransparencyPage() {
  return (
    <>
      <PageHero {...transparencyBanner} compact />

      <section className="section">
        <div className="container">
          <div className="stack-xl">
            <TransparencySection {...transparencyContent.events}>
              <div className="card-grid card-grid-two">
                {transparencyContent.events.items.map((item) => (
                  <ContentCard key={item.title} {...item} />
                ))}
              </div>
            </TransparencySection>

            <TransparencySection {...transparencyContent.agm}>
              <div className="card-grid card-grid-two">
                {transparencyContent.agm.items.map((item) => (
                  <ContentCard key={item.title} {...item} />
                ))}
              </div>
            </TransparencySection>

            <PublicDocumentsSection />
          </div>
        </div>
      </section>
    </>
  )
}

export default TransparencyPage
