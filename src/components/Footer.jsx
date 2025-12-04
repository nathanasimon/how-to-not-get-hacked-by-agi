import React from 'react'
import './Footer.css'

function Footer() {
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
        
        <div className="footer-section">
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-links">
            <li>
              <a href="https://www.eff.org/issues/privacy" target="_blank" rel="noopener noreferrer">
                Electronic Frontier Foundation - Privacy Guides
              </a>
            </li>
            <li>
              <a href="https://krebsonsecurity.com" target="_blank" rel="noopener noreferrer">
                Krebs on Security
              </a>
            </li>
            <li>
              <a href="https://haveibeenpwned.com" target="_blank" rel="noopener noreferrer">
                Have I Been Pwned - Check if your email was breached
              </a>
            </li>
            <li>
              <a href="https://www.bitwarden.com" target="_blank" rel="noopener noreferrer">
                Bitwarden - Free Password Manager
              </a>
            </li>
          </ul>
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
