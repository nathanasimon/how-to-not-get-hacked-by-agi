import React, { useState } from 'react'
import Cover from './components/Cover'
import Section from './components/Section'
import InteractiveDemo from './components/InteractiveDemo'
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
      title: 'AI Hackers Are Dangerous',
      content: `The cybersecurity landscape is fundamentally changing. AI-powered hacking tools are democratizing sophisticated cyberattacks, making them accessible to anyone with an internet connection and a subscription to an AI service.

Tools like Claude Code and other autonomous AI systems can now independently execute complex technical tasks that previously required years of human expertise. This isn't science fiction—it's happening right now.

What makes AI hackers particularly dangerous is their ability to:
- Work 24/7 without fatigue
- Scale attacks across thousands of targets simultaneously
- Learn and adapt from each attempt
- Generate convincing phishing content in any language
- Automate vulnerability discovery and exploitation

The barrier to entry for sophisticated cyberattacks has collapsed. We need to act now.`
    },
    {
      id: 'how-hacked',
      title: 'How You Will Be Hacked',
      component: <InteractiveDemo />
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
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
