import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle, AlertTriangle, HelpCircle, FileText, ArrowRight } from 'lucide-react';

function AnalyticDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [recentScans, setRecentScans] = useState([
    { id: 1, name: "Kaushik_Resume_Backend.pdf", date: "2026-07-14", score: 85 },
    { id: 2, name: "Kaushik_Resume_V2.pdf", date: "2026-07-10", score: 79 }
  ]);
  const [analysisReport, setAnalysisReport] = useState({
    score: 85,
    missingKeywords: ["Kubernetes", "Redux Toolkit", "AWS S3"],
    strengths: ["Architected", "Spearheaded", "Leveraged"]
  });

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setIsScanning(true);
    setScanProgress(15);

    const formData = new FormData();
    formData.append('resume', uploadedFile);

    try {
      setScanProgress(45);
    const response = await fetch('http://localhost:8000/api/analyze/', {
  method: 'POST',
  body: formData,
});
      
      setScanProgress(85);
      const data = await response.json();
      
      if (response.ok) {
        setAnalysisReport({
          score: data.score,
          missingKeywords: data.missingKeywords || [],
          strengths: data.strengths || []
        });

        setRecentScans(prevScans => [
          { id: Date.now(), name: uploadedFile.name, date: new Date().toISOString().split('T')[0], score: data.score },
          ...prevScans
        ]);
        
        setScanProgress(100);
        setTimeout(() => {
          setIsScanning(false);
          setActiveTab('analysis');
        }, 400);
      } else {
        setIsScanning(false);
        alert(data.error || "Analysis failed");
      }
    } catch (error) {
      setIsScanning(false);
      alert("Backend server connection failed");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-sans">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-4 shrink-0">
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-2 px-2 py-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              R
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800 leading-tight">ResumeAI Pro</h2>
              <p className="text-[10px] text-emerald-600 font-semibold">AI Analysis Active</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === 'dashboard' ? 'bg-[#52ebb2]/20 text-[#006c49] font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>📊</span> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === 'upload' ? 'bg-[#52ebb2]/20 text-[#006c49] font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>📁</span> Upload Resume
            </button>
            <button 
              onClick={() => setActiveTab('analysis')}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === 'analysis' ? 'bg-[#52ebb2]/20 text-[#006c49] font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>🔬</span> Analysis
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === 'history' ? 'bg-[#52ebb2]/20 text-[#006c49] font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>📜</span> History
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === 'profile' ? 'bg-[#52ebb2]/20 text-[#006c49] font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>👤</span> Profile
            </button>
          </nav>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl flex flex-col gap-3">
          <p className="text-xs text-gray-400 font-medium px-1">Reach full potential</p>
          <button className="w-full bg-emerald-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg hover:bg-emerald-700 transition-colors text-center">
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
                  Welcome back, Kaushik. Your resume performance score is in the top 10% this week.
                </p>
              </header>

              <main className="px-8 py-6 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4 font-bold">
                      📈
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Avg Resume Score
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      85/100
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 font-bold">
                      📁
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Resumes Checked
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {recentScans.length}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 font-bold">
                      ⚡
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      AI Credits Remaining
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      48/50
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-md font-bold text-gray-800 mb-4">Recent Scan History</h3>
                  <div className="w-full border-t border-gray-100 pt-4 flex flex-col gap-3">
                    <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pb-2">
                      <span>File Name</span>
                      <div className="flex gap-16">
                        <span>Date</span>
                        <span className="w-12 text-right">Score</span>
                      </div>
                    </div>
                    {recentScans.map((scan) => (
                      <div key={scan.id} className="flex justify-between items-center text-sm text-gray-700 px-2 py-3 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-gray-900">{scan.name}</span>
                        </div>
                        <div className="flex gap-16 items-center">
                          <span className="text-gray-400 text-xs">{scan.date}</span>
                          <span className="w-12 text-right font-bold text-emerald-600">{scan.score}/100</span>
                        </div>
                      </div>
                    ))}
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

                {isScanning ? (
                  <div className="bg-white w-full p-16 rounded-2xl border-2 border-emerald-200 flex flex-col items-center justify-center text-center max-w-3xl shadow-sm">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5 animate-spin border-4 border-emerald-600 border-t-transparent"></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing Resume...</h3>
                    <div className="w-64 bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
                      <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-150" style={{ width: `${scanProgress}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Step: Sending text payload to Django AI parser engine</p>
                  </div>
                ) : (
                  <label className="bg-white w-full p-16 rounded-2xl border-2 border-dashed border-gray-200 hover:border-emerald-400 transition-colors flex flex-col items-center justify-center text-center max-w-3xl cursor-pointer shadow-sm group">
                    <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                    <div className="w-16 h-16 bg-[#52ebb2]/20 text-[#006c49] rounded-full flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
                      <span className="text-2xl">📤</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      Drop your resume here or <span className="text-emerald-600 underline">click to browse</span>
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">.PDF up to 5MB supported</p>
                  </label>
                )}
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
              <main className="px-8 py-6 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                        <circle className="text-gray-100" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="10"></circle>
                        <circle className="text-emerald-600" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="10" strokeDasharray="502" style={{ strokeDashoffset: 502 - (502 * analysisReport.score) / 100 }}></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-extrabold text-gray-900">{analysisReport.score}</span>
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider">AI SCORE</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {analysisReport.score >= 80 ? 'Highly Competitive' : analysisReport.score >= 60 ? 'Average Fit' : 'Needs Optimization'}
                    </h3>
                  </div>

                  <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-md font-bold text-gray-900 mb-4">Key Improvement Targets</h3>
                      <div className="space-y-4">
                        <div className="flex gap-3 items-start p-3 bg-red-50/50 rounded-xl border border-red-100">
                          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-bold text-red-900">Missing Key Technologies</h4>
                            <p className="text-[11px] text-red-700 mt-0.5">
                              {analysisReport.missingKeywords.length > 0 ? analysisReport.missingKeywords.join(', ') : 'None missing'}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 items-start p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-bold text-emerald-900">Great Action-Oriented Verbs</h4>
                            <p className="text-[11px] text-emerald-700 mt-0.5">
                              {analysisReport.strengths.length > 0 ? analysisReport.strengths.join(', ') : 'No strengths found'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveTab('upload')} 
                      className="mt-6 w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                    >
                      Scan Another Resume <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

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
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-3xl">
                  <div className="flex flex-col gap-3">
                    {recentScans.map((scan) => (
                      <div key={scan.id} className="flex justify-between items-center text-sm text-gray-700 py-3 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-gray-900">{scan.name}</span>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="text-gray-400 text-xs">{scan.date}</span>
                          <span className="font-extrabold text-emerald-600">{scan.score}/100</span>
                        </div>
                      </div>
                    ))}
                  </div>
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
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-2xl">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Kaushik Kaush</h3>
                      <p className="text-xs text-gray-500">kaushik@resumeai.com</p>
                    </div>
                  </div>
                </div>
              </main>
            </>
          )}
        </div>

        <footer className="w-full py-6 px-8 flex justify-between items-center bg-transparent border-t border-gray-100 mt-auto shrink-0">
          <div className="text-sm font-bold text-gray-900">
            ResumeAI
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ResumeAI Analysis. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default AnalyticDashboard;