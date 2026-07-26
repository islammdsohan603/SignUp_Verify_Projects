import {
  Link,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  User,
  UtensilsCrossed,
} from 'lucide-react';
import React, { useState } from 'react';

const SignupPage = () => {
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState();

  const [input, setInput] = useState();

  return (
    <div>
      return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-4">
        {/* Container Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          {/* Header Section */}
          <div className="flex flex-col items-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="p-3 bg-orange-100 text-orange-500 rounded-full mb-2"
            >
              <UtensilsCrossed className="w-8 h-8" />
            </motion.div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              PatelEats
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Create an account to order your favorite food!
            </p>
          </div>

          {/* Form - noValidate*/}
          <form onSubmit={submitHandler} noValidate className="space-y-4">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={input.fullName}
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  className={`pl-10 focus-visible:ring-orange-500 ${
                    errors.fullName
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }`}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.fullName && (
                <span className="text-xs text-red-500 mt-1 block font-medium">
                  {errors.fullName[0]}
                </span>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="your.email@example.com"
                  className={`pl-10 focus-visible:ring-orange-500 ${
                    errors.email
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }`}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.email && (
                <span className="text-xs text-red-500 mt-1 block font-medium">
                  {errors.email[0]}
                </span>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className={`pl-10 focus-visible:ring-orange-500 ${
                    errors.password
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }`}
                />
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.password && (
                <span className="text-xs text-red-500 mt-1 block font-medium">
                  {errors.password[0]}
                </span>
              )}
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Contact
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="contact"
                  value={input.contact}
                  onChange={changeEventHandler}
                  placeholder="+8801700000000"
                  className={`pl-10 focus-visible:ring-orange-500 ${
                    errors.contact
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }`}
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.contact && (
                <span className="text-xs text-red-500 mt-1 block font-medium">
                  {errors.contact[0]}
                </span>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              {loading ? (
                <button
                  disabled
                  className="w-full bg-orange-400 text-white font-medium"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </button>
              ) : (
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all shadow-md shadow-orange-100"
                >
                  Signup
                </Button>
              )}
            </motion.div>
          </form>

          <div className="border-t border-gray-100 my-6" />

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-orange-500 hover:text-orange-600 underline underline-offset-4"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
      );
    </div>
  );
};

export default SignupPage;
