import React from 'react'
import { Link } from 'react-router'
import { useGoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const NavBar = (props) => {

    const navigate = useNavigate()

    // const login = window.google?.accounts.oauth2.initCodeClient
    // ? () => window.location.assign(`${import.meta.env.VITE_API}/auth/google`)
    // : () => alert("Google SDK not ready");

    const login = () => {
  if (window.google?.accounts?.oauth2?.initCodeClient) {
    window.location.assign(`${import.meta.env.VITE_API}/auth/google`);
  } else {
    toast.error('Google SDK is still loading…');
  }
};

    const searchInputRef  = useRef(); 

    function handleSubmit(e){
        e.preventDefault(); 
        navigate(`/searchresult?query=${searchInputRef.current.value}`)
    }

    function goToProfile(){
        navigate(`/profile/${props.user.googleId}`,{
            state:{
                googleId : props.user.googleId,
                name : props.user.name,
            }
        })
    }

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
            <Link className="btn btn-ghost text-2xl" to="/">Thoughts</Link>
        <div className='flex mr-5'>
            <label className="flex items-center h-11 input bg-slate-50 shadow-sm">
                <svg className="h-[1em] mr-2 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <form onSubmit={handleSubmit} className="w-full">
                    <input 
                        type="search" 
                        required 
                        placeholder="Search Thoughts"
                        ref={searchInputRef}
                        />
                </form>
            </label>
        </div>
        
        </div>
        <div className="navbar-center lg:flex">
            <ul className="menu menu-horizontal px-1">
                <li>
                    <Link to={"/"}>
                        All Writings
                    </Link>
                </li>
                <li>
                    {!props.user ? (
                        <div onClick={login}>
                            My Writings
                        </div>
                    ) : (
                        <div onClick={goToProfile}>
                            My Writings
                        </div>
                    )}
                    
                </li>
            </ul>
        </div>
        <div className="navbar-end">
            <div className="btn border-none bg-slate-100" onClick={login}>
                    Login to Write
            </div>
            {!props.user ? 
            (
            <></>
        ) : (
          <div className="flex items-center gap-2">
            {/* show something nicer than JSON later */}
            
            
            <a
              className="btn border-none bg-red-50"
              href={`${import.meta.env.VITE_API}/auth/logout`}
            >
            <div className="flex justify-center cursor-pointer">
                <img className="h-8 w-8 rounded-full border-amber-100 border-2" src={props.user.avatar}/>
            </div>
              Logout
            </a>
            <Link className="btn bg-slate-100 border-none" to="/create">
                Create Writing
            </Link>
            {/* {JSON.stringify(props.user)} */}
          </div>
        )}
            
        </div>
        </div>
    </div>
  )
}

export default NavBar
