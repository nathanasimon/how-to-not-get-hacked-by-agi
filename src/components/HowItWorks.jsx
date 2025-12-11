import React, { useState } from 'react'
import './HowItWorks.css'

function HowItWorks() {
  const [selectedStep, setSelectedStep] = useState(0)

  const steps = [
    {
      number: '1',
      title: 'Find your voice online',
      description: 'AI finds 3 seconds of your voice from Instagram, Facebook, TikTok, or any public video.',
      detail: 'Every video you post publicly can be used. AI doesn\'t need much.'
    },
    {
      number: '2',
      title: 'Learn your voice',
      description: 'Tools process your audio. Takes minutes. Costs $1/month.',
      detail: 'The AI learns how you talk. Your patterns. Your pauses. Everything that makes your voice yours.'
    },
    {
      number: '3',
      title: 'Generate fake audio',
      description: 'AI can now say anything in your voice. "I need money." "I\'m in trouble." "Verify your account."',
      detail: 'The cloned voice sounds real. Your family can\'t tell the difference. Neither can banks.'
    },
    {
      number: '4',
      title: 'Execute the attack',
      description: 'Scammer calls your grandma. Calls your bank. Calls your boss. Uses your cloned voice.',
      detail: 'They ask for money. They ask for account access. They ask for passwords. It works.'
    }
  ]

  return (
    <div className="how-it-works">
      <h2 className="how-title">How voice cloning attacks work</h2>
      <p className="how-intro">
        It's simpler than you think. Four steps. Minutes to execute.
      </p>

      <div className="steps-container">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`step-card ${selectedStep === idx ? 'selected' : ''}`}
            onClick={() => setSelectedStep(idx)}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {selectedStep === idx && (
                <div className="step-detail">{step.detail}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="how-warning">
        <p>
          <strong>The problem:</strong> You can't stop posting videos. 
          But you can protect yourself. Start with the family code word.
        </p>
      </div>
    </div>
  )
}

export default HowItWorks

