import React, { useState } from 'react'
import './VoiceCloningDemo.css'

function VoiceCloningDemo() {
  const [selectedCase, setSelectedCase] = useState(0)

  const realCases = [
    {
      id: 0,
      title: 'Maureen: "My Grandson Needs Bail Money"',
      victim: 'Maureen (San Diego Grandmother)',
      location: 'San Diego, California',
      date: '2024',
      amountLost: '$8,200 (attempted)',
      story: `The phone rang. Maureen answered.

"Grandma, I'm in trouble. I got in an accident and I'm in jail. I need $8,200 for bail right now."

The voice was her grandson's. Every inflection. Every pause. She was certain.

She nearly wired the money. Then she hung up and called her grandson's real number.

He answered from his college dorm. He was fine. The voice had been AI. Cloned from 15 seconds of Instagram video.`,
      howItWorked: [
        'Scammers found 15 seconds of her grandson\'s voice on Instagram',
        'AI cloned it perfectly—pitch, tone, emotional cadence',
        'Called at a time Grandma would be home alone',
        'Created panic: jail, accident, urgent bail money',
        'Nearly worked. She almost wired $8,200.'
      ],
      source: 'https://metanews.com/alert-grandma-avoids-losing-thousands-in-ai-voice-cloning-scam/'
    },
    {
      id: 1,
      title: 'Bank Account Drained: Voice Reset Scam',
      victim: 'Multiple bank customers',
      location: 'United States',
      date: '2024',
      amountLost: 'Varies - accounts fully drained',
      story: `A journalist tested their bank in 2024. They cloned their own voice with AI. Then they called the bank.

"I need to reset my password."

The bank accepted it. Within minutes they had full account access.

Starling Bank warned in September 2024 that millions of people could fall victim.

The attack is simple. Scammers scrape your voice from social media. They call your bank. Voice verification passes. Password resets. Account drained.`,
      howItWorked: [
        'Banks use voice verification: "Say your full name and birthday"',
        'Scammers scrape your voice from social media',
        'AI clones it in minutes using $5/month tools',
        'They call your bank pretending to be you',
        'Voice auth passes. Password resets. Account drained.',
        '91% of US banks are now reconsidering voice verification'
      ],
      source: 'https://www.vice.com/en/article/how-i-broke-into-a-bank-account-with-an-ai-generated-voice/'
    },
    {
      id: 2,
      title: 'Steve: $690,000 Retirement Fund Gone',
      victim: 'Steve Beauchamp, 82',
      location: 'United States',
      date: '2025',
      amountLost: '$690,000 (entire retirement)',
      story: `Steve Beauchamp was 82. He watched a video of Elon Musk explaining a new investment.

The voice was clear. The face looked real. The investment seemed legitimate.

Over several weeks Steve transferred $690,000. His entire retirement fund.

Every penny went to scammers.

The video was a deepfake. The voice was AI. Musk never said any of it. Steve lost everything.`,
      howItWorked: [
        'Deepfake video of Elon Musk promoting fake investment',
        'AI-cloned voice, AI-generated facial movements',
        'Looked and sounded completely legitimate',
        'Targeted elderly victim over several weeks',
        'Entire $690,000 retirement fund stolen',
        'Victim didn\'t realize until it was too late'
      ],
      source: 'https://www.ctol.digital/news/ai-powered-scams-drain-700-million-from-seniors-retirement-losses-surge-eightfold/'
    },
    {
      id: 3,
      title: 'Sharon: $15,000 to Save Her "Daughter"',
      victim: 'Sharon Brightwell',
      location: 'Dover, Florida',
      date: 'July 2025',
      amountLost: '$15,000',
      story: `Sharon's phone rang. Her daughter was crying.

"Mom, I've been in an accident. I lost the baby. I'm in trouble. I need help right now."

Sharon sent $15,000 cash to a courier. Her daughter needed her.

Later she called her daughter's real number.

Her daughter answered. She was fine. No accident. No baby. No trouble.

The crying voice had been AI. Trained on 3 seconds from Facebook.`,
      howItWorked: [
        'Voice cloned from 3 seconds of Facebook video',
        '85% accuracy in pitch, tone, emotion',
        'Targeted when Sharon was alone',
        'Emotional manipulation: lost baby, legal trouble',
        '$15,000 sent before verification'
      ],
      source: 'https://www.americanbar.org/groups/senior_lawyers/resources/voice-of-experience/2025-september/ai-cloned-voice-scam/'
    }
  ]

  const stats = [
    {
      number: '3 seconds',
      label: 'of audio needed to clone a voice with 85% accuracy'
    },
    {
      number: '442%',
      label: 'increase in vishing attacks in 2024'
    },
    {
      number: '$40B',
      label: 'projected loss to deepfake scams by 2027'
    },
    {
      number: '$1/month',
      label: 'cost of commercial voice cloning tools during sales'
    }
  ]

  const currentCase = realCases[selectedCase]

  return (
    <div className="voice-demo-container">
      <div className="voice-demo-content">
        <div className="story-header">
          <div className="story-number">3 seconds</div>
          <h2 className="story-title">That's all it takes to clone a voice.</h2>
          <p className="story-subtitle">
            These are real people. Real families. Real losses.
          </p>
        </div>

        <div className="story-nav">
          {realCases.map((c, idx) => (
            <button
              key={c.id}
              className={`story-dot ${selectedCase === c.id ? 'active' : ''}`}
              onClick={() => setSelectedCase(c.id)}
              aria-label={`Story ${idx + 1}`}
            />
          ))}
        </div>

        <div className="story-content">
          <div className="story-card">
            <div className="story-amount">{currentCase.amountLost}</div>
            <div className="story-victim">{currentCase.victim}</div>
            <div className="story-location">{currentCase.location} • {currentCase.date}</div>

            <div className="story-body">
              {currentCase.story}
            </div>

            <button
              className="story-nav-btn prev"
              onClick={() => setSelectedCase((selectedCase - 1 + realCases.length) % realCases.length)}
            >
              ←
            </button>
            <button
              className="story-nav-btn next"
              onClick={() => setSelectedCase((selectedCase + 1) % realCases.length)}
            >
              →
            </button>
          </div>
        </div>

        <div className="action-section">
          <h2 className="action-title">Do this right now.</h2>

          <div className="action-primary">
            <div className="action-number">1</div>
            <div className="action-content">
              <h3>Pick a family code word</h3>
              <p>
                Choose a random phrase. Tell your family: if anyone calls asking for money, they must say this code word first.
              </p>
              <p className="action-why">
                AI can clone voices. It cannot know your secret.
              </p>
            </div>
          </div>

          <div className="action-secondary">
            <div className="action-item">
              <div className="action-number">2</div>
              <div className="action-text">
                <h4>Never send money without calling back</h4>
                <p>Hang up. Call the person using your saved contact. Real emergencies can wait 60 seconds.</p>
              </div>
            </div>

            <div className="action-item">
              <div className="action-number">3</div>
              <div className="action-text">
                <h4>Talk to your parents today</h4>
                <p>Show them these stories. Set up the code word with them. They are the primary target.</p>
              </div>
            </div>

            <div className="action-item">
              <div className="action-number">4</div>
              <div className="action-text">
                <h4>Lock down social media</h4>
                <p>Make all videos private or friends-only. Scammers scrape voices from public posts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceCloningDemo
