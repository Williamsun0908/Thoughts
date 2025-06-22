import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import TextareaAutosize from 'react-textarea-autosize';
import { MathJax } from 'better-react-mathjax';
import axios from 'axios';
import api from '../lib/axios';
import Markdown from 'react-markdown'
import "../index.css"


import toast from 'react-hot-toast';



const CreateWritingPage = (props) => {

    const STORAGE_KEY = 'draft';
    const SAVE_DELAY  = 500;                          

    const navigate = useNavigate(); 
    const { state } = useLocation()
    const contentRef = useRef()

    const [title,    setTitle]   = useState('');
    const [summary,  setSummary] = useState('');
    const [content,     setContent]    = useState('');

    const [savedAt, setSavedAt] = useState(null);

    const [contentFocus, setContentFocus] = useState(true);

    const addToContent = (addOn) => {
      setContent(prev => prev + addOn)
      contentRef.current.focus()
    }
    const addDef = () => {
      setContent(prev => prev + "\n\n > **Definition.** ")
      contentRef.current.focus()
    }

    const addThm = () => {
      setContent(prev => prev + "\n\n > **Theorem.** ")
      contentRef.current.focus()
    }

    useEffect(() => {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      setTitle(saved.title ?? '');
      setSummary(saved.summary ?? '');
      setContent(saved.content ?? '');
      saved.savedAt && setSavedAt(new Date(saved.savedAt));
    }, []);

    useEffect(()=>{
      if(state){
        setTitle(state.title)
        setSummary(state.summary)
        setContent(state.content)
      }
    },[state])

    useEffect(() => {
      const id = setTimeout(() => {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ title, summary, content, savedAt: Date.now() })
        );
        setSavedAt(new Date());
      }, SAVE_DELAY);
      return () => clearTimeout(id);
    }, [title, summary, content]);

    const handleEdit = async () =>{
      try {
        await api.put(`/writings/${state.writingId}`,{
          title,
          summary,
          content
        })
      } catch(error) {
        console.log("Error creating writing.", error)
      } finally {
        localStorage.removeItem(STORAGE_KEY)
        toast.success("Your changes are saved!")
        navigate(`/writing/${state.writingId}`)
      }
    }

    const handleSubmit = async () => {
        if(!props.user){
          toast.error("Please login first!")
        }
        else {
              try {
                  await api.post("/writings",
                      {
                          title,
                          summary,
                          content,
                          googleId: props.user.googleId,
                          name: props.user.name,
                          avatar: props.user.avatar,
                          email: props.user.email
                      }
                    )
                } catch(error){
                    console.log("Error creating writing.", error)
                } finally {
                    localStorage.removeItem(STORAGE_KEY)
                    toast.success("Your writing is published!")
                    navigate('/')
                }
              }
    }

  return (
    <div className="flex">
        <div className="flex-1 w-1/2 p-6">
            <div className="my-2">
                <input 
                    type="text" 
                    placeholder="Title" 
                    className="text-lg my-1 input  w-full max-w"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                />
            </div>
            <div>
                <TextareaAutosize 
                    minRows={2} 
                    className="text-sm my-1 textarea w-full max-w resize-none" 
                    placeholder="Summary/Goal"
                    onChange={event => setSummary(event.target.value)}
                    value={summary}
                />
            </div>
            <div>
                <TextareaAutosize 
                    minRows={8} 
                    className="text-sm my-1 textarea w-full max-w resize-none" 
                    placeholder="Content"
                    onChange={event => setContent(event.target.value)}
                    value={content}
                    // onFocus={()=>{setContentFocus(true)}}
                    // onBlur={()=>{setContentFocus(false)}}
                    ref={contentRef}
                />
            </div>
            {
              contentFocus?
              <div>
                <div className='flex'>
                  <div onClick={addDef} className='hover:bg-slate-200 cursor-pointer px-4 py-1 rounded-lg bg-slate-100 mr-1 font-bold text-slate-600 text-sm'>Definition</div>
                  <div onClick={addThm} className='hover:bg-slate-200 cursor-pointer px-4 py-1 rounded-lg bg-slate-100 mr-1 font-bold text-slate-600 text-sm'>Theorem</div>
                </div>
                {/* <div className='flex items-center'>
                  <div><MathJax>{"$\\displaystyle\\sum_{k=1}^n$"}</MathJax></div>
                  <div><MathJax>{"$\\displaystyle\\prod_{k=1}^n$"}</MathJax></div>
                  <div><MathJax>{"$\\displaystyle\\operatorname{Hom}$"}</MathJax></div>
                  <div><MathJax>{"$\\displaystyle\\sum_{i=1}^n$"}</MathJax></div>
                  <div><MathJax>{"$\\displaystyle\\sum_{i=1}^n$"}</MathJax></div>
                  <div><MathJax>{"$\\displaystyle\\sum_{i=1}^n$"}</MathJax></div>
                </div> */}
              </div>
              :
              <></>
            }
            <div className="flex justify-between items-center">
                <span>
                    Autosaved at {savedAt
                      ? savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : '—'}
                </span>
                {
                  state?
                  (<button className="btn btn-wide bg-slate-100 border-none text-black" onClick={handleEdit}>
                    Save
                  </button>)
                  :
                  (<button className="btn btn-wide bg-slate-100 border-none text-black" onClick={handleSubmit}>
                    Submit
                  </button>)
                }
            </div>
        </div>
        <div className="w-1/2 p-6 min-h-screen h-max shadow-lg">
            <div className="card-body h-full ">
              <div>
                  <MathJax dynamic className="card-title">
                    {title}
                   </MathJax>
                   <div className='font-stix text-black'>
                      <div className="m-5"></div>
                      <MathJax dynamic>
                        {summary}
                      </MathJax>
                        <div className="m-5"></div>
                        <MathJax dynamic>
                        <Markdown
                        >
                          {content}
                        </Markdown>
                        </MathJax>
                    </div>
              </div>
                  
            </div>
        </div>
    </div>
  )
}

export default CreateWritingPage
