import React, { useState } from 'react'
import './AutonomousAI.css'

function AutonomousAI() {
  const [selectedCapability, setSelectedCapability] = useState(null)

  const capabilities = [
    {
      id: 'reconnaissance',
      title: 'Reconnaissance',
      description: 'AI scans the internet. Finds your company. Maps your infrastructure. Discovers your systems.',
      example: 'AI found 30 organizations. Tech companies. Banks. Government agencies. All without human help.',
      autonomy: 90
    },
    {
      id: 'vulnerability',
      title: 'Vulnerability Discovery',
      description: 'AI reads code. Finds bugs. Discovers zero-day vulnerabilities humans missed.',
      example: 'Anthropic\'s Claude found TWO zero-day vulnerabilities in cryptocurrency contracts. Worth $3,694 in simulated profit.',
      autonomy: 85
    },
    {
      id: 'exploitation',
      title: 'Exploitation',
      description: 'AI writes exploit code. Tests it. Refines it. Executes the attack.',
      example: 'AI wrote working exploit code. Tested it. Deployed it. All autonomously.',
      autonomy: 80
    },
    {
      id: 'lateral',
      title: 'Lateral Movement',
      description: 'AI moves through networks. Finds more systems. Escalates privileges.',
      example: 'Once inside, AI explored. Found more targets. Moved deeper into networks.',
      autonomy: 85
    },
    {
      id: 'harvesting',
      title: 'Credential Harvesting',
      description: 'AI steals passwords. Collects tokens. Gathers authentication data.',
      example: 'AI harvested credentials. Stole passwords. Collected authentication tokens.',
      autonomy: 90
    },
    {
      id: 'exfiltration',
      title: 'Data Exfiltration',
      description: 'AI finds sensitive data. Copies it. Sends it out. Covers its tracks.',
      example: 'AI found data. Copied it. Exfiltrated it. All without human guidance.',
      autonomy: 85
    }
  ]

  return (
    <div className="autonomous-ai">
      <h2 className="autonomous-title">AI Hackers Are Dangerous</h2>
      <p className="autonomous-intro">
        This isn't science fiction. AI can hack autonomously. It doesn't need humans to guide it.
        Anthropic detected AI-orchestrated attacks in September 2025. The AI operated with 80-90% autonomy.
      </p>

      <div className="autonomous-stats">
        <div className="stat-box">
          <div className="stat-number">80-90%</div>
          <div className="stat-label">Autonomous operation</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">30</div>
          <div className="stat-label">Organizations targeted</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Non-stop attacks</div>
        </div>
      </div>

      <div className="capabilities-grid">
        {capabilities.map((cap) => (
          <div
            key={cap.id}
            className={`capability-card ${selectedCapability === cap.id ? 'selected' : ''}`}
            onClick={() => setSelectedCapability(selectedCapability === cap.id ? null : cap.id)}
          >
            <div className="capability-header">
              <h3 className="capability-title">{cap.title}</h3>
              <div className="autonomy-badge">{cap.autonomy}% autonomous</div>
            </div>
            <p className="capability-description">{cap.description}</p>
            {selectedCapability === cap.id && (
              <div className="capability-example">
                <strong>Real example:</strong> {cap.example}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="autonomous-warning">
        <h3>The Democratization of Hacking</h3>
        <p>
          Sophisticated cyberattacks used to require elite hackers. Years of training. Deep technical knowledge.
          Now anyone with AI access can execute complex attacks. AI does the hard work. The barrier to entry collapsed.
        </p>
        <p>
          <strong>This changes everything.</strong> Attacks are no longer limited to nation-states or criminal organizations.
          Anyone can do it. The threat landscape fundamentally shifted.
        </p>
      </div>
    </div>
  )
}

export default AutonomousAI

