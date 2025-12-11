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
      event: 'Fake video calls',
      description: 'Arup loses $25.6M. Entire video calls faked. Voice + face cloning combined.',
      color: '#34c759'
    },
    {
      year: '2025',
      event: 'AI hacks on its own',
      description: 'AI hacks without humans. Finds security weaknesses. Uses them to attack. 90% done by AI.',
      color: '#000'
    }
  ]

  return (
    <div className="attack-timeline">
      <h2 className="timeline-title">How we got here</h2>
      <p className="timeline-intro">
        The danger changed quickly. Each year brought new ways to attack.
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
          What took expert hackers years to learn now takes minutes. 
          AI made complex attacks easy. Anyone can do it now.
        </p>
      </div>
    </div>
  )
}

export default AttackTimeline

