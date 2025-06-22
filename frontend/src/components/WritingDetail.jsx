import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MathJax } from 'better-react-mathjax';
import api from '../lib/axios';
import { Link } from 'react-router';
import Markdown from 'react-markdown'
import "../index.css"
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import Avatar from 'boring-avatars';
import { colors, variant } from '../config/avatarStyle';

const WritingDetail = (props) => {
    const { id } = useParams()
    const [writing,setwriting] = useState([])
    const [loading,setloading] = useState(true)
    const navigate = useNavigate()
    function handleEdit(){
        navigate("/create",{
            state: {
                title: writing.title,
                summary: writing.summary,
                content: writing.content,
                writingId: writing._id
            }
        })
    }

    function goToProfile(){
        navigate(`/profile/${writing.googleId}`,{
            state:{
                googleId : writing.googleId,
                name : writing.name,
            }
        })
    }

    const handleDelete = async () => {
        try{
            await api.delete(`/writings/${writing._id}`)
        } catch(error) {
            console.log("Error deleting writing.", error)
        } finally {
            toast.success('Your writing is deleted!')
            navigate('/')
        }
    }

    useEffect(() => {
        const fetchWritings = async () => {
            try {
                const res = await api.get(`/writings/${id}`)
                setwriting(res.data)
            } catch (error) {
                console.log("Error fetching writing",error)
            } finally {
                setloading(false)
                console.log(props.user.googleId)
            }
        }
        fetchWritings()
    },[])

  return (
      loading?
      (<div>loading</div>) 
      
      : 

      (<div className="card border-y px-12">
                <div className="card-body">
                    <h2 className="card-title pb-3 text-black">
                        <MathJax dynamic hideUntilTypeset={"first"}>
                            {writing?.title}
                        </MathJax>
                    </h2>
                    <h2 className="text-sm flex items-center pb-3">
                        <div className='flex hover:text-cyan-700 cursor-pointer' onClick={goToProfile}>
                            <Avatar className="rounded-full h-5 w-5 mr-1 " name={writing?.name} variant={variant} colors={colors}/>
                            <span className='font-bold mr-1'>{writing?.name}</span>
                        </div>

                            <span>
                                {" modifed on " + new Date(writing?.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                            </span>
                        {
                            props.user?.googleId == writing.googleId && 

                            <div className='flex'>
                                <div onClick={handleEdit} className='font-bold cursor-pointer hover:text-sky-700 ml-3'>
                                    Edit
                                </div>
                                <div onClick={handleDelete} className='font-bold cursor-pointer hover:text-red-500 text-red-800 ml-3'>
                                    Delete
                                </div>
                            </div>
                        }                                    
                    </h2>
                    <div className='font-stix-math text-black'>
                        <MathJax dynamic hideUntilTypeset={"first"}>
                            {writing?.summary}
                        </MathJax>
                        
                        <MathJax dynamic hideUntilTypeset={"first"}>
                            <Markdown>
                                {writing?.content}
                            </Markdown>
                        </MathJax>
                    </div>
                </div>
            </div>)
  )}
  

export default WritingDetail