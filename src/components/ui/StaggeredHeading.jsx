import { motion, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

function StaggeredHeading({ parts, className, id }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.h2
      className={className}
      id={id}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.76, ease, staggerChildren: 0.12, delayChildren: 0.04 } },
      }}
    >
      {parts.map(({ text, emphasis }, index) => {
        const Part = emphasis ? motion.em : motion.span
        return (
          <Part
            key={index}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.56, ease } } }}
          >
            {text}
          </Part>
        )
      })}
    </motion.h2>
  )
}

export default StaggeredHeading
