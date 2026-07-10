import React from 'react';

function AnalyticDashboard() {
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
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <span>📊</span> Dashboard
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <span>📤</span> Upload Resume
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl bg-[#52ebb2] text-gray-900 transition-colors">
              <span>📈</span> Analysis
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <span>🕒</span> History
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
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

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="px-8 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back, Alex. Your resume throughput is up 12% this week.
          </p>
        </header>

        <main className="flex-1 px-8 py-6 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-sm">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#10b981] mb-4">
              📄
            </div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Total Resumes Analyzed
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              2,841
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 p-6">
            <h3 className="text-md font-bold text-gray-800 mb-4">Recent History</h3>
            <div className="w-full border-t border-gray-100 pt-4">
              <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                <span>File Name</span>
                <span>Date</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AnalyticDashboard;