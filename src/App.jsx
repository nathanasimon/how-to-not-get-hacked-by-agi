import React, { useState } from 'react'
import Cover from './components/Cover'
import Section from './components/Section'
import InteractiveDemo from './components/InteractiveDemo'
import VoiceCloningDemo from './components/VoiceCloningDemo'
import ProtectionGuide from './components/ProtectionGuide'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    {
      id: 'cover',
      component: <Cover onStart={() => setCurrentSection(1)} />
    },
    {
      id: 'intro',
      title: 'The New Reality',
      content: `In September 2025, Chinese state-sponsored hackers used Claude AI to autonomously hack approximately 30 organizations—executing 80-90% of the attack without human intervention.

In February 2024, a finance worker at Arup transferred $25.6 million to fraudsters after a video call with deepfaked colleagues who looked and sounded completely real.

In July 2025, Sharon Brightwell sent $15,000 to scammers after receiving a call from her "daughter" begging for help. The voice was AI-generated from 3 seconds of audio scraped from social media.

This isn't coming. It's here. Generative AI has changed everything, and your family is vulnerable right now.`
    },
    {
      id: 'how-hacked',
      title: 'Real Attacks, Real Damage',
      component: <InteractiveDemo />
    },
    {
      id: 'voice-demo',
      title: 'How Your Grandparents Will Get Scammed',
      component: <VoiceCloningDemo />
    },
    {
      id: 'protect',
      title: 'How to Protect Yourself',
      component: <ProtectionGuide />
    }
  ]

  const handleScroll = (e) => {
    const scrollPosition = window.scrollY + window.innerHeight / 2
    const sectionElements = document.querySelectorAll('.section')
    
    sectionElements.forEach((section, index) => {
      const top = section.offsetTop
      const bottom = top + section.offsetHeight
      
      if (scrollPosition >= top && scrollPosition < bottom) {
        setCurrentSection(index)
      }
    })
  }

  React.useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-content">
          <span className="nav-title">HOW TO NOT GET HACKED BY AGI</span>
          <div className="nav-dots">
            {sections.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${currentSection === index ? 'active' : ''}`}
                onClick={() => {
                  const section = document.querySelectorAll('.section')[index]
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </nav>

      <main>
        {sections.map((section, index) => (
          <div key={section.id} className="section">
            {section.component || (
              <Section title={section.title} content={section.content} />
            )}
          </div>
        ))}
      </main>

      <Footer />
    </div>
  )
}

export default App
