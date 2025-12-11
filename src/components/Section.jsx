import React from 'react'
import './Section.css'

function Section({ title, content }) {
  const renderContent = (text) => {
    const parts = text.split('\n\n')
    return parts.map((part, index) => {
      // Check if it's a bullet list
      if (part.includes('- ')) {
        const lines = part.split('\n')
        const beforeList = []
        const listItems = []
        const afterList = []
        let inList = false
        
        lines.forEach((line) => {
          if (line.trim().startsWith('- ')) {
            inList = true
            listItems.push(line.trim().substring(2))
          } else if (inList && line.trim() === '') {
            // Empty line after list
            inList = false
          } else if (!inList && line.trim() !== '') {
            beforeList.push(line)
          }
        })
        
        return (
          <div key={index}>
            {beforeList.map((line, i) => (
              <p key={i} className="section-paragraph">{line}</p>
            ))}
            {listItems.length > 0 && (
              <ul className="section-list">
                {listItems.map((item, i) => (
                  <li key={i} className="section-list-item">{item}</li>
                ))}
              </ul>
            )}
            {afterList.map((line, i) => (
              <p key={i} className="section-paragraph">{line}</p>
            ))}
          </div>
        )
      }
      
      return (
        <p key={index} className="section-paragraph">
          {part}
        </p>
      )
    })
  }

  return (
    <div className="section-container">
      <div className="section-content">
        <h2 className="section-title">{title}</h2>
        <div className="section-body">
          {renderContent(content)}
        </div>
      </div>
    </div>
  )
}

export default Section
