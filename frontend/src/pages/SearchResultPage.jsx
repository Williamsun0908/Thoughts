import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import api from '../lib/axios'
import { Link } from 'react-router'
import { MathJax } from 'better-react-mathjax'

const SearchResultPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query") ?? "";


  const [writings,setwritings] = useState([])
    const [loading,setloading] = useState(true)

    useEffect(() => {
        const fetchWritings = async () => {
            try {
                const res = await api.get("/writings/search", { params: { query: query } })
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
            Found {writings.length} Result for "{query}"
        </div>
        <div>
            {loading && <div></div>}
        </div>
        {writings.map(writing => 

            <div className="card border-y">
                <div className="card-body">
                    <Link to={`/writing/${writing?._id}`}>
                        <h2 className="card-title hover:text-sky-700">
                            
                                <MathJax dynamic hideUntilTypeset={"first"}>
                                    {writing?.title}
                                </MathJax>
                            
                        </h2>
                    </Link>
                    <h2 className="text-sm flex">
                        <Link className='flex hover:text-cyan-700' to={`/profile/${writing?.googleId}}`}>
                            <img className="rounded-full h-5 w-5 mr-1" src={writing?.avatar}/>
                            <span className='font-bold mr-1'>{writing?.name}</span>
                        </Link>

                            <span>
                                {" modifed on " + new Date(writing?.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                            </span>
                    </h2>
                    <MathJax dynamic hideUntilTypeset={"first"}>
                        {writing?.summary}
                    </MathJax>
                </div>
            </div>

        )}
        
    </div>
  )
}

export default SearchResultPage
