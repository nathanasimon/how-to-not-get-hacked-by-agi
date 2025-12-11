import React, { useState } from 'react'
import './AuthComparison.css'

function AuthComparison() {
  const [selectedEra, setSelectedEra] = useState(null)

  const eras = [
    {
      id: 'pre-internet',
      name: 'Pre-Internet',
      factor: '1 Factor',
      factors: ['Something you know'],
      factorDetails: ['Password'],
      description: 'A password was enough. Something you know. You kept it secret. Simple.',
      security: 30,
      color: '#ff3b30'
    },
    {
      id: 'post-internet',
      name: 'Post-Internet',
      factor: '2 Factor',
      factors: ['Something you know', 'Something you have'],
      factorDetails: ['Password', 'Smartphone'],
      description: 'Hackers could guess passwords. Two layers: something you know plus something you have. Stopped most attacks.',
      security: 70,
      color: '#ff9500'
    },
    {
      id: 'post-ai',
      name: 'Post-AI',
      factor: '3 Factor',
      factors: ['Something you know', 'Something you have', 'Something you are'],
      factorDetails: ['Password', 'Smartphone', 'Fingerprint / Face ID'],
      description: 'AI can clone voices. Bypass phone verification. Three layers: something you know, something you have, something you are. Stops AI attacks.',
      security: 95,
      color: '#000'
    }
  ]

  return (
    <div className="auth-comparison">
      <h2 className="auth-title">The evolution of authentication</h2>
      <p className="auth-intro">
        Click each era to see how authentication requirements changed.
      </p>

      <div className="eras-grid">
        {eras.map((era) => (
          <div
            key={era.id}
            className={`era-card ${selectedEra === era.id ? 'selected' : ''}`}
            onClick={() => setSelectedEra(selectedEra === era.id ? null : era.id)}
            style={{ borderColor: era.color }}
          >
            <div className="era-header">
              <div className="era-name">{era.name}</div>
              <div className="era-factor" style={{ color: era.color }}>
                {era.factor}
              </div>
            </div>

            <div className="factors-list">
              {era.factors.map((factor, idx) => (
                <div key={idx} className="factor-item">
                  <div className="factor-number">{idx + 1}</div>
                  <div className="factor-content">
                    <div className="factor-name">{factor}</div>
                    <div className="factor-detail">{era.factorDetails[idx]}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="security-meter">
              <div className="security-label">Security Level</div>
              <div className="security-bar">
                <div
                  className="security-fill"
                  style={{
                    width: `${era.security}%`,
                    backgroundColor: era.color
                  }}
                />
              </div>
              <div className="security-percent">{era.security}%</div>
            </div>

            {selectedEra === era.id && (
              <div className="era-description">
                {era.description}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="auth-note">
        <p>
          <strong>Why three factors?</strong> 
        </p>
        <p>
          <strong>1 Factor:</strong> Something you know (password). AI can guess it. Hackers can steal it.
        </p>
        <p>
          <strong>2 Factor:</strong> Something you know + something you have (password + smartphone). AI can intercept SMS codes. AI can clone voices for phone verification.
        </p>
        <p>
          <strong>3 Factor:</strong> Something you know + something you have + something you are (password + smartphone + fingerprint/face ID). AI cannot clone your fingerprint. AI cannot replicate your face. This is the final layer that stops AI attacks.
        </p>
      </div>
    </div>
  )
}

export default AuthComparison

