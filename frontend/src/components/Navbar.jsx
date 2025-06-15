import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authUser.js';
import { Search } from 'lucide-react';
import { LogOut,Menu } from 'lucide-react';
import { useContentStore } from '../store/content.js';

export const Navbar = () => {
    const {user, logout} = useAuthStore();
    const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () =>{
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const {setContentType} = useContentStore();
  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
        <div className='flex items-center gap-10 z-50'>
            <Link to={"/"}>
                <img src="/netflix-logo.png" alt="Netflix Logo" className='w-32 sm:2-40' />
            </Link>

            {/* Desktop navbar */}
            <div className='hidden sm:flex gap-4 item-center'>
                <Link to="/" className="hover:underline" onClick={()=> setContentType("movie")}>Movies</Link>
                <Link to="/" className="hover:underline" onClick={()=> setContentType("tv")}>Tv Shows</Link>
                <Link to="/history" className="hover:underline">Search History</Link>
            </div>
        </div>

        <div className='flex gap-4 items-center z-50'>
            <Link to="/search">
                <Search className='size-6 cursor-pointer'></Search>
            </Link>
            <img src={user.image} alt="Avatar" className='h-8 rounded cursor-pointer'/>
            <LogOut className='size-6 cursor-pointer' onClick={logout}></LogOut>
            <div className='sm:hidden'>
                <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu}></Menu>
            </div>
        </div>

        {isMobileMenuOpen && (
            <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray'>
                <Link to="/movie" className='block hover:underline p-2' onClick={toggleMobileMenu}>Movies</Link>
                <Link to="/tv" className='block hover:underline p-2' onClick={toggleMobileMenu}>Tv Shows</Link>
                <Link to="/history" className='block hover:underline p-2' onClick={toggleMobileMenu}>Search History</Link>
            </div>
        )}
    </header>
  )
}
