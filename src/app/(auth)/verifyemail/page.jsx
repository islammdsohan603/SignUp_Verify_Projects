'use client';

import React, { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, UtensilsCrossed } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputRef = useRef([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // URL থেকে ইমেইল রিড করা

  const handleChange = (index, value) => {
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (error) setError('');
      if (value !== '' && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  // OTP submit handler
  const submitHandler = async e => {
    e.preventDefault();
    const finalOtp = otp.join('');

    if (finalOtp.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);

    try {
      // Better Auth দিয়ে OTP ভেরিফাই করা
      const { data, error: verifyError } =
        await authClient.emailOTP.verifyEmail({
          email: email,
          otp: finalOtp,
        });

      if (verifyError) {
        toast.error(verifyError.message || 'Invalid OTP code');
        setError(verifyError.message || 'Invalid OTP code');
      } else {
        toast.success('Email verified successfully!');
        // ভেরিফিকেশন সফল হলে লগইন পেজে নিয়ে যাওয়া
        router.push('/login');
      }
    } catch (err) {
      toast.error('Verification failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP Handler
  const handleResend = async () => {
    if (!email) return;
    try {
      await authClient.emailOTP.sendVerificationOTP({
        email: email,
        type: 'email-verification',
      });
      toast.success('New OTP sent to your email!');
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-4 dark:from-gray-950 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-orange-100 dark:bg-orange-950/50 text-orange-500 rounded-full mb-3">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Enter the 6-digit verification code sent to <br />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {email}
            </span>
          </p>
        </div>

        <form onSubmit={submitHandler} noValidate className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={element => (inputRef.current[idx] = element)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
                className="w-10 h-12 md:w-12 md:h-14 text-center text-lg md:text-2xl font-bold rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
              />
            ))}
          </div>

          {error && (
            <span className="text-xs text-red-500 block text-center font-medium">
              {error}
            </span>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-orange-500/20 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-orange-500 hover:text-orange-600 underline underline-offset-4 cursor-pointer"
          >
            Resend Code
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
