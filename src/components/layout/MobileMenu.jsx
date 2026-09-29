import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { socials } from '../../data/socials.js'
import useMotionPreference from '../../hooks/useMotionPreference.js'

const ease = [0.22, 1, 0.36, 1]

function MobileMenu({ links }) {
  const [isOpen, setIsOpen] = useState(false)
  const reducedMotion = useMotionPreference()
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const pendingAnchorRef = useRef(null)
  const restoreFocusRef = useRef(false)

  const closeMenu = () => {
    restoreFocusRef.current = true
    setIsOpen(false)
  }

  const followAnchor = (event, href) => {
    event.preventDefault()
    pendingAnchorRef.current = href
    restoreFocusRef.current = false
    setIsOpen(false)
  }

  useLayoutEffect(() => {
    if (!isOpen) return undefined

    const body = document.body
    const app = document.getElementById('root')
    const scrollY = window.scrollY
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      inert: app?.inert,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    if (app) app.inert = true

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        restoreFocusRef.current = true
        setIsOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = [...panelRef.current.querySelectorAll('a[href], button:not([disabled])')]
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first) return
      if (event.shiftKey && (document.activeElement === first || !panelRef.current.contains(document.activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !panelRef.current.contains(document.activeElement))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeydown)
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.left = previous.left
      body.style.right = previous.right
      body.style.width = previous.width
      body.style.overflow = previous.overflow
      if (app) app.inert = previous.inert
      window.scrollTo({ top: scrollY, behavior: 'instant' })
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (isOpen || !pendingAnchorRef.current) return
    const href = pendingAnchorRef.current
    pendingAnchorRef.current = null

    requestAnimationFrame(() => {
      const target = document.getElementById(href.slice(1))
      if (!target) return
      window.history.pushState(null, '', href)
      target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })

      const focusTarget = target.querySelector('h1, h2') ?? target
      const hadTabIndex = focusTarget.hasAttribute('tabindex')
      if (!hadTabIndex) focusTarget.setAttribute('tabindex', '-1')
      focusTarget.focus({ preventScroll: true })
      if (!hadTabIndex) focusTarget.addEventListener('blur', () => focusTarget.removeAttribute('tabindex'), { once: true })
    })
  }, [isOpen, reducedMotion])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 78rem)')
    const closeAtDesktop = () => {
      if (!query.matches) {
        restoreFocusRef.current = false
        setIsOpen(false)
      }
    }
    query.addEventListener('change', closeAtDesktop)
    return () => query.removeEventListener('change', closeAtDesktop)
  }, [])

  const panelVariants = {
    closed: { x: reducedMotion ? 0 : '100%', transition: { duration: reducedMotion ? 0.01 : 0.38, ease } },
    open: { x: 0, transition: { duration: reducedMotion ? 0.01 : 0.44, ease } },
  }
  const backdropVariants = {
    closed: { opacity: 0, transition: { duration: reducedMotion ? 0.01 : 0.27 } },
    open: { opacity: 1, transition: { duration: reducedMotion ? 0.01 : 0.34 } },
  }
  return (
    <>
      <div className="navbar__mobile-menu">
        <button
          ref={triggerRef}
          className="navbar__menu-trigger"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          aria-controls={isOpen ? 'mobile-navigation-panel' : undefined}
          onClick={() => { restoreFocusRef.current = false; setIsOpen(true) }}
        >
          Menú
        </button>
      </div>

      {createPortal(
        <AnimatePresence initial={false} onExitComplete={() => {
          if (!isOpen && restoreFocusRef.current) {
            triggerRef.current?.focus()
            restoreFocusRef.current = false
          }
        }}>
          {isOpen && (
            <motion.div className="mobile-menu__layer" key="mobile-menu" initial="closed" animate="open" exit={reducedMotion ? undefined : 'closed'}>
              <motion.div className="mobile-menu__backdrop" variants={backdropVariants} aria-hidden="true" onClick={closeMenu} />
              <motion.aside
                ref={panelRef}
                className="mobile-menu__panel"
                id="mobile-navigation-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Menú de navegación"
                variants={panelVariants}
              >
                <div className="mobile-menu__header">
                  <a className="mobile-menu__logo" href="#inicio" aria-label="Pata y Perro, ir al inicio" onClick={(event) => followAnchor(event, '#inicio')}>
                    <img src="/images/brand/logo.png" alt="" width="1259" height="1162" />
                  </a>
                  <button ref={closeRef} className="mobile-menu__close" type="button" aria-label="Cerrar menú" onClick={closeMenu}>
                    <X aria-hidden="true" size={23} strokeWidth={1.8} />
                  </button>
                </div>

                <nav className="mobile-menu__nav" aria-label="Navegación móvil">
                  <ul>
                    {links.map(({ label, href }, index) => (
                      <motion.li
                        key={href}
                        initial={reducedMotion ? false : { y: 12 }}
                        animate={{ y: 0 }}
                        transition={{ duration: reducedMotion ? 0.01 : 0.38, delay: reducedMotion ? 0 : 0.12 + index * 0.055, ease }}
                      >
                        <a href={href} onClick={(event) => followAnchor(event, href)}>{label}</a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="mobile-menu__footer">
                  <div className="mobile-menu__socials">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={social.href.startsWith('#') ? (event) => followAnchor(event, social.href) : closeMenu}
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                  <p>Pata y Perro Hostel Cultural</p>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

export default MobileMenu
