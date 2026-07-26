'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, LockKeyhole, Mail, UtensilsCrossed } from 'lucide-react';

import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const LoginPage = () => {
  const router = useRouter();

  // State
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Input Change Handler
  const changeEventHandler = e => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Form Submit Handler
  const submitHandler = async e => {
    e.preventDefault();
    setErrors({});

    // Client-side Basic Validation Check
    const newErrors = {};
    if (!input.email.trim()) newErrors.email = 'Email is required';
    if (!input.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Better Auth Sign In
      const { data, error } = await authClient.signIn.email({
        email: input.email,
        password: input.password,
      });

      if (data) {
        toast.success('Logged in successfully!');
        router.push('/');
      }

      if (error) {
        const errorMsg = error.message || 'Invalid email or password';
        toast.error(errorMsg);
        setErrors({ general: errorMsg });
      }
    } catch (err) {
      console.error('Login Error:', err);
      toast.error('Something went wrong. Please try again.');
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
            Login to Your Account
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
            transition={{ delay: 0.2 }}
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
                disabled={loading}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all dark:bg-gray-800 dark:text-white disabled:opacity-60 ${
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
            transition={{ delay: 0.3 }}
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
                disabled={loading}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all dark:bg-gray-800 dark:text-white disabled:opacity-60 ${
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
            transition={{ delay: 0.4 }}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="pt-2"
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-2.5 px-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
                  in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </motion.div>
        </form>

        <div className="border-t border-gray-100 dark:border-gray-800 my-6" />

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold text-orange-500 hover:text-orange-600 underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
