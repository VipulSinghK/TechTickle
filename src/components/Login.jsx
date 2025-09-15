import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Placeholder for login submission logic
      console.log("Login", formData);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-teal-100 to-coral-100 px-6 py-12">
      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-1 hidden md:flex justify-center"
      >
        <img
          src="https://illustrations.popsy.co/amber/man-riding-a-rocket.svg"
          alt="Login Illustration"
          className="w-3/4 max-w-md drop-shadow-2xl"
        />
      </motion.div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-1 max-w-md w-full bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-indigo-900 text-center mb-6">Login to TechTickle</h2>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key="login"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Login
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {/* Social Login */}
        <div className="mt-6">
          <p className="text-center text-gray-500 mb-4">Or continue with</p>
          <div className="flex gap-4 justify-center">
            <motion.a
              href="https://accounts.google.com"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <FcGoogle className="mr-2 text-xl" /> Google
            </motion.a>
            <motion.a
              href="https://github.com/login"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <FaGithub className="mr-2 text-xl" /> GitHub
            </motion.a>
          </div>
        </div>

        {/* Signup Link */}
        <p className="mt-6 text-center text-gray-500">
          Haven't registered?{" "}
          <Link to="/Signup" className="text-indigo-600 hover:underline font-semibold">
            Signup
          </Link>
        </p>

        {/* Back to Home Link */}
        <p className="mt-4 text-center text-gray-500">
          Back to <Link to="/" className="text-indigo-600 hover:underline">Home</Link>
        </p>
      </motion.div>

      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-pulse {
            animation: pulse 10s infinite linear;
          }
        `}
      </style>
    </section>
  );
}