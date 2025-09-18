import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import Webdev from './components/Webdev'
import Mobiledev from './components/Mobiledev'
import AIML from './components/AIML'
import Tools from './components/Tools'
import Ourmission from './components/Ourmission'
import Loader from './components/Loading'


import Portfolio from './components/projects/Portfolio'
import Todo from './components/projects/Todo'
import Ecommerce from './components/projects/Ecommerce'
import Notetaking from './components/projects/Notetaking'

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;   
  }

  return (
    <Router>
      <Navbar />
      <div className="pt-16"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/webdev" element={<Webdev />} />
          <Route path="/mobiledev" element={<Mobiledev />} />
          <Route path="/aiml" element={<AIML />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/ourmission" element={<Ourmission />} />

          {/* ✅ Clean routes for projects */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/notetaking" element={<Notetaking />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
