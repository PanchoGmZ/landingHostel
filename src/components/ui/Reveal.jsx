import { motion, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

function Reveal({ as = 'div', variant = 'text', delay = 0, children, ...props }) {
  const reducedMotion = useReducedMotion()
  const Element = motion[as]

  const hidden = variant === 'feature'
    ? { opacity: 0, y: 42, scale: 1.04, clipPath: 'inset(0 0 14% 0)' }
    : variant === 'image'
      ? { opacity: 0, y: 24, scale: 1.02, clipPath: 'inset(0 0 7% 0)' }
      : variant === 'fade'
        ? { opacity: 0 }
        : { opacity: 0, y: variant === 'small' ? 10 : 20 }

  return (
    <Element
      initial={reducedMotion ? false : hidden}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -5% 0px' }}
      transition={{ duration: variant === 'feature' ? 1.08 : variant === 'image' ? 0.9 : 0.72, delay, ease }}
      {...props}
    >
      {children}
    </Element>
  )
}

export default Reveal
