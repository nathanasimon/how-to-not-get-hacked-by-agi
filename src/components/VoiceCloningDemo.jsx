import React, { useState } from 'react'
import VoiceCloneVisualization from './VoiceCloneVisualization'
import AuthComparison from './AuthComparison'
import AttackTimeline from './AttackTimeline'
import HowItWorks from './HowItWorks'
import AutonomousAI from './AutonomousAI'
import MalwareCreation from './MalwareCreation'
import DataTheft from './DataTheft'
import VoiceCloneFlow from './VoiceCloneFlow'
import './VoiceCloningDemo.css'

function VoiceCloningDemo() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const realCases = [
    {
      id: 0,
      amountLost: '$8,200',
      victim: 'Maureen',
      location: 'San Diego',
      story: `The phone rang. Maureen answered. "Grandma, I'm in jail. I need $8,200 for bail." The voice was her grandson's. Every inflection. Every pause. She nearly wired the money. Then she called his real number. He was fine. The voice had been AI. Cloned from 15 seconds of Instagram.`
    },
    {
      id: 1,
      amountLost: '$25.6M',
      victim: 'Arup',
      location: 'Hong Kong',
      story: `February 2024. A finance worker received a video call. The CFO appeared on screen. The voice sounded right. The face looked real. The CFO asked for a secret transaction. $25.6 million was transferred. The video call was fake. AI made it. The CFO never made that call.`
    },
    {
      id: 2,
      amountLost: '$690,000',
      victim: 'Steve Beauchamp, 82',
      location: 'United States',
      story: `Steve watched a video of Elon Musk explaining an investment. The voice sounded real. The face looked real. Over several weeks Steve transferred $690,000. His entire retirement fund. Every penny went to scammers. The video was fake. AI made it. Musk never said any of it.`
    },
    {
      id: 3,
      amountLost: '$15,000',
      victim: 'Sharon Brightwell',
      location: 'Florida',
      story: `Sharon's phone rang. Her daughter was crying. "Mom, I've been in an accident. I lost the baby. I need help right now." Sharon sent $15,000 cash to a courier. Later she called her daughter's real number. Her daughter answered. She was fine. The crying voice had been AI. Cloned from 3 seconds of Facebook video.`
    }
  ]

  const protections = [
    {
      number: '1',
      title: 'Enable three-factor authentication.',
      body: `Something you know (password) + something you have (smartphone) + something you are (fingerprint or face ID). Use a physical security key like YubiKey when possible.`,
      reason: `AI cannot clone your fingerprint or face. Physical keys cannot be replicated.`
    },
    {
      number: '2',
      title: 'Pick a family code word.',
      body: `Choose a random phrase. Tell your family: if anyone calls asking for money, they must say this code word first. Hang up and call back on a saved number.`,
      reason: `AI can clone voices. It cannot know your secret.`
    },
    {
      number: '3',
      title: 'Talk to your parents today.',
      body: `Sit down with them. Explain voice cloning. Show them this zine. Set up biometric authentication and the family code word together.`,
      reason: `Elderly people lost $1 billion to AI scams in 2024.`
    }
  ]

  const currentCase = realCases[selectedCase]

  const handleCaseChange = (newIndex) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedCase(newIndex)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <div className="voice-demo-container">
      <div className="site-header">
        <h1 className="site-title">HOW TO NOT GET HACKED BY AGI</h1>
      </div>

      <div className="intro-section">
        <h2 className="intro-title">AI changed hacking forever.</h2>
        <p className="intro-text">
          Complex hacking attacks used to need expert hackers. Years of training. Deep technical skills.
          Now AI can hack on its own. Anyone with AI can find security weaknesses and use them.
          It's easy to get started. The danger changed completely.
        </p>
        <p className="intro-text">
          These are real people. Real families. Real losses. AI can clone voices. Create fake videos that look real. 
          Hack without human help. These stories happened. They're happening now.
        </p>
      </div>

      <div className="story-section">
        <div className={`story-card ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          <div className="story-amount">{currentCase.amountLost}</div>
          <div className="story-victim">{currentCase.victim}</div>
          <div className="story-meta">{currentCase.location}</div>
          <div className="story-text">{currentCase.story}</div>
        </div>

        <div className="story-controls">
          <div className="story-dots">
            {realCases.map((c, idx) => (
              <button
                key={c.id}
                className={`story-dot ${selectedCase === c.id ? 'active' : ''}`}
                onClick={() => handleCaseChange(c.id)}
              />
            ))}
          </div>
          <div className="story-nav">
            <button
              className="story-nav-btn"
              onClick={() => handleCaseChange((selectedCase - 1 + realCases.length) % realCases.length)}
            >
              ←
            </button>
            <button
              className="story-nav-btn"
              onClick={() => handleCaseChange((selectedCase + 1) % realCases.length)}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat">
          <div className="stat-number">442%</div>
          <div className="stat-label">increase in phone scams in 2024</div>
        </div>
        <div className="stat">
          <div className="stat-number">$40B</div>
          <div className="stat-label">projected loss to fake video scams by 2027</div>
        </div>
        <div className="stat">
          <div className="stat-number">$1/month</div>
          <div className="stat-label">cost to clone someone's voice</div>
        </div>
      </div>

      <AutonomousAI />

      <MalwareCreation />

      <AttackTimeline />

      <VoiceCloneFlow />

      <HowItWorks />

      <DataTheft />

      <AuthComparison />

      <div className="protections-section">
        <h2 className="protections-title">How to protect yourself.</h2>
        <p className="protections-intro">
          AI can clone voices. It can trick phone verification. It can fool security apps. 
          But AI cannot clone what you physically are or hold. Physical security is your strongest defense.
        </p>
        <div className="protections-grid">
          {protections.map((protection) => (
            <div key={protection.number} className="protection-card">
              <div className="protection-number">{protection.number}</div>
              <h3 className="protection-title">{protection.title}</h3>
              <p className="protection-body">{protection.body}</p>
              <p className="protection-reason">{protection.reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-section">
        <p className="footer-text">Thank you for reading.</p>
        <p className="footer-subtext">Protect yourself.</p>
      </div>
    </div>
  )
}

export default VoiceCloningDemo
