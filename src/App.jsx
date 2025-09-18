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
import DocsandGuide from './components/Docs&Guide'



import Portfolio from './components/projects/Portfolio'
import Todo from './components/projects/Todo'
import Ecommerce from './components/projects/Ecommerce'
import Notetaking from './components/projects/Notetaking'
import Weather from './components/projects/Weather'
import ChatApp from './components/projects/ChatApp'
import PricePrediction from './components/projects/Priceprediction'
import ImageClassifier from './components/projects/ImageClassifier'
import ChatBot from './components/projects/ChatBot'
import ProjectsPage from './components/ProjectsPage'

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
          <Route path="/Docs&Guide" element={<DocsandGuide />} />
          <Route path="/ProjectsPage" element={<ProjectsPage />} />


          {/* Projects */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/notetaking" element={<Notetaking />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/chatapp" element={<ChatApp />} />
          <Route path="/priceprediction" element={<PricePrediction />} />
          <Route path="/imageclassifier" element={<ImageClassifier />} />
          <Route path="/Chatbot" element={<ChatBot />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
