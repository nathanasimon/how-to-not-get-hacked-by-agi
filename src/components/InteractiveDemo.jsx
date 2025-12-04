import React, { useState } from 'react'
import './InteractiveDemo.css'

function InteractiveDemo() {
  const [selectedAttack, setSelectedAttack] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const attacks = [
    {
      id: 'phishing',
      title: 'AI-Powered Phishing',
      icon: '📧',
      description: 'AI generates convincing, personalized phishing emails at scale',
      details: `Modern AI can craft phishing emails that are nearly indistinguishable from legitimate communications. It analyzes your social media, writing style, and relationships to create highly targeted attacks.

Example: An AI scrapes your LinkedIn, identifies your boss's name, and generates an email that perfectly mimics their writing style, asking you to click a link or download an attachment.`,
      realExample: 'Claude Code demonstrated the ability to generate convincing phishing emails by analyzing target profiles and adapting language patterns.'
    },
    {
      id: 'vulnerability',
      title: 'Automated Vulnerability Discovery',
      icon: '🔍',
      description: 'AI scans code and systems for security flaws automatically',
      details: `AI systems can now read code, understand architecture, and identify security vulnerabilities faster than human security researchers. They can analyze entire codebases in minutes.

Example: An attacker uses AI to scan thousands of websites for common vulnerabilities like SQL injection or cross-site scripting, then automatically exploits them.`,
      realExample: 'The Anthropic research showed AI systems successfully identifying and exploiting vulnerabilities in test environments without human intervention.'
    },
    {
      id: 'social',
      title: 'Social Engineering at Scale',
      icon: '🎭',
      description: 'AI creates fake profiles and builds trust through conversation',
      details: `AI chatbots can maintain conversations, build relationships, and extract sensitive information over time. They never get tired, never slip up, and can manage thousands of targets simultaneously.

Example: An AI creates a fake LinkedIn profile, connects with professionals in your industry, and gradually builds trust to extract company secrets or personal information.`,
      realExample: 'AI systems have demonstrated the ability to engage in multi-turn conversations that manipulate targets into revealing sensitive information.'
    },
    {
      id: 'password',
      title: 'Intelligent Password Cracking',
      icon: '🔐',
      description: 'AI predicts passwords based on personal information patterns',
      details: `AI analyzes leaked password databases, personal information from data breaches, and social media to predict likely passwords. It understands patterns humans use when creating passwords.

Example: An AI combines your birthday (from a data breach), your pet's name (from Instagram), and common password patterns to generate likely password combinations.`,
      realExample: 'Machine learning models trained on billions of leaked passwords can now predict passwords with surprising accuracy.'
    },
    {
      id: 'deepfake',
      title: 'Deepfake & Voice Cloning',
      icon: '🎤',
      description: 'AI creates convincing fake audio and video',
      details: `AI can clone voices and create realistic video deepfakes. Attackers use these to impersonate trusted individuals in video calls or phone conversations.

Example: An AI clones your boss's voice from a public video, calls you asking for urgent access to a system, and you comply because it sounds exactly like them.`,
      realExample: 'Recent incidents have shown AI voice cloning being used successfully in vishing (voice phishing) attacks, with victims losing thousands of dollars.'
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
              className={`attack-card ${selectedAttack === attack.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedAttack(attack.id)
                setShowDetails(true)
              }}
            >
              <div className="attack-icon">{attack.icon}</div>
              <h3 className="attack-title">{attack.title}</h3>
              <p className="attack-description">{attack.description}</p>
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
                  <h3 className="details-title">{attack.title}</h3>
                  <div className="details-content">
                    <p className="details-text">{attack.details}</p>
                    <div className="real-example">
                      <strong>Real Example:</strong>
                      <p>{attack.realExample}</p>
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
