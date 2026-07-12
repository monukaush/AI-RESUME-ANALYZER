import React, { useState } from 'react';

function AnalyticDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const[email, setEmail]  = useState('')
  const[password, SetPassword] = useState('')
  const[showPassword, setShowPassword] = useState(false);
  

  return (
    <div className="flex h-screen w-full bg-[#f8fafc]">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-4">
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-2 px-2 py-3">
            <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center text-white font-bold text-xs">
              R
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800 leading-tight">ResumeAI Pro</h2>
              <p className="text-[10px] text-[#10b981] font-semibold">AI Analysis Active</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === 'dashboard' ? 'bg-[#52ebb2] text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>📊</span> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === 'upload' ? 'bg-[#52ebb2] text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>📁</span> Upload Resume
            </button>
            <button 
              onClick={() => setActiveTab('analysis')}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === 'analysis' ? 'bg-[#52ebb2] text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>🔬</span> Analysis
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === 'history' ? 'bg-[#52ebb2] text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>📜</span> History
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === 'profile' ? 'bg-[#52ebb2] text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>👤</span> Profile
            </button>
          </nav>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl flex flex-col gap-3">
          <p className="text-xs text-gray-400 font-medium px-1">Reach full potential</p>
          <button className="w-full bg-[#10b981] text-white text-sm font-semibold py-2.5 px-4 rounded-lg hover:bg-[#0fa673] transition-colors text-center">
            Upgrade to Pro
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col justify-between overflow-y-auto">
        <div className="w-full">
          {activeTab === 'dashboard' && (
            <>
              <header className="px-8 pt-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Welcome back, Alex. Your resume throughput is up 12% this week.
                </p>
              </header>

              <main className="px-8 py-6 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-sm">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#10b981] mb-4">
                    📈
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Total Resumes Analyzed
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    2,841
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-md font-bold text-gray-800 mb-4">Recent History</h3>
                  <div className="w-full border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                      <span>File Name</span>
                      <span>Date</span>
                    </div>
                  </div>
                </div>
              </main>
            </>
          )}

          {activeTab === 'upload' && (
            <>
              <header className="px-8 pt-6 pb-4 flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Resume Upload
                  </h1>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  AI Engine Ready
                </div>
              </header>

              <main className="px-8 py-6 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
                <div className="text-center max-w-xl mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                    Start your AI career scan
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Our intelligent analysis engine will parse your experience, skills, and formatting to provide actionable feedback in seconds.
                  </p>
                </div>

                <div className="bg-white w-full p-16 rounded-2xl border-2 border-dashed border-gray-200 hover:border-emerald-400 transition-colors flex flex-col items-center justify-center text-center max-w-3xl cursor-pointer shadow-sm group">
                  <div className="w-16 h-16 bg-[#52ebb2]/20 text-[#006c49] rounded-full flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
                    <span className="text-2xl">📤</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Drop your resume here or <span className="text-emerald-600 underline">click to browse</span>
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">.PDF, .DOCX up to 5MB supported</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl mt-12">
                  <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg text-white flex items-center justify-center mb-3 text-sm">
                      🎯
                  </div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">ATS Score Optimization</h4>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      See how well your resume matches against industry-standard tracking systems.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg text-emerald-700 flex items-center justify-center mb-3 text-sm">
                      💡
                  </div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">Skill Gap Analysis</h4>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      AI identifies missing keywords and suggests skills to enhance your profile.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg text-indigo-700 flex items-center justify-center mb-3 text-sm">
                      ✨
                  </div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">Formatting Correction</h4>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      Detect visual errors, inconsistent spacing, and font issues instantly.
                    </p>
                  </div>
                </div>
              </main>
            </>
          )}

          {activeTab === 'analysis' && (
            <>
              <header className="px-8 pt-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  AI Analysis Report
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Detailed breakdowns and score optimization targets.
                </p>
              </header>
              <main className="px-8 py-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-gray-600 text-sm">No recent analysis records found. Upload a resume to scan insights.</p>
                </div>
              </main>
            </>
          )}

          {activeTab === 'history' && (
            <>
              <header className="px-8 pt-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Scan History
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Review all your previously evaluated application profiles.
                </p>
              </header>
              <main className="px-8 py-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-gray-600 text-sm">Your past optimization tasks history is clear.</p>
                </div>
              </main>
            </>
          )}

          {activeTab === 'profile' && (
            <>
              <header className="px-8 pt-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Account Settings
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Manage configuration metrics, tokens, and active session limits.
                </p>
              </header>
              <main className="px-8 py-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-gray-600 text-sm">Account managed profile configs under development.</p>
                </div>
              </main>
            </>
          )}
        </div>

        <footer className="w-full py-6 px-8 flex justify-between items-center bg-transparent border-t border-gray-100 mt-auto">
          <div className="text-sm font-bold text-gray-900">
            ResumeAI
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ResumeAI Analysis. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a className="hover:text-emerald-600 transition-colors" href="#privacy">Privacy Policy</a>
            <a className="hover:text-emerald-600 transition-colors" href="#terms">Terms of Service</a>
            <a className="hover:text-emerald-600 transition-colors" href="#contact">Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AnalyticDashboard;