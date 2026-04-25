import { useEffect, useState } from 'react'
import AdminBoardManager from '../components/AdminBoardManager'
import AdminListingsManager from '../components/AdminListingsManager'
import AdminPublicFilesManager from '../components/AdminPublicFilesManager'
import { footerContent } from '../content/siteContent'
import { hasSupabaseEnv, supabase } from '../lib/supabaseClient'

function AdminPage() {
  const [session, setSession] = useState(null)
  const [authValues, setAuthValues] = useState({ email: '', password: '' })
  const [authStatus, setAuthStatus] = useState({ type: 'idle', message: '' })
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    if (!hasSupabaseEnv || !supabase) {
      return
    }

    let isMounted = true

    async function loadSession() {
      const {
        data: { session: nextSession },
      } = await supabase.auth.getSession()

      if (isMounted) {
        setSession(nextSession)
      }
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  function handleAuthChange(event) {
    const { name, value } = event.target
    setAuthValues((current) => ({ ...current, [name]: value }))
  }

  async function handleLogin(event) {
    event.preventDefault()

    if (!supabase) {
      return
    }

    setAuthStatus({ type: 'pending', message: 'Signing in…' })

    const { error } = await supabase.auth.signInWithPassword({
      email: authValues.email,
      password: authValues.password,
    })

    if (error) {
      setAuthStatus({ type: 'error', message: error.message })
      return
    }

    setAuthStatus({ type: 'success', message: 'Signed in.' })
    setAuthValues({ email: '', password: '' })
  }

  async function handleLogout() {
    if (!supabase) {
      return
    }

    await supabase.auth.signOut()
    setActiveSection(null)
  }

  if (!hasSupabaseEnv) {
    return (
      <section className="section">
        <div className="container">
          <article className="content-card">
            <div className="content-card-body">
              <p className="card-meta">Supabase setup required</p>
              <h2>Admin tools are not configured yet</h2>
              <p>
                Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to
                enable the admin interface and live public content.
              </p>
            </div>
          </article>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container admin-layout">
        <div className="admin-intro">
          <p className="eyebrow">Admin</p>
          <h1>Manage public information</h1>
          <p>
            Sign in with a Supabase Auth user allowed by your RLS policies, then choose whether
            to edit events and AGMs, the board of directors, or public files.
          </p>
        </div>

        {!session ? (
          <div className="form-panel">
            <form className="donation-form" onSubmit={handleLogin}>
              <div className="donation-form-header">
                <p className="donation-form-kicker">Admin Login</p>
                <h3>Sign in</h3>
                <p>Use the admin account you created in Supabase Auth.</p>
              </div>

              <label className="form-field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  value={authValues.email}
                  onChange={handleAuthChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Password</span>
                <input
                  name="password"
                  type="password"
                  value={authValues.password}
                  onChange={handleAuthChange}
                  required
                />
              </label>

              <div className="donation-form-actions">
                <button className="button donation-submit-button" type="submit">
                  Sign In
                </button>

                {authStatus.type !== 'idle' ? (
                  <p className={`form-status form-status-${authStatus.type}`}>
                    {authStatus.message}
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        ) : (
          <div className="admin-shell">
            <div className="admin-toolbar">
              <p className="muted-note">
                Signed in as {session.user.email || footerContent.contactEmails[0]}
              </p>

              <div className="admin-toolbar-actions">
                {activeSection ? (
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => setActiveSection(null)}
                  >
                    Back to Admin Home
                  </button>
                ) : null}

                <button type="button" className="button-secondary" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </div>

            {!activeSection ? (
              <div className="card-grid card-grid-three">
                <article className="cta-card admin-choice-card">
                  <div className="content-card-body">
                    <p className="card-meta">Events and AGMs</p>
                    <h3>Edit public listings</h3>
                    <p>
                      Create, publish, update, and delete event and AGM entries for the public
                      information page.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => setActiveSection('listings')}
                  >
                    Manage Events & AGMs
                  </button>
                </article>

                <article className="cta-card admin-choice-card">
                  <div className="content-card-body">
                    <p className="card-meta">Board of Directors</p>
                    <h3>Edit leadership roles</h3>
                    <p>
                      Update names, photos, email addresses, and acting-role status for the About
                      page board directory.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => setActiveSection('board')}
                  >
                    Manage Board
                  </button>
                </article>

                <article className="cta-card admin-choice-card">
                  <div className="content-card-body">
                    <p className="card-meta">Public Files</p>
                    <h3>Manage downloadable documents</h3>
                    <p>
                      Upload, describe, and remove public files that appear in the Public
                      Documents section.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => setActiveSection('files')}
                  >
                    Manage Public Files
                  </button>
                </article>
              </div>
            ) : null}

            {activeSection === 'listings' ? <AdminListingsManager /> : null}
            {activeSection === 'board' ? <AdminBoardManager /> : null}
            {activeSection === 'files' ? <AdminPublicFilesManager /> : null}
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminPage
