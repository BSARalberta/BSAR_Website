import { useEffect, useState } from 'react'
import PageHero from '../components/PageHero'
import PublicDocumentsSection from '../components/PublicDocumentsSection'
import PublicListingsSection from '../components/PublicListingsSection'
import { transparencyBanner } from '../content/siteContent'
import {
  fetchPastAgms,
  fetchPastEvents,
  fetchUpcomingAgms,
  fetchUpcomingEvents,
} from '../lib/listings'
import { hasSupabaseEnv } from '../lib/supabaseClient'

function TransparencyPage() {
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [upcomingAgms, setUpcomingAgms] = useState([])
  const [pastAgms, setPastAgms] = useState([])
  const [eventView, setEventView] = useState('upcoming')
  const [agmView, setAgmView] = useState('upcoming')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadListings() {
      if (!hasSupabaseEnv) {
        if (isMounted) {
          setError('Supabase is not configured yet. Add the required env variables to load live content.')
          setIsLoading(false)
        }
        return
      }

      try {
        const [nextUpcomingEvents, nextPastEvents, nextUpcomingAgms, nextPastAgms] = await Promise.all([
          fetchUpcomingEvents(),
          fetchPastEvents(),
          fetchUpcomingAgms(),
          fetchPastAgms(),
        ])

        if (!isMounted) {
          return
        }

        setUpcomingEvents(nextUpcomingEvents)
        setPastEvents(nextPastEvents)
        setUpcomingAgms(nextUpcomingAgms)
        setPastAgms(nextPastAgms)
        setError('')
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'We could not load events right now.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadListings()

    return () => {
      isMounted = false
    }
  }, [])

  const eventItems = eventView === 'past' ? pastEvents : upcomingEvents
  const agmItems = agmView === 'past' ? pastAgms : upcomingAgms
  const eventToggle = (
    <div className="listing-toggle" role="tablist" aria-label="Events range">
      <button
        type="button"
        className={`listing-toggle-button${eventView === 'upcoming' ? ' listing-toggle-button-active' : ''}`}
        onClick={() => setEventView('upcoming')}
        aria-pressed={eventView === 'upcoming'}
      >
        Upcoming
      </button>
      <button
        type="button"
        className={`listing-toggle-button${eventView === 'past' ? ' listing-toggle-button-active' : ''}`}
        onClick={() => setEventView('past')}
        aria-pressed={eventView === 'past'}
      >
        Past Events
      </button>
    </div>
  )
  const agmToggle = (
    <div className="listing-toggle" role="tablist" aria-label="AGM range">
      <button
        type="button"
        className={`listing-toggle-button${agmView === 'upcoming' ? ' listing-toggle-button-active' : ''}`}
        onClick={() => setAgmView('upcoming')}
        aria-pressed={agmView === 'upcoming'}
      >
        Upcoming
      </button>
      <button
        type="button"
        className={`listing-toggle-button${agmView === 'past' ? ' listing-toggle-button-active' : ''}`}
        onClick={() => setAgmView('past')}
        aria-pressed={agmView === 'past'}
      >
        Past AGMs
      </button>
    </div>
  )

  return (
    <>
      <PageHero {...transparencyBanner} compact />

      <section className="section">
        <div className="container stack-xl">
          <PublicListingsSection
            eyebrow="Events"
            title={eventView === 'past' ? 'Past public events' : 'Upcoming public events'}
            description={
              eventView === 'past'
                ? 'Browse previously published public events, community appearances, and outreach activity.'
                : 'Browse upcoming public events, community appearances, and other published opportunities to connect with the team.'
            }
            items={eventItems}
            isLoading={isLoading}
            error={error}
            emptyTitle={
              eventView === 'past'
                ? 'No past events are published right now'
                : 'No upcoming events are published right now'
            }
            emptyDescription={
              eventView === 'past'
                ? 'Published past events will appear here once they are available.'
                : 'When future public events are published, they will appear here in date order.'
            }
            loadingTitle={
              eventView === 'past' ? 'Checking past events' : 'Checking upcoming events'
            }
            loadingDescription="Published event listings will appear here as soon as they are available."
            headerActions={eventToggle}
          />

          <PublicListingsSection
            eyebrow="AGM"
            title={agmView === 'past' ? 'Past annual general meetings' : 'Upcoming annual general meetings'}
            description={
              agmView === 'past'
                ? 'Review previously published annual general meeting notices and related public updates.'
                : 'Find published annual general meeting notices and upcoming AGM-related public updates.'
            }
            items={agmItems}
            isLoading={isLoading}
            error={error}
            emptyTitle={
              agmView === 'past'
                ? 'No past AGM notices are published right now'
                : 'No upcoming AGM notices are published right now'
            }
            emptyDescription={
              agmView === 'past'
                ? 'Published past AGM notices will appear here once they are available.'
                : 'Future AGM notices will appear here once they are published.'
            }
            loadingTitle={agmView === 'past' ? 'Checking past AGMs' : 'Checking upcoming AGMs'}
            loadingDescription="Published AGM listings will appear here as soon as they are available."
            headerActions={agmToggle}
          />

          <PublicDocumentsSection />
        </div>
      </section>
    </>
  )
}

export default TransparencyPage
