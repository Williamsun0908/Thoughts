import React from 'react'
import { MathJax } from 'better-react-mathjax'
import { Link } from 'react-router'
import Avatar from "boring-avatars";
import { useNavigate } from 'react-router';
import { colors, variant } from '../config/avatarStyle';

const Writing = ({ writing }) => {

    const navigate = useNavigate()

    function goToProfile(){
        navigate(`/profile/${writing.googleId}`,{
            state:{
                googleId : writing.googleId,
                name : writing.name,
            }
        })
    }

  return (
    <div className="card border-y">
        <div className="card-body">
            <Link to={`/writing/${writing._id}`}>
                <h2 className="card-title hover:text-sky-700 pb-2">
                    
                        <MathJax dynamic hideUntilTypeset={"first"}>
                            {writing.title}
                        </MathJax>
                    
                </h2>
            </Link>
            <h2 className="text-sm flex pb-2">
                <div className='flex hover:text-cyan-700 cursor-pointer' onClick={goToProfile}>
                    <Avatar className="h-5 w-5 mr-1" name={writing.name} color={colors} variant={variant}/>
                    <span className='font-bold mr-1'>{writing.name}</span>
    
                </div>

                    <span>
                        {" modifed on " + new Date(writing.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    <span onClick = {()=>{window.location = `mailto:${writing.email}`;} } className='ml-1 hover:text-slate-800 cursor-pointer font-bold text-slate-500'>Contact Author</span>
            </h2>
            <MathJax className="font-stix-math text-black" dynamic hideUntilTypeset={"first"}>
                {writing.summary}
            </MathJax>
        </div>
    </div>
  )
}

export default Writing
