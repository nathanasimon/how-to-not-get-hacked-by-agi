import React, { useState } from 'react'
import './PhishingDemo.css'

function PhishingDemo() {
  const [selectedEmail, setSelectedEmail] = useState(0)
  const [revealedFlags, setRevealedFlags] = useState([])

  const emails = [
    {
      id: 0,
      title: 'Traditional Obvious Phishing (Old School)',
      from: 'paypal_security@paypa1-secure.com',
      subject: 'URGENT: Your account has been suspended!!!',
      body: `Dear Customer,

Your PayPal account has been suspended due to unusual activity. You must verify your information immediately or your account will be permanently closed.

Click here to verify now: http://paypa1-secure.com/verify

Thank you,
PayPal Security Team`,
      redFlags: [
        {
          id: 1,
          text: 'Suspicious email address',
          detail: 'paypal_security@paypa1-secure.com uses "1" instead of "l" in "paypal"',
          highlight: 'paypa1-secure.com',
          severity: 'critical'
        },
        {
          id: 2,
          text: 'Generic greeting',
          detail: 'Real companies use your actual name, not "Dear Customer"',
          highlight: 'Dear Customer',
          severity: 'high'
        },
        {
          id: 3,
          text: 'Urgency and threats',
          detail: 'Creates panic with "must verify immediately" and "permanently closed"',
          highlight: 'must verify your information immediately or your account will be permanently closed',
          severity: 'critical'
        },
        {
          id: 4,
          text: 'Suspicious URL',
          detail: 'The domain doesn\'t match PayPal\'s official domain (paypal.com)',
          highlight: 'http://paypa1-secure.com/verify',
          severity: 'critical'
        },
        {
          id: 5,
          text: 'Poor grammar/punctuation',
          detail: 'Multiple exclamation marks and awkward phrasing',
          highlight: '!!!',
          severity: 'medium'
        }
      ]
    },
    {
      id: 1,
      title: 'AI-Generated Phishing (2025)',
      from: 'security@paypal.com',
      subject: 'Security notice regarding your recent transaction',
      body: `Hi Sarah,

We noticed a payment of $847.23 to TechGear Solutions on December 9th that appears unusual based on your typical purchasing patterns. This transaction was flagged by our automated security systems.

If you recognize this transaction, no action is needed. However, if you didn't authorize this payment, please review your recent activity using the secure link below:

https://paypal.com/activity/review?session=a8f4k2m9

This link will expire in 24 hours for your security.

Best regards,
PayPal Security Team
Transaction ID: PP-8472-9384-2847`,
      redFlags: [
        {
          id: 1,
          text: 'Personalized greeting',
          detail: 'AI scraped your name from social media or data breaches. This LOOKS legitimate.',
          highlight: 'Hi Sarah',
          severity: 'critical'
        },
        {
          id: 2,
          text: 'Specific transaction details',
          detail: 'AI invents realistic amounts and dates to seem credible. The detail makes you trust it.',
          highlight: '$847.23 to TechGear Solutions on December 9th',
          severity: 'critical'
        },
        {
          id: 3,
          text: 'Sender address looks real',
          detail: 'The "From" address appears legitimate, but email addresses can be spoofed. Always check the actual domain.',
          highlight: 'security@paypal.com',
          severity: 'critical'
        },
        {
          id: 4,
          text: 'Subtle urgency',
          detail: 'Instead of screaming "URGENT!!!", it casually mentions "24 hours" which creates pressure without seeming suspicious.',
          highlight: 'This link will expire in 24 hours',
          severity: 'high'
        },
        {
          id: 5,
          text: 'Professional formatting',
          detail: 'Perfect grammar, realistic transaction ID, natural language. AI makes it look identical to real PayPal emails.',
          highlight: 'Transaction ID: PP-8472-9384-2847',
          severity: 'high'
        },
        {
          id: 6,
          text: 'Clever URL trick',
          detail: 'The URL DISPLAYS "paypal.com" but could redirect to a fake site. Hover over links to see the real destination.',
          highlight: 'https://paypal.com/activity/review?session=a8f4k2m9',
          severity: 'critical'
        }
      ]
    }
  ]

  const toggleFlag = (flagId) => {
    if (revealedFlags.includes(flagId)) {
      setRevealedFlags(revealedFlags.filter(id => id !== flagId))
    } else {
      setRevealedFlags([...revealedFlags, flagId])
    }
  }

  const revealAll = () => {
    const allFlags = emails[selectedEmail].redFlags.map(f => f.id)
    setRevealedFlags(allFlags)
  }

  const resetFlags = () => {
    setRevealedFlags([])
  }

  const changeEmail = (emailId) => {
    setSelectedEmail(emailId)
    setRevealedFlags([])
  }

  const currentEmail = emails[selectedEmail]

  return (
    <div className="phishing-demo-container">
      <div className="phishing-demo-content">
        <h2 className="phishing-demo-title">Spot The Phishing Email</h2>
        <p className="phishing-demo-intro">
          Click on the email below to find red flags. Compare old-school obvious phishing
          vs. AI-generated phishing that's 4.5x more effective.
        </p>

        <div className="email-selector">
          {emails.map((email) => (
            <button
              key={email.id}
              className={`email-select-btn ${selectedEmail === email.id ? 'active' : ''}`}
              onClick={() => changeEmail(email.id)}
            >
              {email.title}
            </button>
          ))}
        </div>

        <div className="email-display">
          <div className="email-header">
            <div className="email-meta">
              <div className="email-field">
                <strong>From:</strong> <span className="email-from">{currentEmail.from}</span>
              </div>
              <div className="email-field">
                <strong>Subject:</strong> <span className="email-subject">{currentEmail.subject}</span>
              </div>
            </div>
          </div>

          <div className="email-body">
            {currentEmail.body}
          </div>

          <div className="email-controls">
            <button className="reveal-btn" onClick={revealAll}>
              Reveal All Red Flags
            </button>
            <button className="reset-btn" onClick={resetFlags}>
              Reset
            </button>
            <div className="flag-counter">
              {revealedFlags.length} / {currentEmail.redFlags.length} flags found
            </div>
          </div>
        </div>

        <div className="red-flags-list">
          <h3>Red Flags to Look For:</h3>
          <div className="flags-grid">
            {currentEmail.redFlags.map((flag) => (
              <div
                key={flag.id}
                className={`flag-card ${revealedFlags.includes(flag.id) ? 'revealed' : 'hidden'} severity-${flag.severity}`}
                onClick={() => toggleFlag(flag.id)}
              >
                <div className="flag-header">
                  <span className="flag-icon">
                    {revealedFlags.includes(flag.id) ? '🚩' : '❓'}
                  </span>
                  <span className="flag-text">{flag.text}</span>
                </div>
                {revealedFlags.includes(flag.id) && (
                  <div className="flag-details">
                    <p><strong>What to look for:</strong> "{flag.highlight}"</p>
                    <p>{flag.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="phishing-warning">
          <h3>The Difference</h3>
          <div className="comparison-grid">
            <div className="comparison-old">
              <h4>Old Phishing (2020)</h4>
              <ul>
                <li>Obvious typos and grammar errors</li>
                <li>Generic "Dear Customer" greetings</li>
                <li>Suspicious email addresses</li>
                <li>Overly urgent language</li>
                <li><strong>12% click-through rate</strong></li>
              </ul>
            </div>
            <div className="comparison-new">
              <h4>AI Phishing (2025)</h4>
              <ul>
                <li>Perfect grammar and formatting</li>
                <li>Uses your real name</li>
                <li>Spoofed legitimate addresses</li>
                <li>Subtle psychological manipulation</li>
                <li><strong>54% click-through rate</strong></li>
              </ul>
            </div>
          </div>
          <p className="comparison-note">
            AI-generated phishing is <strong>4.5 times more effective</strong> because it's trained
            on millions of real emails and can personalize attacks based on your public information.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PhishingDemo
