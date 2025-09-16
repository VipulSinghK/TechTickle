
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
    visible: { opacity: 1, x: 0 },
  };

  const roadmapDropdown = [
    { name: "Web Development", path: "/Webdev" },
    { name: "Mobile Development", path: "/Mobiledev" },
    { name: "AI/ML Development", path: "/AIML" },
  ];

  const resourcesDropdown = [
    { name: "Tools", path: "/Tools" },
    { name: "Docs & Guides", path: "/resources/docs" },
    { name: "Starter Projects", path: "/resources/projects" },
  ];

  const aboutDropdown = [
    { name: "Our Team", path: "/about/team" },
    { name: "Our Mission", path: "/Ourmission" },
    { name: "History", path: "/about/history" },
  ];

  const toggleMobileDropdown = (type) => {
    setMobileDropdown(mobileDropdown === type ? null : type);
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
  className="h-8 flex items-center" // Keep navbar height small
>
  <Link to="/" aria-label="TechTickle Home">
    <img
      src="/images/techtickle-logo.png"
      alt="TechTickle Logo"
      className="h-16 w-auto max-w-[200px] object-contain" // Bigger logo but independent of parent height
      onError={(e) =>
        (e.target.src =
          "https://via.placeholder.com/200x48?text=TechTickle+Logo")
      }
    />
  </Link>
</motion.div>


        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/" className="text-gray-700 hover:text-indigo-500 transition-colors duration-200">
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
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 hover:text-indigo-500 transition-colors duration-200"
              aria-haspopup="true"
              aria-expanded={dropdownOpen === "roadmaps"}
              aria-label="Roadmaps menu"
            >
              Roadmaps
            </motion.button>
            <AnimatePresence>
              {dropdownOpen === "roadmaps" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[180px]"
                  role="menu"
                >
                  {roadmapDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200"
                      role="menuitem"
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
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 hover:text-indigo-500 transition-colors duration-200"
              aria-haspopup="true"
              aria-expanded={dropdownOpen === "resources"}
              aria-label="Resources menu"
            >
              Resources
            </motion.button>
            <AnimatePresence>
              {dropdownOpen === "resources" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[180px]"
                  role="menu"
                >
                  {resourcesDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200"
                      role="menuitem"
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
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 hover:text-indigo-500 transition-colors duration-200"
              aria-haspopup="true"
              aria-expanded={dropdownOpen === "about"}
              aria-label="About menu"
            >
              About
            </motion.button>
            <AnimatePresence>
              {dropdownOpen === "about" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[180px]"
                  role="menu"
                >
                  {aboutDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200"
                      role="menuitem"
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/community" className="text-gray-700 hover:text-indigo-500 transition-colors duration-200">
              Community
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/login" className="text-gray-700 hover:text-indigo-500 transition-colors duration-200">
              Login
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/search" className="text-gray-700 hover:text-indigo-500 transition-colors duration-200" aria-label="Search">
              🔍
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden text-2xl"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white shadow-lg"
          >
            <motion.div variants={itemVariants} className="border-b">
              <Link
                to="/"
                className="block p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="border-b">
              <button
                className="w-full p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200"
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
                        className="block p-3 text-center text-gray-700 hover:bg-indigo-100 hover:text-indigo-500 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants} className="border-b">
              <button
                className="w-full p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200"
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
                        className="block p-3 text-center text-gray-700 hover:bg-indigo-100 hover:text-indigo-500 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants} className="border-b">
              <button
                className="w-full p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200"
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
                        className="block p-3 text-center text-gray-700 hover:bg-indigo-100 hover:text-indigo-500 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants} className="border-b">
              <Link
                to="/community"
                className="block p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                to="/login"
                className="block p-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline CSS for Font */}
<style>
  {`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
    .font-roboto {
      font-family: 'Roboto', sans-serif;
    }
  `}
</style>
</nav>
);
};

export default Navbar;
