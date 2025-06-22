import React from 'react'
import { useState, useEffect } from 'react'
import { MathJax } from "better-react-mathjax";
import api from '../lib/axios'
import { Link } from 'react-router'
import Writing from './Writing.jsx';
import '../index.css'


const AllWritingsDisplay = () => {
    const [writings,setwritings] = useState([])
    const [loading,setloading] = useState(true)

    useEffect(() => {
        const fetchWritings = async () => {
            try {
                const res = await api.get("/writings")
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
        <div>
            {loading && <div></div>}
        </div>
        {writings.map(writing => 

            <Writing writing={writing}/>

        )}
        
    </div>
  )
}

export default AllWritingsDisplay
