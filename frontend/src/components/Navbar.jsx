import React from 'react'


function Navbar() {
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Loqui</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Settings</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar