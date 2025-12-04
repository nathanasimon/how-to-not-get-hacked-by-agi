import React from 'react'
import './Section.css'

function Section({ title, content }) {
  return (
    <div className="section-container">
      <div className="section-content">
        <h2 className="section-title">{title}</h2>
        <div className="section-body">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="section-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section
