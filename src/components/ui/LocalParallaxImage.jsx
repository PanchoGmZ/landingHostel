import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

function LocalParallaxImage({ style, ...props }) {
  const imageRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 47.99rem)').matches)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-10, 10])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 47.99rem)')
    const update = () => setIsMobile(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <motion.img
      {...props}
      ref={imageRef}
      style={{ ...style, y: reducedMotion || isMobile ? 0 : y, scale: reducedMotion || isMobile ? 1 : 1.06 }}
    />
  )
}

export default LocalParallaxImage
