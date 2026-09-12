import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.tokens.access);
        localStorage.setItem("refreshToken", data.tokens.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userId", data.user.id);

        if (onLoginSuccess) {
          onLoginSuccess();
        }

        navigate("/dashboard");
      } else {
        setError(
          data.error ||
            data.detail ||
            "Invalid email or password."
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "Server connection error. Please make sure Django server is running."
      );
    }
  };

 const handleLinkedInLogin = () => {
  window.location.href =
    "http://127.0.0.1:8000/accounts/oidc/linkedin/login/";
};
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 font-sans pt-24">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Sign in to your ResumeAI account to continue.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* LinkedIn Login */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleLinkedInLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="text-base font-bold text-[#0A66C2]">
              in
            </span>

            Continue with LinkedIn
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-gray-100"></div>

          <span className="flex-shrink mx-4 text-xs text-gray-400 font-medium bg-white">
            Or continue with
          </span>

          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">
              Email Address
            </label>

            <input
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-colors"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                Password
              </label>

              <a
                href="#forgot"
                className="text-xs font-semibold text-emerald-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 pl-4 pr-10 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-3.5 px-4 rounded-xl hover:bg-zinc-900 transition-colors text-sm mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/Register"
            className="font-bold text-gray-900 hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Footer */}
        <div className="flex justify-center gap-6 text-xs text-gray-400 mt-12 pt-6 border-t border-gray-50">
          <a
            href="#privacy"
            className="hover:text-gray-600"
          >
            Privacy Policy
          </a>

          <a
            href="#terms"
            className="hover:text-gray-600"
          >
            Terms of Service
          </a>

          <a
            href="#support"
            className="hover:text-gray-600"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;