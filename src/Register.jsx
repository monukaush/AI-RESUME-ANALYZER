import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Server connection error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 font-sans pt-24">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Start optimizing your resume with AI.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button type="button" className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            GitHub
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-4 text-xs text-gray-400 font-medium bg-white">Or register with</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-colors"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-colors"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full rounded-xl border border-gray-200 pl-4 pr-10 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                👁️
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-colors"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-3.5 px-4 rounded-xl hover:bg-zinc-900 transition-colors text-sm mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/Login" className="font-bold text-gray-900 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;