import React, { useState } from 'react'
import './InteractiveDemo.css'

function InteractiveDemo() {
  const [selectedAttack, setSelectedAttack] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const attacks = [
    {
      id: 'deepfake',
      title: 'Deepfake Video Conference Fraud',
      icon: 'VIDEO',
      description: 'AI creates fake video calls with your entire team',
      severity: 'CRITICAL',
      stats: '$25.6M stolen in one incident',
      details: `In February 2024, a finance worker at British engineering firm Arup joined what appeared to be a routine video call with the company's CFO and several colleagues. Everyone looked real. Everyone sounded real. The "CFO" asked him to make several urgent wire transfers.

He transferred $25.6 million over 15 transactions. Every person on that call was a deepfake—AI-generated video and audio trained on publicly available company videos.

The scam lasted a week before he checked with the UK head office and realized he'd been tricked.`,
      realExample: 'Arup Group, February 2024 - Hong Kong office. This was the FIRST known case of an entire group video call being deepfaked. The fraudsters used publicly available footage to recreate the CFO and multiple staff members. Total loss: $25.6 million.',
      whyItWorked: [
        'Multiple "people" on the call added credibility',
        'Deepfakes were trained on real company videos',
        'The request seemed urgent but not unusual',
        'Video calls feel more trustworthy than emails'
      ],
      sources: [
        'https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk',
        'https://fortune.com/europe/2024/05/17/arup-deepfake-fraud-scam-victim-hong-kong-25-million-cfo/'
      ]
    },
    {
      id: 'autonomous',
      title: 'Fully Autonomous AI Hacking',
      icon: 'AUTO',
      description: 'AI that hacks without human intervention',
      severity: 'CRITICAL',
      stats: '90% autonomous attack execution',
      details: `In September 2025, Chinese state-sponsored hackers used Anthropic's Claude AI to execute cyber espionage attacks on approximately 30 organizations—including tech companies, financial institutions, chemical manufacturers, and government agencies.

The AI operated with 80-90% autonomy, executing reconnaissance, vulnerability discovery, exploitation, lateral movement, credential harvesting, data analysis, and exfiltration—all without human guidance. Humans just selected targets and let the AI loose.

In separate research, Anthropic's Claude AI autonomously discovered TWO zero-day vulnerabilities in cryptocurrency smart contracts worth $3,694 in simulated profit by scanning 2,849 recently deployed contracts.`,
      realExample: 'Mid-September 2025 - Anthropic detected and disrupted what they called "the first reported AI-orchestrated cyber espionage campaign." The AI discovered vulnerabilities, wrote exploit code, and exfiltrated data largely on its own. Anthropic warned this represents a "critical inflection point" in cybersecurity.',
      whyItWorked: [
        'AI works 24/7 at "physically impossible request rates"',
        'Discovers and exploits vulnerabilities humans might miss',
        'Scales to dozens of targets simultaneously',
        'Learns and adapts from each attempt'
      ],
      sources: [
        'https://www.anthropic.com/news/disrupting-AI-espionage',
        'https://therecord.media/chinese-hackers-anthropic-cyberattacks'
      ]
    },
    {
      id: 'phishing',
      title: 'AI-Generated Phishing Emails',
      icon: 'MAIL',
      description: 'Perfectly crafted emails that bypass your instincts',
      severity: 'HIGH',
      stats: '202% increase in phishing emails (2024)',
      details: `AI-generated phishing emails now achieve a 54% click-through rate compared to just 12% for traditional phishing. That's 4.5x more effective.

In 2024, phishing email volume increased by 202%. By 2025, 82.6% of all phishing emails use AI language models—a 53.5% increase from 2024. Microsoft recorded a 46% rise in AI-generated phishing content in their Cyber Signals 2025 report.

These aren't obvious scams anymore. AI analyzes your social media, writing patterns, and public information to craft messages that feel personal and legitimate. The grammar is perfect. The context is accurate. The urgency feels real.

Tools like WormGPT and FraudGPT are sold on dark web forums specifically for crafting "flawless" phishing emails. WormGPT was introduced on June 28, 2023. FraudGPT followed on July 25, 2023, offered for $200/month to $1,700/year. In 2024, mentions of these dark AI tools increased by 219% on cybercrime forums.`,
      realExample: 'In April 2024, a LastPass employee was targeted by an AI voice-cloning scam impersonating CEO Karim Toubba. The employee didn\'t fall for it—but it was sophisticated enough to warrant a company-wide warning. The attacker likely trained the AI on public videos and interviews with the CEO.',
      whyItWorked: [
        'AI analyzes public information to personalize messages',
        'Perfect grammar and natural language',
        'Understands company hierarchies and relationships',
        'Can operate at massive scale across thousands of targets'
      ],
      sources: [
        'https://tech-adv.com/blog/ai-cyber-attack-statistics/',
        'https://www.rapid7.com/blog/post/ai-goes-on-offense-how-llms-are-redefining-the-cybercrime-landscape/'
      ]
    },
    {
      id: 'malware',
      title: 'AI-Powered Malware Creation',
      icon: 'VIRUS',
      description: 'Self-evolving malware that adapts to defenses',
      severity: 'HIGH',
      stats: '41% of ransomware uses AI components',
      details: `In April 2024, Cornell researchers revealed "Morris II"—a worm that uses AI to infiltrate systems and extract sensitive information like credit card details and Social Security numbers.

As of 2025, 41% of ransomware families now include AI components for adaptive payload delivery. This means the malware can modify itself in real-time to evade detection.

AI-powered DDoS attacks reached a record high of 2.1 million unique incidents in 2025. 35% of botnet operations now incorporate machine learning algorithms to evade detection and adapt in real-time.

The average cost of an AI-powered data breach in 2025: $5.72 million—a 13% increase over the previous year.`,
      realExample: 'Morris II Worm (April 2024) - Named after the infamous 1988 Morris Worm, this new variant uses AI to autonomously spread and extract data. Healthcare saw a 76% rise in targeted AI attacks in 2025, largely from automated ransomware deployment.',
      whyItWorked: [
        'AI adapts malware to bypass security tools',
        'Learns from failed attempts and evolves',
        'Can generate polymorphic code (changes each time)',
        'Operates faster than human security teams can respond'
      ],
      sources: [
        'https://sqmagazine.co.uk/ai-cyber-attacks-statistics/',
        'https://www.sentinelone.com/cybersecurity-101/cybersecurity/cyber-security-statistics/'
      ]
    },
    {
      id: 'scale',
      title: 'Industrial-Scale Attack Campaigns',
      icon: 'SCALE',
      description: 'Thousands of simultaneous attacks, fully automated',
      severity: 'CRITICAL',
      stats: '28M+ AI-driven attacks in 2025',
      details: `This isn't about individual hackers anymore. It's about industrial-scale automated attack campaigns.

In 2025, global AI-driven cyberattacks are projected to surpass 28 million incidents—a 72% year-over-year increase. An estimated 40% of all cyberattacks are now AI-driven.

87% of organizations report experiencing an AI-driven cyberattack in the past year.

Financial losses from deepfake-enabled fraud exceeded $200 million in Q1 2025 alone. There were 19% MORE deepfake incidents in the first quarter of 2025 than in ALL of 2024 combined (179 incidents in Q1 2025).

North America experienced 39% of all AI-driven incidents in 2025. Europe accounted for 28%. Asia-Pacific saw a 56% rise in AI-enabled attacks.

Financial services is the most targeted industry (33% of all AI-driven incidents). Manufacturing accounts for 25.7% of attacks. Healthcare attacks increased 76%.

The FBI's 2025 IC3 report logged a 37% rise in AI-assisted business email compromise (BEC).`,
      realExample: 'In November 2024 alone, at least FIVE major nation-state cyberattack events occurred involving China, Iran, South Korea, and Russia—including the Salt Typhoon data breach. These weren\'t individual hackers; they were state-sponsored campaigns using AI for automation and scale.',
      whyItWorked: [
        'AI operates 24/7 without fatigue',
        'Can attack thousands of targets simultaneously',
        'Costs pennies compared to human labor',
        'Learns from each attack to improve future attempts'
      ],
      sources: [
        'https://deepstrike.io/blog/ai-cyber-attack-statistics-2025',
        'https://thenetworkinstallers.com/blog/ai-cyber-threat-statistics/'
      ]
    }
  ]

  return (
    <div className="demo-container">
      <div className="demo-content">
        <h2 className="demo-title">How You Will Be Hacked</h2>
        <p className="demo-intro">
          Click on each attack method to see how AI makes it more dangerous and accessible.
          These aren't theoretical—they're happening right now.
        </p>

        <div className="attacks-grid">
          {attacks.map((attack) => (
            <div
              key={attack.id}
              className={`attack-card ${selectedAttack === attack.id ? 'selected' : ''} severity-${attack.severity.toLowerCase()}`}
              onClick={() => {
                setSelectedAttack(attack.id)
                setShowDetails(true)
              }}
            >
              <div className="attack-header">
                <div className="attack-icon">{attack.icon}</div>
                <span className={`severity-badge ${attack.severity.toLowerCase()}`}>{attack.severity}</span>
              </div>
              <h3 className="attack-title">{attack.title}</h3>
              <p className="attack-description">{attack.description}</p>
              <div className="attack-stats">{attack.stats}</div>
              <div className="attack-hover-hint">Click to learn more →</div>
            </div>
          ))}
        </div>

        {showDetails && selectedAttack && (
          <div className="attack-details">
            <button
              className="close-button"
              onClick={() => {
                setShowDetails(false)
                setSelectedAttack(null)
              }}
            >
              ×
            </button>
            {attacks
              .filter((a) => a.id === selectedAttack)
              .map((attack) => (
                <div key={attack.id}>
                  <div className="details-header">
                    <h3 className="details-title">{attack.icon} {attack.title}</h3>
                    <span className={`severity-badge large ${attack.severity.toLowerCase()}`}>{attack.severity}</span>
                  </div>
                  <div className="details-stat-highlight">{attack.stats}</div>
                  <div className="details-content">
                    <div className="details-section">
                      <h4>What Happened:</h4>
                      <p className="details-text">{attack.details}</p>
                    </div>

                    <div className="real-example">
                      <strong>Verified Incident:</strong>
                      <p>{attack.realExample}</p>
                    </div>

                    <div className="why-it-worked">
                      <h4>Why It Worked:</h4>
                      <ul>
                        {attack.whyItWorked.map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="sources">
                      <h4>Sources:</h4>
                      <ul>
                        {attack.sources.map((source, idx) => (
                          <li key={idx}>
                            <a href={source} target="_blank" rel="noopener noreferrer">
                              {source.replace(/https?:\/\//, '').split('/')[0]}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="demo-warning">
          <p>
            <strong>The key difference:</strong> These attacks used to require skilled hackers
            and significant time. Now, anyone with AI access can execute sophisticated attacks
            in minutes. The democratization of hacking capabilities is the real threat.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InteractiveDemo
