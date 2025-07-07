import React from 'react'
import Hero from './Hero'
import "./componentStyles/Container.css"
import Education from './Education'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
const Container = () => {
  return (
    <div className='container'>
      <Hero />
      <Education />
      <Projects />
      <Skills />
      <Contact />
      {/* <Footer /> */}
    </div>
  )
}

export default Container
