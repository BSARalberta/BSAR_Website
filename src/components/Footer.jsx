import { NavLink } from 'react-router-dom'
import { footerContent, navigation } from '../content/siteContent'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{footerContent.organization}</p>
          <p className="footer-copy">{footerContent.description}</p>
          <a
            className="footer-affiliation"
            href={footerContent.affiliation.href}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="footer-affiliation-logo"
              src={footerContent.affiliation.logo.src}
              alt={footerContent.affiliation.logo.alt}
            />
            <span className="footer-affiliation-copy">
              <span className="footer-affiliation-label">{footerContent.affiliation.label}</span>
              <span className="footer-affiliation-name">{footerContent.affiliation.name}</span>
            </span>
          </a>
        </div>

        <div>
          <p className="footer-heading">Navigation</p>
          <div className="footer-links">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="footer-link"
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-heading">Contact</p>
          <div className="footer-links">
            {footerContent.contactEmails.map((email) => (
              <a key={email} className="footer-link" href={`mailto:${email}`}>
                {email}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-heading">Social</p>
          <a
            className="footer-social-link"
            href={footerContent.facebook.href}
            target="_blank"
            rel="noreferrer"
            aria-label={footerContent.facebook.label}
          >
            <svg
              aria-hidden="true"
              className="footer-social-icon"
              viewBox="0 0 250 250"
              role="img"
            >
              <circle cx="125" cy="125" r="125" fill="#ffffff" />
              <path
                d="M143 250V137h38l6-44h-44V65c0-13 4-22 23-22h24V4c-4-1-18-2-35-2-35 0-58 21-58 60v31H58v44h39v113z"
                fill="#111111"
              />
            </svg>
            <span className="sr-only">{footerContent.facebook.label}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
