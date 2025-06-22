import React from 'react'
import { useState, useEffect } from 'react'
import api from '../lib/axios'
import { Link } from 'react-router'
import { MathJax } from 'better-react-mathjax'
import "../index.css"
import Writing from '../components/Writing'
import { useLocation } from 'react-router'
import Avatar from 'boring-avatars'
import { variant, colors } from '../config/avatarStyle'

const ProfilePage = () => {
    const [writings,setwritings] = useState([])
    const [loading,setloading] = useState(true)
    const { state } = useLocation()
    const googleId = state.googleId
    const name = state.name


    useEffect(() => {
        const fetchWritings = async () => {
            try {
                console.log(googleId)
                const res = await api.get(`/writings/profile/${googleId}`)
                setwritings(res.data)
            } catch (error) {
                console.log("Error fetching writings",error)
            } finally {
                setloading(false)
            }
        }
        fetchWritings()
    },[])
    return (
    <div>
        <div className='w-full bg-slate-50 flex h-14 items-center pl-6 font-bold text-xl'>
            Writings by 
            <span>
                <Avatar className="h-6 w-6 rounded-full mr-1 ml-1" name={name} variant={variant} colors={colors}/>
            </span>
            
            {name}
        </div>
        <div>
            {loading && <div></div>}
        </div>
        {writings.map(writing => 

            <Writing writing={writing}/>

        )}
      
    </div>
  )
}

export default ProfilePage
