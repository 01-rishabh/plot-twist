import { MotionConfig } from 'motion/react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Manifesto from './components/Manifesto.jsx'
import Register from './components/Register.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    // reducedMotion="user": transform animations are skipped for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Register />
      </main>
      <Footer />
    </MotionConfig>
  )
}
