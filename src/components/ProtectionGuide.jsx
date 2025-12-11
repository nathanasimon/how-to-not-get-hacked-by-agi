import React, { useState } from 'react'
import './ProtectionGuide.css'

function ProtectionGuide() {
  const [expandedCard, setExpandedCard] = useState(null)

  const protections = [
    {
      id: 'family-code',
      title: 'Family Code Word',
      priority: 'critical',
      icon: '1',
      quickTip: 'AI can clone voices, but not your family secrets',
      details: `Create a secret code word or phrase that only your immediate family knows. If someone calls claiming to be in an emergency and needs money, ask for the code word before doing ANYTHING.

AI can perfectly clone your child's, grandchild's, or spouse's voice from 3 seconds of audio on social media. But it can't know your family's secret word.

This is the SINGLE most effective defense against voice cloning scams that have cost families $15,000-$50,000+ in single incidents.`,
      actionSteps: [
        'Choose a random, memorable phrase (NOT a pet name or birthday)',
        'Examples: "purple elephant tornado", "Grandma\'s secret recipe is terrible", "What did Uncle Bob say at Thanksgiving 2019?"',
        'Share it ONLY with immediate family members in person or via secure messaging',
        'Practice it with elderly family members so they remember',
        'If someone calls in "emergency" and can\'t provide the code word, it\'s a scam'
      ]
    },
    {
      id: 'verify-callback',
      title: 'Hang Up and Call Back',
      priority: 'critical',
      icon: '2',
      quickTip: 'If it sounds urgent, it\'s probably a scam',
      details: `If ANYONE calls with an emergency—even if it sounds exactly like your family member—hang up and call them back using a number you have saved.

Do not use any number they provide. Do not call back immediately on the same line. Call the person's real number, or contact another family member to verify.

Real emergencies can wait 2 minutes for verification. Scammers will pressure you to act immediately without thinking.`,
      actionSteps: [
        'Say: "I\'ll call you right back" and hang up',
        'Call the person using their real saved contact number',
        'OR call another family member to verify the story',
        'If they say "don\'t tell anyone" or "don\'t call anyone else" - it\'s a scam',
        'Real family members won\'t be upset that you verified'
      ]
    },
    {
      id: 'elderly-protection',
      title: 'Warn Your Parents & Grandparents',
      priority: 'critical',
      icon: '3',
      quickTip: 'Seniors lost $1B to AI scams in 2024',
      details: `In 2024, Canadians lost nearly $3 million to grandparent scams, with an average loss of $11,000 per victim. Some lost $50,000+.

Elderly people are targeted because they:
- Are less familiar with AI technology
- Are more trusting of voices that sound like family
- Are more likely to help without questioning
- Often have savings accessible for "emergencies"

Have explicit conversations with your parents and grandparents about voice cloning scams. Set up the family code word WITH them.`,
      actionSteps: [
        'Sit down with elderly family members and explain voice cloning',
        'Show them examples (play them the Arup deepfake story)',
        'Establish the family code word and make them practice it',
        'Tell them: "Even if it sounds exactly like me, ask for the code word"',
        'Set up their phone to show caller ID and teach them not to trust it',
        'Consider limiting their social media videos that contain voices'
      ]
    },
    {
      id: '2fa',
      title: 'Two-Factor Authentication',
      priority: 'critical',
      icon: '4',
      quickTip: 'Stops AI from accessing accounts even with your password',
      details: `Two-factor authentication (2FA) adds a second layer of security. Even if AI discovers your password through a data breach or social engineering, it can't access your account without the second factor.

Use an authenticator app (Google Authenticator, Authy, or 1Password) instead of SMS when possible. SMS can be intercepted through SIM swapping attacks.`,
      actionSteps: [
        'Install an authenticator app on your phone',
        'Enable 2FA on email, banking, social media, and work accounts',
        'Save backup codes in your password manager',
        'NEVER share your 2FA codes with anyone—even if they sound like your bank'
      ]
    },
    {
      id: 'phishing',
      title: 'Verify Before You Click',
      priority: 'high',
      icon: '5',
      quickTip: 'Check sender email addresses carefully',
      details: `AI-generated phishing emails are getting more convincing. Always verify the sender's email address, not just the display name. Look for subtle misspellings or unusual domains.

Hover over links before clicking to see the actual URL. If something seems urgent or unusual, contact the person through a different channel to verify.`,
      actionSteps: [
        'Check the full email address, not just the name',
        'Hover over links to see real URLs before clicking',
        'Be suspicious of urgent requests, especially about money',
        'When in doubt, contact the sender through a different channel'
      ]
    },
    {
      id: 'updates',
      title: 'Keep Software Updated',
      priority: 'high',
      icon: '6',
      quickTip: 'Enable automatic updates',
      details: `Software updates often include security patches for newly discovered vulnerabilities. AI-powered attacks exploit known vulnerabilities, so keeping software updated closes those attack vectors.

Enable automatic updates on your operating system, browsers, and critical applications.`,
      actionSteps: [
        'Enable automatic updates on your devices',
        'Update your operating system regularly',
        'Keep browsers and plugins updated',
        "Don't ignore update notifications"
      ]
    },
    {
      id: 'privacy',
      title: 'Limit Public Information',
      priority: 'medium',
      icon: '7',
      quickTip: 'Review your social media privacy settings',
      details: `AI uses publicly available information to craft targeted attacks. The less information available about you online, the harder it is for AI to create convincing phishing attempts or guess your passwords.

Review privacy settings on social media platforms. Consider what information you're sharing publicly that could be used against you.`,
      actionSteps: [
        'Review and tighten privacy settings on social media',
        'Remove personal information from public profiles',
        'Be cautious about sharing location, birthday, pet names',
        'Consider using a pseudonym for some online accounts'
      ]
    },
    {
      id: 'backup',
      title: 'Back Up Your Data',
      priority: 'medium',
      icon: '8',
      quickTip: 'Use the 3-2-1 rule',
      details: `Regular backups protect you from ransomware and data loss. Follow the 3-2-1 rule: 3 copies of your data, 2 different media types, 1 copy offsite.

Even if you're hacked, you can recover your data without paying ransom or losing important files.`,
      actionSteps: [
        'Set up automatic cloud backups (iCloud, Google Drive, Dropbox)',
        'Use an external hard drive for local backups',
        'Test your backups to ensure they work',
        'Back up important files at least weekly'
      ]
    },
    {
      id: 'email',
      title: 'Use Separate Email Addresses',
      priority: 'low',
      icon: '9',
      quickTip: 'One for important accounts, one for everything else',
      details: `Use one email address for critical accounts (banking, work, main email) and another for shopping, newsletters, and less important services. This limits the damage if one account is compromised.

If your shopping email gets breached, attackers can't use it to reset passwords on your banking account.`,
      actionSteps: [
        'Create a separate email for shopping/newsletters',
        'Use your primary email only for critical accounts',
        'Consider using email aliases for different purposes',
        'Monitor both email accounts for suspicious activity'
      ]
    },
    {
      id: 'monitoring',
      title: 'Monitor Your Accounts',
      priority: 'medium',
      icon: '10',
      quickTip: 'Check bank statements and credit reports regularly',
      details: `Regular monitoring helps you catch unauthorized access early. Check bank and credit card statements monthly. Use free credit monitoring services to watch for suspicious activity.

The faster you detect a breach, the less damage can be done.`,
      actionSteps: [
        'Review bank and credit card statements monthly',
        'Sign up for free credit monitoring (Credit Karma, etc.)',
        'Enable transaction alerts on financial accounts',
        'Check your email for login notifications from services'
      ]
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'var(--primary)'
      case 'high':
        return 'var(--warning)'
      case 'medium':
        return 'var(--accent)'
      default:
        return 'rgba(255, 255, 255, 0.5)'
    }
  }

  return (
    <div className="protection-container">
      <div className="protection-content">
        <h2 className="protection-title">How to Protect Yourself</h2>
        <p className="protection-intro">
          These practical steps will significantly reduce your risk. Start with the critical
          priority items—they provide the most protection with the least effort.
        </p>

        <div className="protections-grid">
          {protections.map((protection) => (
            <div
              key={protection.id}
              className={`protection-card ${expandedCard === protection.id ? 'expanded' : ''}`}
              style={{ borderColor: getPriorityColor(protection.priority) }}
            >
              <div
                className="protection-card-header"
                onClick={() =>
                  setExpandedCard(
                    expandedCard === protection.id ? null : protection.id
                  )
                }
              >
                <div className="protection-icon">{protection.icon}</div>
                <div className="protection-header-text">
                  <h3 className="protection-card-title">{protection.title}</h3>
                  <div className="protection-meta">
                    <span
                      className="protection-priority"
                      style={{ color: getPriorityColor(protection.priority) }}
                    >
                      {protection.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className="protection-quick-tip">
                      {protection.quickTip}
                    </span>
                  </div>
                </div>
                <button className="expand-button">
                  {expandedCard === protection.id ? '−' : '+'}
                </button>
              </div>

              {expandedCard === protection.id && (
                <div className="protection-card-body">
                  <p className="protection-details">{protection.details}</p>
                  <div className="action-steps">
                    <h4 className="action-steps-title">Action Steps:</h4>
                    <ol className="action-steps-list">
                      {protection.actionSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="protection-summary">
          <h3 className="summary-title">Quick Start Checklist</h3>
          <div className="checklist">
            {protections
              .filter((p) => p.priority === 'critical')
              .map((protection) => (
                <div key={protection.id} className="checklist-item">
                  <span className="checklist-icon">☐</span>
                  <span>{protection.title}</span>
                </div>
              ))}
          </div>
          <p className="summary-note">
            Complete these critical items first. They provide the most protection against
            AI-powered attacks. Then work through the high and medium priority items as time allows.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProtectionGuide
