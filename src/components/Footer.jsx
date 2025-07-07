import React from 'react'
import "./componentStyles/Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Hassan. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
