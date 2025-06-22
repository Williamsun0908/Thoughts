import { MathJaxContext } from 'better-react-mathjax'
import { config }         from './config/MathJaxConfig.js'
import { BrowserRouter, Routes, Route, Navigate }  from 'react-router'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar.jsx'
import { Toaster } from "react-hot-toast"

import HomePage          from './pages/HomePage.jsx';
import ProfilePage       from './pages/ProfilePage.jsx';
import CreateWritingPage from './pages/CreateWritingPage.jsx';
import SearchResultPage  from './pages/SearchResultPage.jsx';
import WritingDetailPage from './pages/WritingDetailPage.jsx';

function App() {

  const [user,setUser]=useState(null); 
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API}/auth/current-user`,{credentials:"include"})
      .then(r=>r.json()).then(setUser).finally(()=>setLoading(false));
  },[]);
  if(loading) return <p>Loading…</p>;

  return (
    <MathJaxContext version={3} config={config}>
      <div><Toaster/></div>
      <NavBar user={user}/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreateWritingPage user={user}/>}/>
        <Route path="/searchresult" element={<SearchResultPage/>}/>
        <Route path="/writing/:id" element={<WritingDetailPage user={user}/>}/>
        <Route path="/profile/:id" element={<ProfilePage user={user}/>}/>
      </Routes>
    </MathJaxContext>
  )
}

export default App
