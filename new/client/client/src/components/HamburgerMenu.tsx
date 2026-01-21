import { useState } from 'react'
import { Link } from 'react-router-dom'
// import React from 'react'


const HamburgerMenu = () => {
    const [isOpen, setOpen] = useState(false)

    const handleToggle = async () => {
        setOpen(!isOpen)
    }
    return (
        <header>
            <nav className="navbar">
                <div className='hamburger-container'>
                    <button className="hamburger" id="hamburger" onClick={handleToggle}>&#9776;</button>
                    <ul className={`nav-links ${isOpen ? 'show' : ''}`} id="nav-links">
                        <li><Link to="/" className="linkButton-hamburger">Home</Link></li>
                        <li><Link to="/categories" className="linkButton-hamburger">Decks</Link></li>
                    </ul >
                </div>
            </nav>
        </header >
    )
}

export default HamburgerMenu