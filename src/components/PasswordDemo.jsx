import React, { useState, useEffect } from 'react'
import './PasswordDemo.css'

function PasswordDemo() {
  const [password, setPassword] = useState('')
  const [analysis, setAnalysis] = useState(null)

  const commonPatterns = {
    birthday: /\b(19|20)\d{2}\b|\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12]\d|3[01])[\/\-](\d{2}|\d{4})\b/,
    year: /\b(19|20)\d{2}\b/,
    sequential: /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i,
    repeated: /(.)\1{2,}/,
    keyboard: /(qwer|asdf|zxcv|1234|qaz|wsx)/i,
    common: /(password|pass|admin|user|login|welcome|monkey|dragon|master|shadow)/i,
    name: /(john|jane|mike|sarah|david|emma|alex|chris|maria|robert)/i
  }

  const analyzePassword = (pwd) => {
    if (!pwd) {
      setAnalysis(null)
      return
    }

    const patterns = []
    const aiTactics = []
    let strength = 100
    let timeEstimate = 'Centuries'
    let aiTimeEstimate = 'Centuries'

    // Check for common patterns
    if (commonPatterns.birthday.test(pwd) || commonPatterns.year.test(pwd)) {
      patterns.push({
        type: 'Date/Year Pattern',
        detail: 'Contains what looks like a birth year or date',
        severity: 'critical'
      })
      aiTactics.push('AI scraped your birthdate from Facebook/LinkedIn and tried common date formats')
      strength -= 30
      timeEstimate = 'Minutes'
      aiTimeEstimate = 'Seconds'
    }

    if (commonPatterns.sequential.test(pwd)) {
      patterns.push({
        type: 'Sequential Characters',
        detail: 'Contains sequential letters or numbers (abc, 123, etc.)',
        severity: 'high'
      })
      aiTactics.push('AI detected sequential pattern - one of the first things it tries')
      strength -= 25
      if (timeEstimate === 'Centuries') {
        timeEstimate = 'Hours'
        aiTimeEstimate = 'Minutes'
      }
    }

    if (commonPatterns.repeated.test(pwd)) {
      patterns.push({
        type: 'Repeated Characters',
        detail: 'Contains repeated characters (aaa, 111, etc.)',
        severity: 'high'
      })
      aiTactics.push('AI recognized repeated character pattern')
      strength -= 20
    }

    if (commonPatterns.keyboard.test(pwd)) {
      patterns.push({
        type: 'Keyboard Pattern',
        detail: 'Follows keyboard layout (qwerty, asdf, etc.)',
        severity: 'high'
      })
      aiTactics.push('AI tried common keyboard patterns from billions of leaked passwords')
      strength -= 25
      if (timeEstimate === 'Centuries') {
        timeEstimate = 'Minutes'
        aiTimeEstimate = 'Seconds'
      }
    }

    if (commonPatterns.common.test(pwd)) {
      patterns.push({
        type: 'Common Word',
        detail: 'Contains a common password word',
        severity: 'critical'
      })
      aiTactics.push('AI checked this against a database of 10 billion+ leaked passwords')
      strength -= 40
      timeEstimate = 'Instant'
      aiTimeEstimate = 'Instant'
    }

    if (commonPatterns.name.test(pwd)) {
      patterns.push({
        type: 'Common Name',
        detail: 'Contains a common first name',
        severity: 'high'
      })
      aiTactics.push('AI scraped your social media for names of family, pets, or friends')
      strength -= 20
    }

    // Check length
    if (pwd.length < 8) {
      patterns.push({
        type: 'Too Short',
        detail: 'Less than 8 characters - trivially easy to crack',
        severity: 'critical'
      })
      strength -= 40
      timeEstimate = 'Instant'
      aiTimeEstimate = 'Instant'
    } else if (pwd.length < 12) {
      patterns.push({
        type: 'Short Length',
        detail: '8-11 characters - vulnerable to brute force',
        severity: 'high'
      })
      strength -= 20
    }

    // Check character variety
    const hasLower = /[a-z]/.test(pwd)
    const hasUpper = /[A-Z]/.test(pwd)
    const hasNumber = /\d/.test(pwd)
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd)
    const variety = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length

    if (variety < 2) {
      patterns.push({
        type: 'Low Character Variety',
        detail: 'Only uses one type of character (just lowercase, just numbers, etc.)',
        severity: 'critical'
      })
      strength -= 30
      if (timeEstimate === 'Centuries') {
        timeEstimate = 'Hours'
        aiTimeEstimate = 'Minutes'
      }
    } else if (variety < 3) {
      patterns.push({
        type: 'Limited Character Variety',
        detail: 'Could use more character types (uppercase, numbers, symbols)',
        severity: 'medium'
      })
      strength -= 15
    }

    // Common substitutions (l33t speak)
    if (/[0@!$]/i.test(pwd) && /[aeiols]/i.test(pwd)) {
      const hasObviousSubstitution =
        (pwd.includes('0') && pwd.toLowerCase().includes('o')) ||
        (pwd.includes('@') && pwd.toLowerCase().includes('a')) ||
        (pwd.includes('!') && pwd.toLowerCase().includes('i')) ||
        (pwd.includes('$') && pwd.toLowerCase().includes('s'))

      if (hasObviousSubstitution) {
        patterns.push({
          type: 'Predictable Substitution',
          detail: 'Uses common letter-to-symbol substitutions (@ for a, 0 for o, etc.)',
          severity: 'medium'
        })
        aiTactics.push('AI tried common substitutions like P@ssw0rd - these are in its training data')
        strength -= 15
      }
    }

    // Estimate time to crack
    const combinations = Math.pow(
      (hasLower ? 26 : 0) + (hasUpper ? 26 : 0) + (hasNumber ? 10 : 0) + (hasSpecial ? 32 : 0),
      pwd.length
    )

    // Traditional brute force (billions per second)
    const traditionalSeconds = combinations / 10000000000

    // AI-assisted (100x faster due to pattern recognition)
    const aiSeconds = traditionalSeconds / 100

    const formatTime = (seconds) => {
      if (seconds < 0.001) return 'Instant'
      if (seconds < 1) return 'Under 1 second'
      if (seconds < 60) return `${Math.ceil(seconds)} seconds`
      if (seconds < 3600) return `${Math.ceil(seconds / 60)} minutes`
      if (seconds < 86400) return `${Math.ceil(seconds / 3600)} hours`
      if (seconds < 2592000) return `${Math.ceil(seconds / 86400)} days`
      if (seconds < 31536000) return `${Math.ceil(seconds / 2592000)} months`
      if (seconds < 3153600000) return `${Math.ceil(seconds / 31536000)} years`
      return 'Centuries'
    }

    if (patterns.length === 0 && pwd.length >= 12 && variety >= 3) {
      aiTactics.push('This password is strong! AI would have to try random combinations, which takes a long time.')
    }

    setAnalysis({
      strength: Math.max(0, strength),
      patterns,
      aiTactics,
      timeEstimate: patterns.length > 0 ? timeEstimate : formatTime(traditionalSeconds),
      aiTimeEstimate: patterns.length > 0 ? aiTimeEstimate : formatTime(aiSeconds),
      isStrong: strength > 70 && pwd.length >= 12
    })
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      analyzePassword(password)
    }, 300)

    return () => clearTimeout(debounce)
  }, [password])

  const getStrengthColor = (strength) => {
    if (strength >= 70) return 'var(--accent)'
    if (strength >= 40) return 'var(--warning)'
    return 'var(--primary)'
  }

  const getStrengthLabel = (strength) => {
    if (strength >= 80) return 'Strong'
    if (strength >= 60) return 'Moderate'
    if (strength >= 30) return 'Weak'
    return 'Very Weak'
  }

  return (
    <div className="password-demo-container">
      <div className="password-demo-content">
        <h2 className="password-demo-title">How AI Cracks Your Password</h2>
        <p className="password-demo-intro">
          Type a password below to see how AI would crack it. AI doesn't just brute force—it
          predicts patterns, combines leaked data, and exploits human psychology.
        </p>

        <div className="password-input-section">
          <label htmlFor="password-test">Test a password:</label>
          <input
            id="password-test"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Try: Fluffy2015 or MyDog123!"
            className="password-input"
          />
          <p className="password-hint">
            Don't use a real password! This is for educational purposes.
          </p>
        </div>

        {analysis && (
          <div className="analysis-results">
            <div className="strength-meter">
              <div className="strength-bar-container">
                <div
                  className="strength-bar"
                  style={{
                    width: `${analysis.strength}%`,
                    backgroundColor: getStrengthColor(analysis.strength)
                  }}
                />
              </div>
              <div className="strength-label">
                Strength: <span style={{ color: getStrengthColor(analysis.strength) }}>
                  {getStrengthLabel(analysis.strength)} ({analysis.strength}/100)
                </span>
              </div>
            </div>

            <div className="crack-time-comparison">
              <div className="crack-time-card traditional">
                <h4>Traditional Brute Force</h4>
                <div className="time-estimate">{analysis.timeEstimate}</div>
                <p>Trying every possible combination without intelligence</p>
              </div>
              <div className="crack-time-card ai">
                <h4>AI-Powered Attack</h4>
                <div className="time-estimate ai">{analysis.aiTimeEstimate}</div>
                <p>Using pattern recognition and leaked password databases</p>
              </div>
            </div>

            {analysis.patterns.length > 0 && (
              <div className="vulnerabilities-section">
                <h3>🚨 Vulnerabilities Detected:</h3>
                <div className="vulnerabilities-list">
                  {analysis.patterns.map((pattern, idx) => (
                    <div key={idx} className={`vulnerability-card severity-${pattern.severity}`}>
                      <div className="vulnerability-header">
                        <strong>{pattern.type}</strong>
                        <span className={`severity-badge ${pattern.severity}`}>
                          {pattern.severity.toUpperCase()}
                        </span>
                      </div>
                      <p>{pattern.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.aiTactics.length > 0 && (
              <div className="ai-tactics-section">
                <h3>🤖 How AI Would Crack This:</h3>
                <ol className="ai-tactics-list">
                  {analysis.aiTactics.map((tactic, idx) => (
                    <li key={idx}>{tactic}</li>
                  ))}
                </ol>
              </div>
            )}

            {analysis.isStrong && (
              <div className="strong-password-message">
                ✅ This password is strong! It would take AI a very long time to crack through brute force.
                However, if it's ever leaked in a data breach, change it immediately.
              </div>
            )}
          </div>
        )}

        <div className="password-tips">
          <h3>How to Create AI-Resistant Passwords:</h3>
          <div className="tips-grid">
            <div className="tip-card good">
              <h4>✅ DO</h4>
              <ul>
                <li>Use 16+ characters</li>
                <li>Use a password manager to generate random passwords</li>
                <li>Use a passphrase: "correct-horse-battery-staple"</li>
                <li>Make every password unique</li>
                <li>Enable two-factor authentication</li>
              </ul>
            </div>
            <div className="tip-card bad">
              <h4>❌ DON'T</h4>
              <li>Use personal information (birthdays, names, pet names)</li>
              <li>Use dictionary words, even with numbers</li>
              <li>Use common substitutions (P@ssw0rd)</li>
              <li>Reuse passwords across sites</li>
              <li>Use anything shorter than 12 characters</li>
            </div>
          </div>

          <div className="password-manager-cta">
            <h4>The Reality: You Can't Remember Good Passwords</h4>
            <p>
              A truly AI-resistant password looks like: <code>K8$mP#qL2@vN9xR!dF4wT</code>
            </p>
            <p>
              You need a password manager like <strong>Bitwarden</strong> (free), <strong>1Password</strong>,
              or <strong>LastPass</strong> to generate and store unique passwords for every account.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordDemo
