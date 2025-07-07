import React from 'react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
const Navbar = () => {
    const LogoRef = useRef(null);
    useEffect(()=>{
        gsap.fromTo(LogoRef.current,
            {
                opacity: 0.5,
            },{
                duration:1,
                ease:"power1.in",
                opacity:1,
            }
        )
    },[])
  return (
        <div className='navbar'>
            <div className="navbar-logo">
                <a ref={LogoRef} href='/'>Hassan</a>
            </div>
            <div className='nav-links'>
                <a href='#about' className='nav-link'>About</a>
                <a href='#projects' className='nav-link'>Projects</a>
                <a href='#education' className='nav-link'>Education</a>
                <a href='#contact' className='nav-link'>Contact</a>
            </div>
        </div>
    // </div>
  )
}

export default Navbar
