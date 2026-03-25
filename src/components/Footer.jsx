import { NavLink } from 'react-router-dom'
import { footerContent, navigation } from '../content/siteContent'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{footerContent.organization}</p>
          <p className="footer-copy">
            Community-focused volunteer search and rescue website starter.
          </p>
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
          <p className="footer-heading">{footerContent.contactLabel}</p>
          <p className="footer-copy">{footerContent.contactValue}</p>
          <p className="footer-heading">{footerContent.socialLabel}</p>
          <p className="footer-copy">{footerContent.socialValue}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
