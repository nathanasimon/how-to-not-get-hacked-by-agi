import React, { useState } from 'react'
import './AutonomousAI.css'

function AutonomousAI() {
  const [selectedCapability, setSelectedCapability] = useState(null)

  const capabilities = [
    {
      id: 'reconnaissance',
      title: 'Finding Targets',
      description: 'AI searches the internet. Finds companies. Maps their systems. Discovers what they use.',
      example: 'AI found 30 organizations. Tech companies. Banks. Government agencies. All without human help.',
      autonomy: 90
    },
    {
      id: 'vulnerability',
      title: 'Finding Weaknesses',
      description: 'AI reads code. Finds bugs. Discovers security holes no one knows about yet.',
      example: 'AI found TWO security bugs in cryptocurrency code. Bugs worth $3,694 if exploited.',
      autonomy: 85
    },
    {
      id: 'exploitation',
      title: 'Breaking In',
      description: 'AI writes attack code. Tests it. Fixes it. Uses it to break in.',
      example: 'AI wrote working attack code. Tested it. Used it. All on its own.',
      autonomy: 80
    },
    {
      id: 'lateral',
      title: 'Moving Through Networks',
      description: 'AI moves through computer networks. Finds more systems. Gets more access.',
      example: 'Once inside, AI explored. Found more targets. Moved deeper into networks.',
      autonomy: 85
    },
    {
      id: 'harvesting',
      title: 'Stealing Passwords',
      description: 'AI steals passwords. Collects login codes. Gathers security data.',
      example: 'AI stole passwords. Collected login codes. Gathered security information.',
      autonomy: 90
    },
    {
      id: 'exfiltration',
      title: 'Stealing Data',
      description: 'AI finds important data. Copies it. Sends it out. Hides what it did.',
      example: 'AI found data. Copied it. Stole it. All without human help.',
      autonomy: 85
    }
  ]

  return (
    <div className="autonomous-ai">
      <h2 className="autonomous-title">AI Can Hack On Its Own</h2>
      <p className="autonomous-intro">
        This isn't science fiction. AI can hack without human help. It doesn't need someone telling it what to do.
        In September 2025, researchers found AI attacks happening on their own. The AI did 80-90% of the work by itself.
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
        <h3>Anyone Can Hack Now</h3>
        <p>
          Complex hacking attacks used to need expert hackers. Years of training. Deep technical skills.
          Now anyone with AI can do complex attacks. AI does the hard work. It's easy to get started.
        </p>
        <p>
          <strong>This changes everything.</strong> Attacks aren't just from governments or big crime groups anymore.
          Anyone can do it. The danger changed completely.
        </p>
      </div>
    </div>
  )
}

export default AutonomousAI

