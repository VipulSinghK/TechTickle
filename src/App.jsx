import React from 'react'
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

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-16"> {/* to push content below fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/projects/*" element={<Projects />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/WebDev" element={<Webdev/>} />
          <Route path="/Mobiledev" element={<Mobiledev/>} />
          <Route path="/AIML" element={<AIML/>} />
          <Route path="/Tools" element={<Tools/>} />
          <Route path="/Ourmission" element={<Ourmission/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
