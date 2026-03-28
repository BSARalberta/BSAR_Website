import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navigation } from '../content/siteContent'
import ImagePlaceholder from './ImagePlaceholder'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/" onClick={() => setIsOpen(false)}>
          <ImagePlaceholder
            src="/images/BSAR_logo.jpg"
            alt="Badlands Search and Rescue logo placeholder"
            label="Logo placeholder"
            className="brand-mark"
          />
          <span className="brand-text">
            <span className="brand-name">Badlands Search and Rescue</span>
            <a className="brand-tag" href="tel:+18552997738">
              Tasking Agencies Only: +1-855-299-7738
            </a>
          </span>
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          Menu
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav ${isOpen ? 'site-nav-open' : ''}`}
          aria-label="Primary"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link${isActive ? ' nav-link-active' : ''}`
              }
              onClick={() => setIsOpen(false)}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
