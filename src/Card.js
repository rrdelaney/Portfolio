import React from 'react'

const cardStyle = {
  backgroundColor: 'whitesmoke',
  maxWidth: '400px',
  minWidth: '400px',
  padding: '1rem',
  margin: '1rem',
  boxShadow: 'rgba(0, 0, 0, .2) 2px 2px 4px 2px'
}

export default function Card ({ children, style = {} }) {
  return (
    <div style={{ ...cardStyle, ...style }}>{children}</div>
  )
}
