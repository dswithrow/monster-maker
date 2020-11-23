import React from 'react'

const NavBar = () => {
    return (
        <header>
            <h2>Monster Maker</h2>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a href="/" className="nav-link">Bestiary</a>
                </li>
                <li className="nav-item">
                    <a href="/templates" className="nav-link">Templates</a>
                </li>
            </ul>
        </header>
    )
}

export default NavBar
