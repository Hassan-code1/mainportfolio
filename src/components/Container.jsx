import React from 'react'
import Hero from './Hero'
import Education from './Education'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import CodingProfiles from './CodingProfiles'

const Container = () => {
  return (
    <div className='w-full'>
      <Hero />
      <Education />
      <Projects />
      <Skills />
      <CodingProfiles />
      <Contact />
      {/* <Footer /> */}
    </div>
  )
}

export default Container
