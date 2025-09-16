import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Login from './components/Login'
import Signup from './components/Signup'
import Webdev from './components/Webdev'
import Mobiledev from './components/Mobiledev'
import AIML from './components/AIML'
import Tools from './components/Tools'
import Ourmission from './components/Ourmission'
import Loader from './components/Loading'  

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., API calls, assets, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 sec

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;   // 
  }

  return (
    <Router>
      <Navbar />
      <div className="pt-16"> {/* to push content below fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/projects/*" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/webdev" element={<Webdev />} />
          <Route path="/mobiledev" element={<Mobiledev />} />
          <Route path="/aiml" element={<AIML />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/ourmission" element={<Ourmission />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
