import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ChevronRight} from 'lucide-react'

export const AuthScreen = () => {
  const [email,setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    navigate("/signup?email="+email);
  }
  return (
    <div className='bg-hero relative'>
      {/* Navbar */}
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
        <img src="/netflix-logo.png" alt="logo" className='w-32 md:w-52' />
        <Link to={"/login"} className='text-white bg-red-600 py-1 px-2 rounded'>Sign In</Link>
      </header>

      {/* hero-Section */}
      <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited movies, tv shows, and more</h1>
        <p className='text-lg mb-4'>Watch anywhere, camcel anytime</p>
        <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership</p>

        <form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleSubmitForm}>
          <input 
          type="email" 
          value={email}
          placeholder='Email address'
          className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
          onChange={(e) => setEmail(e.target.value)} />
          <button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center' >
            Getting started
            <ChevronRight className='size-8 md:size-10'/>
            </button>
        </form>
      </div>

      {/* separator */}
      <div className='h-2 w-full bg-[#232323] ' aria-hidden='true'></div>

      {/* section 1 */}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
          {/* Left Side */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Enjoy on your TV</h2>
            <p className='text-ld md:text-xl'>
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple Tv, Blu-ray players, and more.
            </p>
          </div>

          {/* Right Side */}
          <div className='flex-1 relative'>
            <img src="/tv.png" alt="Tv image" className='mt-4 z-20 relative' />
            <video src="/hero-vid.m4v" type="video/mp4" 
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
              playsInline
              autoPlay={true}
              muted
              loop
            >
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className='h-2 w-full bg-[#232323] ' aria-hidden='true'></div>

      {/* section 2 */}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2'>
          {/* Left side */}
            <div className='flex-1 relative'>
              <div className='relative'>
                <img src="/stranger-things-lg.png" alt="Stranger Things img" className='mt-4' />
                <div className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4
                lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'>
                  <img src="/stranger-things-sm.png" alt="img" className='h-full' />
                  <div className='flex justiy-between items-center w-full'>
                    <div className='flex flex-col gap-0'>
                      <span className='text-md lg:text-lg font-bold'> Stranger Things</span>
                      <span className='text-sm text-blue-500'>Downloading...</span>
                    </div>
                    <img src="/download-icon.gif" alt="download" className='h-12' />
                  </div>
                </div>
              </div>
            </div>
          {/* Right Side */}
            <div className='flex-1 md:text-left text-center'>
              <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>Download your shows to watch online</h2>
              <p className='text-ld md:text-xl'> Save your favorites easily and always have something to watch</p>
            </div>  
        </div>
      </div>

      {/* separator */}
      <div className='h-2 w-full bg-[#232323] ' aria-hidden='true'></div>

      {/* section 3 */}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
          {/* Left Side */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch everywhere</h2>
            <p className='text-ld md:text-xl'>
              Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.
            </p>
          </div>

          {/* Right Side */}
          <div className='flex-1 relative'>
            <img src="/device-pile.png" alt="Device image" className='mt-4 z-20 relative' />
            <video src="/video-devices.m4v" type="video/mp4" 
              className='absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[62%]'
              playsInline
              autoPlay={true}
              muted
              loop
            >
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className='h-2 w-full bg-[#232323] ' aria-hidden='true'></div>

      {/* section 4 */}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2'>
          {/* Left side */}
            <div className='flex-1 relative'>
              <img src="/kids.png" alt="Enjoy on your TV" className='mt-4' />
            </div>
          {/* Right Side */}
            <div className='flex-1 md:text-left text-center'>
              <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>Create profiles for kids</h2>
              <p className='text-ld md:text-xl'> 
                Send kis on avantures with their favorite characters in a space made just for them-free with your membership
              </p>
            </div>  
        </div>
      </div>
    </div>
  )
}

