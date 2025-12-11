import React, { useState } from 'react'
import './AttackTimeline.css'

function AttackTimeline() {
  const [hoveredYear, setHoveredYear] = useState(null)

  const timeline = [
    {
      year: '2020',
      event: 'Traditional phishing',
      description: 'Obvious scams. Bad grammar. Generic greetings. 12% success rate.',
      color: '#ff3b30'
    },
    {
      year: '2022',
      event: 'AI tools emerge',
      description: 'WormGPT and FraudGPT appear on dark web. $200/month for AI phishing.',
      color: '#ff9500'
    },
    {
      year: '2023',
      event: 'Voice cloning accessible',
      description: 'Commercial tools cost $1/month. 3 seconds of audio needed. 85% accuracy.',
      color: '#ffcc00'
    },
    {
      year: '2024',
      event: 'Deepfake video calls',
      description: 'Arup loses $25.6M. Entire video calls faked. Voice + face cloning combined.',
      color: '#34c759'
    },
    {
      year: '2025',
      event: 'Autonomous AI hacking',
      description: 'AI hacks without humans. Discovers vulnerabilities. Executes attacks. 90% autonomous.',
      color: '#000'
    }
  ]

  return (
    <div className="attack-timeline">
      <h2 className="timeline-title">How we got here</h2>
      <p className="timeline-intro">
        The threat evolved quickly. Each year brought new capabilities.
      </p>

      <div className="timeline-container">
        {timeline.map((item, idx) => (
          <div
            key={idx}
            className={`timeline-item ${hoveredYear === idx ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredYear(idx)}
            onMouseLeave={() => setHoveredYear(null)}
          >
            <div className="timeline-marker" style={{ backgroundColor: item.color }}>
              <div className="marker-year">{item.year}</div>
            </div>
            <div className="timeline-content">
              <div className="timeline-event">{item.event}</div>
              <div className="timeline-description">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="timeline-note">
        <p>
          What took skilled hackers years to develop now takes minutes. 
          AI democratized sophisticated attacks. Anyone can do it now.
        </p>
      </div>
    </div>
  )
}

export default AttackTimeline

