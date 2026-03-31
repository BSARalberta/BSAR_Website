import { useEffect, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { aboutContent } from '../content/siteContent'
import { fetchBoardMembers } from '../lib/boardMembers'
import { hasBoardMemberInfo } from '../lib/boardUtils'
import { hasSupabaseEnv } from '../lib/supabaseClient'

function AboutPage() {
  const [boardMembers, setBoardMembers] = useState([])

  useEffect(() => {
    let isMounted = true

    async function loadBoardMembers() {
      if (!hasSupabaseEnv) {
        return
      }

      try {
        const nextBoardMembers = await fetchBoardMembers()

        if (isMounted) {
          setBoardMembers(nextBoardMembers)
        }
      } catch {
        if (isMounted) {
          setBoardMembers([])
        }
      }
    }

    loadBoardMembers()

    return () => {
      isMounted = false
    }
  }, [])

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

          {boardMembers.length === 0 ? (
            <article className="content-card">
              <div className="content-card-body">
                <p className="card-meta">Board information is coming soon</p>
                <h3>No board positions have been published yet</h3>
                <p>Published board positions will appear here once they are created in the admin system.</p>
              </div>
            </article>
          ) : (
            <div className="board-grid">
              {boardMembers.map((member) => {
                const isOpen = !hasBoardMemberInfo(member)

                return (
                  <article key={member.id || member.role} className="board-card">
                    <div className="board-card-image-wrap">
                      <ImagePlaceholder
                        src={member.image_url}
                        alt={
                          isOpen
                            ? `${member.role} position is currently open`
                            : `${member.name || member.role} portrait`
                        }
                        label="No Image"
                        className="board-card-image"
                      />
                    </div>

                    <div className="board-card-body">
                      <h3>{isOpen ? 'Position Open' : member.name}</h3>
                      <p className="board-member-acting">
                        {isOpen
                          ? member.role
                          : member.is_acting
                            ? `Acting ${member.role}`
                            : member.role}
                      </p>
                      {member.email && !isOpen ? (
                        <a
                          className="board-card-email"
                          href={`mailto:${member.email}`}
                          aria-label={`Email ${member.name || member.role}`}
                          title={member.email}
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="board-card-email-icon"
                          >
                            <path
                              d="M4 6.5h16a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Zm0 1 8 5 8-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      ) : isOpen ? (
                        <p className="muted-note">This position is currently open.</p>
                      ) : null}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default AboutPage
