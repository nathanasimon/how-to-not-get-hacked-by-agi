import React from 'react'
import './AttackSpread.css'

const AttackSpread = () => {
  return (
    <div className="attack-spread-section">
      <div className="attack-spread-content">
        <h2 className="attack-spread-title">How AI hacking multiplies</h2>
        <p className="attack-spread-description">
          One infected device spreads to many. Each device infects more devices. 
          The infection multiplies exponentially. This is how AI hacking software spreads.
        </p>
      </div>

      <div className="attack-spread-diagram">
        <div className="spread-level">
          <div className="device infected">1</div>
          <div className="level-label">1 device infected</div>
        </div>

        <div className="spread-connector">
          <div className="connector-line"></div>
          <div className="connector-arrow">↓</div>
        </div>

        <div className="spread-level">
          <div className="device infected">1</div>
          <div className="device infected">2</div>
          <div className="device infected">3</div>
          <div className="level-label">3 devices infected</div>
        </div>

        <div className="spread-connector">
          <div className="connector-line"></div>
          <div className="connector-arrow">↓</div>
        </div>

        <div className="spread-level">
          <div className="device infected">1</div>
          <div className="device infected">2</div>
          <div className="device infected">3</div>
          <div className="device infected">4</div>
          <div className="device infected">5</div>
          <div className="device infected">6</div>
          <div className="device infected">7</div>
          <div className="device infected">8</div>
          <div className="device infected">9</div>
          <div className="level-label">9 devices infected</div>
        </div>

        <div className="spread-connector">
          <div className="connector-line"></div>
          <div className="connector-arrow">↓</div>
        </div>

        <div className="spread-level">
          <div className="device infected">1</div>
          <div className="device infected">2</div>
          <div className="device infected">3</div>
          <div className="device infected">4</div>
          <div className="device infected">5</div>
          <div className="device infected">6</div>
          <div className="device infected">7</div>
          <div className="device infected">8</div>
          <div className="device infected">9</div>
          <div className="device infected">10</div>
          <div className="device infected">11</div>
          <div className="device infected">12</div>
          <div className="device infected">13</div>
          <div className="device infected">14</div>
          <div className="device infected">15</div>
          <div className="device infected">16</div>
          <div className="device infected">17</div>
          <div className="device infected">18</div>
          <div className="device infected">19</div>
          <div className="device infected">20</div>
          <div className="device infected">21</div>
          <div className="device infected">22</div>
          <div className="device infected">23</div>
          <div className="device infected">24</div>
          <div className="device infected">25</div>
          <div className="device infected">26</div>
          <div className="device infected">27</div>
          <div className="level-label">27 devices infected</div>
        </div>
      </div>
    </div>
  )
}

export default AttackSpread

