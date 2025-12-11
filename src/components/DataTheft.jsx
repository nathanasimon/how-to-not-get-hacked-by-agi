import React, { useState, useEffect } from 'react'
import './DataTheft.css'

const DataTheft = () => {
  const [stolenData, setStolenData] = useState([])

  const dataTypes = [
    { type: 'Password', value: '********', source: 'Chrome saved passwords' },
    { type: 'Email', value: 'user@email.com', source: 'Gmail inbox' },
    { type: 'Credit Card', value: '4532 **** **** 9281', source: 'Amazon checkout' },
    { type: 'SSN', value: '***-**-4821', source: 'Tax documents' },
    { type: 'Bank Login', value: 'user: jsmith_bank', source: 'Chase login' },
  ]

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < dataTypes.length) {
        setStolenData(prev => [...prev, dataTypes[index]])
        index++
      } else {
        clearInterval(timer)
      }
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="data-theft-section">
      <div className="data-theft-content">
        <h2 className="data-theft-title">What AI malware steals</h2>
        <p className="data-theft-description">
          Once inside your device, AI malware finds and extracts everything. 
          Watch the data flow.
        </p>
      </div>

      <div className="theft-visualization">
        <div className="device-terminal">
          <div className="terminal-header">
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
            <span className="terminal-title">victim_device</span>
          </div>
          <div className="terminal-content">
            <div className="terminal-line">$ scanning system...</div>
            <div className="terminal-line">$ extracting credentials...</div>
            {stolenData.map((data, index) => (
              <div key={index} className="terminal-line stolen">
                [FOUND] {data.type}: {data.value}
              </div>
            ))}
            {stolenData.length === dataTypes.length && (
              <div className="terminal-line complete">$ exfiltration complete</div>
            )}
          </div>
        </div>

        <div className="data-flow">
          <div className="flow-line"></div>
          <div className="flow-arrow">→</div>
        </div>

        <div className="attacker-terminal">
          <div className="terminal-header attacker">
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
            <span className="terminal-title">attacker_server</span>
          </div>
          <div className="terminal-content">
            <div className="terminal-line">$ receiving data...</div>
            {stolenData.map((data, index) => (
              <div key={index} className="data-received">
                <div className="data-type">{data.type}</div>
                <div className="data-value">{data.value}</div>
                <div className="data-source">{data.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTheft
