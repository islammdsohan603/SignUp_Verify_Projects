'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // ভেরিফিকেশন সফল হলে লগইন পেজে রিডাইরেক্ট
      router.push('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          ইমেল ভেরিফিকেশন
        </h2>
        <p className="text-sm text-gray-600 text-center">
          <span className="font-semibold">{email}</span> ঠিকানায় পাঠানো ওটিপি
          কোডটি লিখুন।
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <input
            type="text"
            maxLength={6}
            required
            placeholder="৬ ডিজিটের কোড"
            className="w-full p-3 text-center text-xl tracking-widest border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          {loading ? 'যাচাই করা হচ্ছে...' : 'ভেরিফাই করুন'}
        </button>
      </form>
    </div>
  );
}
