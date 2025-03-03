import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("authToken");

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/connexion')
    }

    return (
        <div>
            <div className='flex justify-between items-center py-4 px-5 shadow-lg shadow-gray-100'>
                <h1 className='logo text-[#3664F4] text-5xl font-semibold mt-[-10px]'>Projet de Test</h1>
                <div className='hidden md:flex gap-9 text-base'>
                    <Link to="/articles" className='hover:text-[#3664F4] duration-100 text-xl'>Articles</Link>
                    {
                        isLoggedIn && <button onClick={handleLogOut} className='hover:text-[#3664F4] duration-100 text-xl'>Se déconnecter</button>
                    }
                </div>
                {
                    (location.pathname !== '/connexion' && !isLoggedIn) ? (
                        <Link to='/connexion' className="animated-button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                            </svg>
                            <span className="text">Se connecter</span>
                            <span className="circle"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                            </svg>
                        </Link>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Navbar