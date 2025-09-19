import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { roadmapDropdown , resourcesDropdown } from "./menuData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const menuVariants = {
    hidden: { opacity: 0, y: -20, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20, height: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  };

  const roadmapDropdown = [
    { name: "Web Development", path: "/Webdev" },
    { name: "Mobile Development", path: "/Mobiledev" },
    { name: "AI/ML Development", path: "/AIML" },
  ];

  const resourcesDropdown = [
    { name: "Tools", path: "/Tools" },
    { name: "Docs & Guides", path: "/Docs&Guide" },
    { name: "Starter Projects", path: "/ProjectsPage" },
  ];

  const aboutDropdown = [
    { name: "Our Team", path: "/OurTeam" },
    { name: "Our Mission", path: "/Ourmission" },
    { name: "History", path: "/about/history" },
  ];

  const toggleMobileDropdown = (type) => {
    setMobileDropdown(mobileDropdown === type ? null : type);
  };

  return (
    <nav className="bg-gradient-to-r from-white to-gray-100 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="h-8 flex items-center"
        >
          <Link to="/" aria-label="TechTickle Home">
            <img
              src="/images/techtickle-logo.png"
              alt="TechTickle Logo"
              className="h-16 w-auto max-w-[200px] object-contain"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/200x48?text=TechTickle+Logo")
              }
            />
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <motion.div whileHover={{ scale: 1.1, color: '#4f46e5' }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="text-gray-700 hover:text-indigo-500 transition-colors duration-200 font-roboto">
              Home
            </Link>
          </motion.div>

          {/* Roadmaps Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen("roadmaps")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, color: '#4f46e5' }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 hover:text-indigo-500 transition-colors duration-200 font-roboto"
              aria-haspopup="true"
              aria-expanded={dropdownOpen === "roadmaps"}
              aria-label="Roadmaps menu"
            >
              Roadmaps
            </motion.button>
            <AnimatePresence>
              {dropdownOpen === "roadmaps" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[180px] border border-gray-200"
                  role="menu"
                >
                  {roadmapDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                      role="menuitem"
                      onClick={() => setDropdownOpen(null)}
                      tabIndex={0}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen("resources")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, color: '#4f46e5' }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 hover:text-indigo-500 transition-colors duration-200 font-roboto"
              aria-haspopup="true"
              aria-expanded={dropdownOpen === "resources"}
              aria-label="Resources menu"
            >
              Resources
            </motion.button>
            <AnimatePresence>
              {dropdownOpen === "resources" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[180px] border border-gray-200"
                  role="menu"
                >
                  {resourcesDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                      role="menuitem"
                      onClick={() => setDropdownOpen(null)}
                      tabIndex={0}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen("about")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, color: '#4f46e5' }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 hover:text-indigo-500 transition-colors duration-200 font-roboto"
              aria-haspopup="true"
              aria-expanded={dropdownOpen === "about"}
              aria-label="About menu"
            >
              About
            </motion.button>
            <AnimatePresence>
              {dropdownOpen === "about" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[180px] border border-gray-200"
                  role="menu"
                >
                  {aboutDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                      role="menuitem"
                      onClick={() => setDropdownOpen(null)}
                      tabIndex={0}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div whileHover={{ scale: 1.1, color: '#4f46e5' }} whileTap={{ scale: 0.95 }}>
            <Link to="/community" className="text-gray-700 hover:text-indigo-500 transition-colors duration-200 font-roboto">
              Community
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1, color: '#4f46e5' }} whileTap={{ scale: 0.95 }}>
            <Link to="/login" className="text-gray-700 hover:text-indigo-500 transition-colors duration-200 font-roboto">
              Login
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1, color: '#4f46e5' }} whileTap={{ scale: 0.95 }}>
            <Link to="/search" className="text-gray-700 hover:text-indigo-500 transition-colors duration-200 font-roboto" aria-label="Search">
              🔍
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? "×" : "☰"}
          </motion.span>
        </motion.button>
      </div>

      {/* Mobile Menu with Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden bg-white shadow-lg z-50"
            >
              <motion.div variants={itemVariants} className="border-b border-gray-200">
                <Link
                  to="/"
                  className="block p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                  onClick={() => setIsOpen(false)}
                  tabIndex={0}
                >
                  Home
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="border-b border-gray-200">
                <button
                  className="w-full p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                  onClick={() => toggleMobileDropdown("roadmaps")}
                  aria-expanded={mobileDropdown === "roadmaps"}
                  aria-label="Roadmaps menu"
                >
                  Roadmaps
                </button>
                <AnimatePresence>
                  {mobileDropdown === "roadmaps" && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-gray-50"
                    >
                      {roadmapDropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block p-3 text-center text-gray-700 hover:bg-indigo-100 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                          onClick={() => {
                            setIsOpen(false);
                            setMobileDropdown(null);
                          }}
                          tabIndex={0}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants} className="border-b border-gray-200">
                <button
                  className="w-full p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                  onClick={() => toggleMobileDropdown("resources")}
                  aria-expanded={mobileDropdown === "resources"}
                  aria-label="Resources menu"
                >
                  Resources
                </button>
                <AnimatePresence>
                  {mobileDropdown === "resources" && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-gray-50"
                    >
                      {resourcesDropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block p-3 text-center text-gray-700 hover:bg-indigo-100 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                          onClick={() => {
                            setIsOpen(false);
                            setMobileDropdown(null);
                          }}
                          tabIndex={0}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants} className="border-b border-gray-200">
                <button
                  className="w-full p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                  onClick={() => toggleMobileDropdown("about")}
                  aria-expanded={mobileDropdown === "about"}
                  aria-label="About menu"
                >
                  About
                </button>
                <AnimatePresence>
                  {mobileDropdown === "about" && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-gray-50"
                    >
                      {aboutDropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block p-3 text-center text-gray-700 hover:bg-indigo-100 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                          onClick={() => {
                            setIsOpen(false);
                            setMobileDropdown(null);
                          }}
                          tabIndex={0}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants} className="border-b border-gray-200">
                <Link
                  to="/community"
                  className="block p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                  onClick={() => setIsOpen(false)}
                  tabIndex={0}
                >
                  Community
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  to="/login"
                  className="block p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200 font-roboto"
                  onClick={() => setIsOpen(false)}
                  tabIndex={0}
                >
                  Login
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Inline CSS for Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          .font-roboto {
            font-family: 'Roboto', sans-serif;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;