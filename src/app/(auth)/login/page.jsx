'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  User,
  UtensilsCrossed,
} from 'lucide-react';

const LoginPage = () => {
  // Better Auth এর সাথে ইন্টিগ্রেশনের সুবিধার্থে স্টেট স্ট্রাকচার
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Input change handler
  const changeEventHandler = e => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
    // ইনপুট টাইপ করার সময় ওই ফিল্ডের এরর মুছে ফেলা
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Form submit handler
  const submitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // ক্লায়েন্ট-সাইড বেসিক ভ্যালিডেশন Check
    const newErrors = {};
    if (!input.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!input.email.trim()) newErrors.email = 'Email is required';
    if (!input.password) newErrors.password = 'Password is required';
    if (input.password && input.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // TODO: Better Auth Integration
      // await authClient.signUp.email({
      //   email: input.email,
      //   password: input.password,
      //   name: input.fullName,
      //   phoneNumber: input.contact,
      // });

      console.log('Signup Form Data:', input);
    } catch (error) {
      console.error('Signup Error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-4 dark:from-gray-950 dark:to-gray-900">
      {/* Container Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
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
            className="p-3 bg-orange-100 dark:bg-orange-950/50 text-orange-500 rounded-full mb-2"
          >
            <UtensilsCrossed className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            PatelEats
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
            Login Your Account
          </p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-500 text-sm text-center">
            {errors.general}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} noValidate className="space-y-4">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="your.email@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all dark:bg-gray-800 dark:text-white ${
                  errors.email
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                }`}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.email && (
              <span className="text-xs text-red-500 mt-1 block font-medium">
                {errors.email}
              </span>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all dark:bg-gray-800 dark:text-white ${
                  errors.password
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                }`}
              />
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.password && (
              <span className="text-xs text-red-500 mt-1 block font-medium">
                {errors.password}
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
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-2.5 px-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                'Signup'
              )}
            </button>
          </motion.div>
        </form>

        <div className="border-t border-gray-100 dark:border-gray-800 my-6" />

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-orange-500 hover:text-orange-600 underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
