import React, { useState } from 'react'
import VoiceCloneVisualization from './VoiceCloneVisualization'
import AuthComparison from './AuthComparison'
import AttackTimeline from './AttackTimeline'
import HowItWorks from './HowItWorks'
import AutonomousAI from './AutonomousAI'
import AttackVisualization from './AttackVisualization'
import AuthLayersVisualization from './AuthLayersVisualization'
import NetworkVisualization from './NetworkVisualization'
import DataFlowVisualization from './DataFlowVisualization'
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
      story: `February 2024. A finance worker received a video call. The CFO appeared on screen. The voice was familiar. The face looked real. The CFO asked for a secret transaction. $25.6 million was transferred. The video call was a deepfake. The CFO never made that call.`
    },
    {
      id: 2,
      amountLost: '$690,000',
      victim: 'Steve Beauchamp, 82',
      location: 'United States',
      story: `Steve watched a video of Elon Musk explaining an investment. The voice was clear. The face looked real. Over several weeks Steve transferred $690,000. His entire retirement fund. Every penny went to scammers. The video was a deepfake. Musk never said any of it.`
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
      title: 'Get a physical security key.',
      body: `YubiKey. Titan Security Key. These small devices plug into your computer or phone. They cannot be cloned. AI cannot replicate what you physically hold.`,
      reason: `Physical keys are the strongest protection. AI cannot clone hardware.`
    },
    {
      number: '2',
      title: 'Use biometric authentication everywhere.',
      body: `Face ID. Fingerprint. Touch ID. Enable biometric login on your phone, computer, and apps. Your face and fingerprint cannot be cloned by AI.`,
      reason: `Biometrics are physical. AI can clone voices but not your face or fingerprint.`
    },
    {
      number: '3',
      title: 'Enable three-factor authentication.',
      body: `Something you know (password) + something you have (smartphone) + something you are (fingerprint or face ID). This combination stops AI attacks completely.`,
      reason: `Three factors: something you know + something you have + something you are. AI cannot clone your fingerprint or face.`
    },
    {
      number: '4',
      title: 'Use authenticator apps with biometrics.',
      body: `Google Authenticator. Authy. 1Password. Enable two-factor authentication everywhere. Use Face ID or fingerprint when possible. Never use SMS codes.`,
      reason: `Authenticator apps with biometrics are stronger than SMS. AI can intercept phone calls but not your biometric.`
    },
    {
      number: '5',
      title: 'Pick a family code word.',
      body: `Choose a random phrase. Tell your family: if anyone calls asking for money, they must say this code word first.`,
      reason: `AI can clone voices. It cannot know your secret.`
    },
    {
      number: '6',
      title: 'Hang up and call back.',
      body: `If anyone calls with an emergency, hang up. Call them back using a number you have saved. Do not use any number they provide.`,
      reason: `Real emergencies can wait 2 minutes for verification.`
    },
    {
      number: '7',
      title: 'Lock down social media voices.',
      body: `Make your videos private. Remove voice samples from public posts. Scammers need 3 seconds of audio.`,
      reason: `Less public audio means harder to clone.`
    },
    {
      number: '8',
      title: 'Talk to your parents today.',
      body: `Sit down with them. Explain voice cloning. Show them examples. Set up biometric authentication and the family code word together.`,
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
        <h2 className="intro-title">AI-powered hacking changed everything.</h2>
        <p className="intro-text">
          Sophisticated cyberattacks used to require elite hackers. Years of training. Deep technical knowledge.
          Now AI can independently execute complex attacks. Anyone with AI access can exploit vulnerabilities.
          The barrier to entry collapsed. The threat landscape fundamentally shifted.
        </p>
        <p className="intro-text">
          These are real people. Real families. Real losses. AI can clone voices. Create deepfakes. 
          Hack autonomously. These stories happened. They're happening now.
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

      <NetworkVisualization />

      <div className="stats-section">
        <div className="stat">
          <div className="stat-number">442%</div>
          <div className="stat-label">increase in vishing attacks in 2024</div>
        </div>
        <div className="stat">
          <div className="stat-number">$40B</div>
          <div className="stat-label">projected loss to deepfake scams by 2027</div>
        </div>
        <div className="stat">
          <div className="stat-number">$1/month</div>
          <div className="stat-label">cost of commercial voice cloning tools</div>
        </div>
      </div>

      <DataFlowVisualization />

      <AutonomousAI />

      <AttackVisualization />

      <AttackTimeline />

      <VoiceCloneVisualization />

      <HowItWorks />

      <AuthComparison />

      <AuthLayersVisualization />

      <div className="protections-section">
        <h2 className="protections-title">How to protect yourself.</h2>
        <p className="protections-intro">
          AI can clone voices. It can bypass phone verification. It can trick authenticator apps. 
          But AI cannot clone what you physically are or hold. Physical authentication is your strongest defense.
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
        <div className="physical-auth-emphasis">
          <h3 className="emphasis-title">Physical authentication stops AI</h3>
          <div className="emphasis-grid">
            <div className="emphasis-item">
              <h4>Physical Security Keys</h4>
              <p>YubiKey. Titan Security Key. You plug them in. AI cannot clone hardware.</p>
            </div>
            <div className="emphasis-item">
              <h4>Biometric Authentication</h4>
              <p>Face ID. Fingerprint. Touch ID. AI cannot clone your face or fingerprint.</p>
            </div>
            <div className="emphasis-item">
              <h4>Three-Factor Authentication</h4>
              <p>Password. Smartphone. Fingerprint or face ID. Three layers. AI stops here.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-section">
        <p className="footer-text">The threat is real. The time is now.</p>
        <p className="footer-subtext">Start with the family code word. Do it today.</p>
      </div>
    </div>
  )
}

export default VoiceCloningDemo
