import React, { useState } from 'react'
import './Footer.css'

function Footer() {
  const [expandedCategory, setExpandedCategory] = useState(null)

  const resourceCategories = [
    {
      id: 'tools',
      title: '🛠️ Essential Tools',
      icon: '🛠️',
      description: 'Tools to protect yourself right now',
      resources: [
        {
          name: 'Bitwarden',
          url: 'https://www.bitwarden.com',
          description: 'Free, open-source password manager',
          free: true
        },
        {
          name: '1Password',
          url: 'https://1password.com',
          description: 'Premium password manager (paid)',
          free: false
        },
        {
          name: 'Google Authenticator',
          url: 'https://www.google.com/landing/2step/',
          description: 'Free 2FA app for your phone',
          free: true
        },
        {
          name: 'Authy',
          url: 'https://authy.com',
          description: '2FA app with cloud backup',
          free: true
        },
        {
          name: 'Have I Been Pwned',
          url: 'https://haveibeenpwned.com',
          description: 'Check if your email was in a data breach',
          free: true
        }
      ]
    },
    {
      id: 'education',
      title: '📚 Learn More',
      icon: '📚',
      description: 'Stay informed about cybersecurity',
      resources: [
        {
          name: 'Krebs on Security',
          url: 'https://krebsonsecurity.com',
          description: 'Expert cybersecurity news and analysis',
          free: true
        },
        {
          name: 'EFF Privacy Guides',
          url: 'https://www.eff.org/issues/privacy',
          description: 'Privacy protection guides and tools',
          free: true
        },
        {
          name: 'CISA Cybersecurity Tips',
          url: 'https://www.cisa.gov/becybersmart',
          description: 'Government cybersecurity resources',
          free: true
        },
        {
          name: 'OWASP Top 10',
          url: 'https://owasp.org/www-project-top-ten/',
          description: 'Common web vulnerabilities explained',
          free: true
        }
      ]
    },
    {
      id: 'check',
      title: '🔍 Check Your Security',
      icon: '🔍',
      description: 'Test and verify your protections',
      resources: [
        {
          name: 'Have I Been Pwned',
          url: 'https://haveibeenpwned.com',
          description: 'Check breached accounts',
          free: true
        },
        {
          name: 'Firefox Monitor',
          url: 'https://monitor.firefox.com',
          description: 'Email breach monitoring',
          free: true
        },
        {
          name: 'Password Strength Checker',
          url: 'https://www.security.org/how-secure-is-my-password/',
          description: 'Test your password strength',
          free: true
        }
      ]
    }
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Remember</h3>
          <p className="footer-text">
            AI-powered attacks are real and happening now. But you're not powerless.
            The steps outlined here will significantly reduce your risk. Start with
            the critical items—password managers and two-factor authentication—and
            build from there.
          </p>
        </div>
        
        <div className="footer-section resources-section">
          <h3 className="footer-title">Resources</h3>
          <p className="footer-text" style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Click on any category to see helpful tools and resources organized by what you need.
          </p>
          
          <div className="resource-categories">
            {resourceCategories.map((category) => (
              <div key={category.id} className="resource-category">
                <button
                  className="resource-category-header"
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )}
                >
                  <div className="resource-category-title">
                    <span className="resource-icon">{category.icon}</span>
                    <div>
                      <h4 className="resource-category-name">{category.title}</h4>
                      <p className="resource-category-desc">{category.description}</p>
                    </div>
                  </div>
                  <span className="resource-expand-icon">
                    {expandedCategory === category.id ? '−' : '+'}
                  </span>
                </button>
                
                {expandedCategory === category.id && (
                  <div className="resource-list">
                    {category.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-item"
                      >
                        <div className="resource-item-content">
                          <div className="resource-item-header">
                            <span className="resource-item-name">{resource.name}</span>
                            {resource.free && (
                              <span className="resource-free-badge">FREE</span>
                            )}
                          </div>
                          <p className="resource-item-desc">{resource.description}</p>
                        </div>
                        <span className="resource-arrow">→</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">About This Project</h3>
          <p className="footer-text">
            This zine was created to raise awareness about AI-powered cybersecurity threats
            and provide actionable defense strategies. The threat landscape is changing rapidly,
            and education is our first line of defense.
          </p>
          <p className="footer-note">
            Document your use of AI tools in your own security practices. Stay informed.
            Stay protected.
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 How to Not Get Hacked by AGI</p>
        <p className="footer-warning">⚠️ The threat is real. The time is now.</p>
      </div>
    </footer>
  )
}

export default Footer
