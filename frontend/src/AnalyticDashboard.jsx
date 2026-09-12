import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  FileText,
  ArrowRight,
  Lightbulb,
  Code,
  Target,
  Menu,
  X,
} from "lucide-react";
import Profile from "./Profile";
import { apiFetch, API_BASE_URL } from "./api";
function AnalyticDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [file, setFile] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const [recentScans, setRecentScans] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [atsJobTitle, setAtsJobTitle] = useState("");
  const [atsCompany, setAtsCompany] = useState("");
  const [atsDescription, setAtsDescription] = useState("");

  const [atsLoading, setAtsLoading] = useState(false);
  const [atsError, setAtsError] = useState("");
  const [atsResult, setAtsResult] = useState(null);
  const [atsHistoryError, setAtsHistoryError] = useState("");
  const [atsHistory, setAtsHistory] = useState([]);
  const [atsHistoryLoading, setAtsHistoryLoading] = useState(false);

  const [analysisReport, setAnalysisReport] = useState({
    score: 0,
    skills: [],
    missingKeywords: [],
    strengths: [],
    suggestions: [],
  });
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setHistoryError("Please login first.");
        return;
      }

      try {
        setHistoryLoading(true);
        setHistoryError("");

        const response = await apiFetch(`${API_BASE_URL}/api/history/`, {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.detail || "Failed to load history.",
          );
        }

        const formattedHistory = Array.isArray(data.history)
          ? data.history.map((item) => ({
              id: item.resume_id,
              name: item.file_name,
              date: item.uploaded_at
                ? new Date(item.uploaded_at).toISOString().split("T")[0]
                : "-",
              score: item.ats_score || 0,
              skills: Array.isArray(item.skills) ? item.skills : [],
              missingKeywords: Array.isArray(item.missing_keywords)
                ? item.missing_keywords
                : [],
              strengths: Array.isArray(item.strengths) ? item.strengths : [],
              suggestions: Array.isArray(item.suggestions)
                ? item.suggestions
                : [],
            }))
          : [];

        setRecentScans(formattedHistory);
      } catch (error) {
        console.error("History error:", error);
        setHistoryError(error.message || "Failed to load history.");
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, []);
  const fetchATSHistory = async () => {
  try {
    setAtsHistoryLoading(true);
    setAtsHistoryError("");

    const response = await apiFetch(
      `${API_BASE_URL}/api/ats-history/`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.detail || "Failed to fetch ATS history."
      );
    }

    setAtsHistory(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("ATS History Error:", error);
    setAtsHistoryError(
      error.message || "Failed to load ATS history."
    );
  } finally {
    setAtsHistoryLoading(false);
  }
};
useEffect(() => {
  if (activeTab === "history") {
    fetchATSHistory();
  }
}, [activeTab]);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files?.[0];

    if (!uploadedFile) {
      return;
    }

    if (uploadedFile.type !== "application/pdf") {
      setUploadError("Please upload a PDF file.");
      return;
    }

    if (uploadedFile.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }
    setUploadError("");
    setUploadSuccess("");
    setFile(uploadedFile);
    setIsScanning(true);
    setScanProgress(10);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Please login first.");
      }

      setScanProgress(20);

      const formData = new FormData();
      formData.append("resume", uploadedFile);

      const uploadResponse = await apiFetch(
        `${API_BASE_URL}/api/resume/upload/`,
        {
          method: "POST",
          body: formData,
        },
      );
      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(
          uploadData.error || uploadData.detail || "Resume upload failed.",
        );
      }

      const resumeId = uploadData?.resume?.id;

      if (!resumeId) {
        throw new Error("Resume uploaded but resume ID was not received.");
      }

      setScanProgress(45);

      const analysisResponse = await apiFetch(
        `${API_BASE_URL}/api/analyze/${resumeId}/`,
        {
          method: "POST",
        },
      );

      const analysisData = await analysisResponse.json();

      if (!analysisResponse.ok) {
        throw new Error(
          analysisData.error ||
            analysisData.detail ||
            "Resume analysis failed.",
        );
      }

      setScanProgress(80);

      const analysis = analysisData?.analysis;

      if (!analysis) {
        throw new Error(
          "Analysis completed but analysis data was not received.",
        );
      }

      setAnalysisReport({
        score: analysis.ats_score || 0,
        skills: Array.isArray(analysis.skills) ? analysis.skills : [],
        missingKeywords: Array.isArray(analysis.missing_keywords)
          ? analysis.missing_keywords
          : [],
        strengths: Array.isArray(analysis.strengths) ? analysis.strengths : [],
        suggestions: Array.isArray(analysis.suggestions)
          ? analysis.suggestions
          : [],
      });

      setRecentScans((prevScans) => [
        {
          id: resumeId,
          name: uploadedFile.name,
          date: new Date().toISOString().split("T")[0],
          score: analysis.ats_score || 0,
          skills: Array.isArray(analysis.skills) ? analysis.skills : [],
          missingKeywords: Array.isArray(analysis.missing_keywords)
            ? analysis.missing_keywords
            : [],
          strengths: Array.isArray(analysis.strengths)
            ? analysis.strengths
            : [],
          suggestions: Array.isArray(analysis.suggestions)
            ? analysis.suggestions
            : [],
        },
        ...prevScans,
      ]);
      setUploadSuccess("Resume analyzed successfully!");
      setScanProgress(100);

      setTimeout(() => {
        setIsScanning(false);
        setActiveTab("analysis");
      }, 500);
    } catch (error) {
      setIsScanning(false);
      setScanProgress(0);

      setUploadError(error.message || "Backend server connection failed.");
    }
  };
  const handleATSMatch = async () => {
    setAtsError("");
    setAtsResult(null);

    if (!selectedResume?.id) {
      setAtsError("Please select a resume first.");
      return;
    }

    if (!atsJobTitle.trim()) {
      setAtsError("Job title is required.");
      return;
    }

    if (!atsDescription.trim()) {
      setAtsError("Job description is required.");
      return;
    }

    try {
      setAtsLoading(true);
      const jdResponse = await apiFetch(
        `${API_BASE_URL}/api/job-descriptions/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_title: atsJobTitle,
            company: atsCompany,
            description: atsDescription,
          }),
        },
      );

      const jdData = await jdResponse.json();

      if (!jdResponse.ok) {
        throw new Error(
          jdData.error || jdData.detail || "Failed to create job description.",
        );
      }
      const atsResponse = await apiFetch(`${API_BASE_URL}/api/ats-match/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume_id: selectedResume.id,
          job_description_id: jdData.id,
        }),
      });

      const atsData = await atsResponse.json();

      if (!atsResponse.ok) {
        throw new Error(
          atsData.error || atsData.detail || "ATS analysis failed.",
        );
      }

     setAtsResult({
  ...atsData.analysis,
  ats_score: Number(atsData.analysis?.ats_score) || 0,
});
    } catch (error) {
      console.error("ATS Match Error:", error);

      setAtsError(error.message || "ATS analysis failed.");
    } finally {
      setAtsLoading(false);
    }
  };
  const handleDeleteResume = async (resumeId) => {
  const resume = recentScans.find(
    (item) => item.id === resumeId
  );

  if (!resume) {
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to permanently delete "${resume.name}"?\n\nThis will also delete its AI analysis and ATS match history.`
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await apiFetch(
      `${API_BASE_URL}/api/resume/${resumeId}/`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.detail || "Failed to delete resume."
      );
    }
    setRecentScans((prevScans) =>
      prevScans.filter((item) => item.id !== resumeId)
    );
    if (selectedResume?.id === resumeId) {
      setSelectedResume(null);
      setAtsResult(null);
      setAnalysisReport({
        score: 0,
        skills: [],
        missingKeywords: [],
        strengths: [],
        suggestions: [],
      });
    }
    await fetchATSHistory();

    alert("Resume deleted successfully.");
  } catch (error) {
    console.error("Delete Resume Error:", error);

    alert(
      error.message || "Failed to delete resume."
    );
  }
};

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#f8fafc] font-sans">
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col justify-between p-4 shrink-0">
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-2 px-2 py-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              R
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-800 leading-tight">
                ResumeAI Pro
              </h2>

              <p className="text-[10px] text-emerald-600 font-semibold">
                AI Analysis Active
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === "dashboard"
                  ? "bg-[#52ebb2]/20 text-[#006c49] font-bold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>📊</span>
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === "upload"
                  ? "bg-[#52ebb2]/20 text-[#006c49] font-bold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>📁</span>
              Upload Resume
            </button>

            <button
              onClick={() => setActiveTab("analysis")}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === "analysis"
                  ? "bg-[#52ebb2]/20 text-[#006c49] font-bold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>🔬</span>
              Analysis
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === "history"
                  ? "bg-[#52ebb2]/20 text-[#006c49] font-bold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>📜</span>
              History
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === "profile"
                  ? "bg-[#52ebb2]/20 text-[#006c49] font-bold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>👤</span>
              Profile
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userName");

                window.location.href = "/login";
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <span>🚪</span>
              Logout
            </button>
          </nav>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl flex flex-col gap-3">
          <p className="text-xs text-gray-400 font-medium px-1">
            Reach full potential
          </p>

          <button className="w-full bg-emerald-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg hover:bg-emerald-700 transition-colors text-center">
            Upgrade to Pro
          </button>
        </div>
      </aside>
      <div className="md:hidden w-full bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900">ResumeAI Pro</p>

            <p className="text-[10px] text-emerald-600">AI Analysis Active</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 space-y-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab("dashboard");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-emerald-50"
          >
            📊 Dashboard
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("upload");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-emerald-50"
          >
            📁 Upload Resume
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("analysis");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-emerald-50"
          >
            🔬 Analysis
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("history");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-emerald-50"
          >
            📜 History
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("profile");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-emerald-50"
          >
            👤 Profile
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between overflow-y-auto">
        <div className="w-full">
          {activeTab === "dashboard" && (
            <>
              <header className="px-4 sm:px-6 md:px-8 pt-5 sm:pt-6 pb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Analytics Dashboard
                </h1>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Welcome back. Check your latest resume performance.
                </p>
              </header>

              <main className="px-8 py-6 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4 font-bold">
                      📈
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Latest Resume Score
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {recentScans.length > 0 ? recentScans[0].score : 0}
                      /100
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
                      AI Engine
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      Gemini
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                  <h3 className="text-md font-bold text-gray-800 mb-4">
                    Recent Scan History
                  </h3>

                  <div className="w-full border-t border-gray-100 pt-4 flex flex-col gap-3">
                    <div className="hidden sm:flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pb-2">
                      <span>File Name</span>

                      <div className="flex gap-6 md:gap-16">
                        <span>Date</span>
                        <span className="w-12 text-right">Score</span>
                        <span className="w-24 text-right">Action</span>
                      </div>
                    </div>

                    {recentScans.map((scan) => (
                      <div
                        key={scan.id}
                        className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 text-sm text-gray-700 px-2 py-3 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />

                          <span className="font-medium text-gray-900 truncate">
                            {scan.name}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3 md:gap-6 items-center">
                          <span className="text-gray-400 text-xs">
                            {scan.date}
                          </span>

                          <span className="w-12 text-right font-bold text-emerald-600">
                            {scan.score}/100
                          </span>

                          <div className="flex flex-wrap gap-2">

  <button
    type="button"
    onClick={() => {
      setSelectedResume(scan);

      setAnalysisReport({
        score: scan.score,
        skills: scan.skills || [],
        missingKeywords: scan.missingKeywords || [],
        strengths: scan.strengths || [],
        suggestions: scan.suggestions || [],
      });

      setActiveTab("analysis");
    }}
    className="px-3 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 active:scale-95 transition-all whitespace-nowrap"
  >
    View Analysis
  </button>

  <button
    type="button"
    onClick={() => handleDeleteResume(scan.id)}
    className="px-3 py-2 bg-red-50 text-red-600 border border-red-100 text-xs font-bold rounded-lg hover:bg-red-100 active:scale-95 transition-all whitespace-nowrap"
  >
    Delete
  </button>

</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
            </>
          )}

          {activeTab === "upload" && (
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
                {uploadError && (
                  <div className="w-full max-w-3xl mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                    ⚠ {uploadError}
                  </div>
                )}

                {uploadSuccess && (
                  <div className="w-full max-w-3xl mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                    ✓ {uploadSuccess}
                  </div>
                )}
                <div className="text-center max-w-xl mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                    Start your AI career scan
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Upload your resume and our AI engine will analyze your
                    skills, ATS score, missing keywords, strengths and
                    improvement suggestions.
                  </p>
                </div>

                {isScanning ? (
                  <div className="bg-white w-full p-16 rounded-2xl border-2 border-emerald-200 flex flex-col items-center justify-center text-center max-w-3xl shadow-sm">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5 animate-spin border-4 border-emerald-600 border-t-transparent"></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Analyzing Resume...
                    </h3>
                    <div className="w-64 bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-150"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 font-medium">
                      {scanProgress < 45
                        ? "Uploading resume..."
                        : scanProgress < 80
                          ? "AI is analyzing your resume..."
                          : "Preparing your analysis report..."}
                    </p>
                    <p className="text-xs text-gray-300 mt-2">
                      {scanProgress}%
                    </p>
                  </div>
                ) : (
                  <label className="bg-white w-full p-16 rounded-2xl border-2 border-dashed border-gray-200 hover:border-emerald-400 transition-colors flex flex-col items-center justify-center text-center max-w-3xl cursor-pointer shadow-sm group">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <div className="w-16 h-16 bg-[#52ebb2]/20 text-[#006c49] rounded-full flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
                      <span className="text-2xl">📤</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      Drop your resume here or{" "}
                      <span className="text-emerald-600 underline">
                        click to browse
                      </span>
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      .PDF up to 5MB supported
                    </p>
                  </label>
                )}
              </main>
            </>
          )}

          {activeTab === "analysis" && (
            <>
              <header className="px-8 pt-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  AI Analysis Report
                </h1>

                <p className="text-sm text-gray-500 mt-0.5">
                  Detailed breakdown of your resume performance.
                </p>
                {selectedResume && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Previous analysis:
                    </span>

                    <span className="text-sm font-bold text-gray-900">
                      {selectedResume.name}
                    </span>

                    <span className="text-xs text-gray-400">
                      ({selectedResume.date})
                    </span>
                  </div>
                )}
              </header>

              <main className="px-8 py-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 192 192"
                      >
                        <circle
                          className="text-gray-100"
                          cx="96"
                          cy="96"
                          fill="transparent"
                          r="80"
                          stroke="currentColor"
                          strokeWidth="10"
                        />
                        <circle
                          className="text-emerald-600"
                          cx="96"
                          cy="96"
                          fill="transparent"
                          r="80"
                          stroke="currentColor"
                          strokeWidth="10"
                          strokeDasharray="502"
                          style={{
                            strokeDashoffset:
                              502 - (502 * analysisReport.score) / 100,
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-extrabold text-gray-900">
                          {analysisReport.score}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider">
                          AI SCORE
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {analysisReport.score >= 80
                        ? "Highly Competitive"
                        : analysisReport.score >= 60
                          ? "Average Fit"
                          : "Needs Optimization"}
                    </h3>
                  </div>

                  <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-md font-bold text-gray-900 mb-4">
                        Key Improvement Targets
                      </h3>
                      <div className="space-y-4">
                        <div className="flex gap-3 items-start p-3 bg-red-50/50 rounded-xl border border-red-100">
                          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-bold text-red-900">
                              Missing Keywords
                            </h4>
                            <div className="mt-1">
                              {analysisReport.missingKeywords.length > 0 ? (
                                <p className="text-[11px] text-red-700">
                                  {analysisReport.missingKeywords.join(", ")}
                                </p>
                              ) : (
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                  <Target className="w-7 h-7 text-emerald-300 mb-2" />

                                  <p className="text-xs font-semibold text-gray-700">
                                    No missing keywords found
                                  </p>

                                  <p className="text-[11px] text-gray-400 mt-1">
                                    Great! No important keywords are missing
                                    from this analysis.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 items-start p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-bold text-emerald-900">
                              Strengths
                            </h4>
                            <p className="text-[11px] text-emerald-700 mt-0.5">
                              {analysisReport.strengths.length > 0
                                ? analysisReport.strengths.join(", ")
                                : "No strengths found"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {selectedResume && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedResume(null);
                          setActiveTab("history");
                        }}
                        className="mb-3 w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        ← Back to History
                      </button>
                    )}
                    <button
                      onClick={() => setActiveTab("upload")}
                      className="mt-6 w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                    >
                      Scan Another Resume
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-white mt-6 p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Code className="w-5 h-5 text-blue-600" />
                    <h3 className="text-md font-bold text-gray-900">
                      Detected Skills
                    </h3>
                  </div>
                  {analysisReport.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {analysisReport.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Code className="w-8 h-8 text-gray-300 mb-2" />

                      <p className="text-sm font-semibold text-gray-700">
                        No skills detected yet
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Skills will appear here after your resume is analyzed.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-[#ffffff] mt-6 p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-md font-bold text-gray-900">
                      AI Suggestions
                    </h3>
                  </div>
                  {analysisReport.suggestions.length > 0 ? (
                    <div className="space-y-3">
                      {analysisReport.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex gap-3 p-3 bg-yellow-50/50 border border-yellow-100 rounded-xl"
                        >
                          <Target className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                          <p className="text-sm text-gray-700">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Lightbulb className="w-8 h-8 text-gray-300 mb-2" />

                      <p className="text-sm font-semibold text-gray-700">
                        No AI suggestions available
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        AI suggestions will appear after your resume analysis.
                      </p>
                    </div>
                  )}
                </div>
                <div className="bg-white mt-6 p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      ATS Match Analysis
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Compare your resume with a specific job description.
                    </p>
                  </div>
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Resume
                    </label>

                    <select
                      value={selectedResume?.id || ""}
                      onChange={(e) => {
                        const resume = recentScans.find(
                          (item) => item.id === Number(e.target.value),
                        );

                        setSelectedResume(resume || null);
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select a resume</option>

                      {recentScans.map((resume) => (
                        <option key={resume.id} value={resume.id}>
                          {resume.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Title
                    </label>

                    <input
                      type="text"
                      value={atsJobTitle}
                      onChange={(e) => setAtsJobTitle(e.target.value)}
                      placeholder="e.g. Python Developer"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company
                    </label>

                    <input
                      type="text"
                      value={atsCompany}
                      onChange={(e) => setAtsCompany(e.target.value)}
                      placeholder="e.g. ABC Technologies"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Description
                    </label>

                    <textarea
                      value={atsDescription}
                      onChange={(e) => setAtsDescription(e.target.value)}
                      placeholder="Paste the job description here..."
                      rows={7}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>
                  {atsError && (
                    <div className="mb-5 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">
                      {atsError}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleATSMatch}
                    disabled={atsLoading}
                    className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {atsLoading ? "Analyzing..." : "Analyze ATS Match"}
                  </button>
                </div>
{atsResult && (
  <div className="bg-white mt-6 p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900">
        ATS Match Result
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Your resume compatibility with the selected job description.
      </p>
    </div>
    {(() => {
      const score = Number(atsResult?.ats_score || 0);

      const scoreStyle =
        score >= 80
          ? {
              card: "bg-emerald-50 border-emerald-100",
              circle: "border-emerald-100",
              text: "text-emerald-600",
              label: "Excellent Match",
            }
          : score >= 60
            ? {
                card: "bg-blue-50 border-blue-100",
                circle: "border-blue-100",
                text: "text-blue-600",
                label: "Good Match",
              }
            : score >= 40
              ? {
                  card: "bg-amber-50 border-amber-100",
                  circle: "border-amber-100",
                  text: "text-amber-600",
                  label: "Needs Improvement",
                }
              : {
                  card: "bg-red-50 border-red-100",
                  circle: "border-red-100",
                  text: "text-red-600",
                  label: "Poor Match",
                };

      return (
        <div
          className={`flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border mb-6 ${scoreStyle.card}`}
        >
          <div
            className={`w-32 h-32 rounded-full bg-white border-8 flex items-center justify-center shrink-0 shadow-sm ${scoreStyle.circle}`}
          >
            <div className="text-center">
              <p className={`text-4xl font-extrabold ${scoreStyle.text}`}>
                {score.toFixed(1)}
              </p>

              <p className="text-xs font-bold text-gray-400">
                /100
              </p>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-gray-900">
              ATS Compatibility Score
            </h3>

            <p className={`text-sm font-semibold mt-1 ${scoreStyle.text}`}>
              {scoreStyle.label}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Based on skills, keywords and job requirements.
            </p>
          </div>
        </div>
      );
    })()}
    <div className="mb-6">

      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-5 h-5 text-emerald-600" />

        <h3 className="text-md font-bold text-gray-900">
          Matched Keywords
        </h3>
      </div>

      {Array.isArray(atsResult?.matched_keywords) &&
      atsResult.matched_keywords.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {atsResult.matched_keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-semibold"
            >
              {keyword}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          No matched keywords found.
        </p>
      )}
    </div>
    <div className="mb-6">

      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-red-600" />

        <h3 className="text-md font-bold text-gray-900">
          Missing Keywords
        </h3>
      </div>

      {Array.isArray(atsResult?.missing_keywords) &&
      atsResult.missing_keywords.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {atsResult.missing_keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-red-50 text-red-700 border border-red-100 rounded-lg text-xs font-semibold"
            >
              {keyword}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-emerald-600 font-semibold">
          No missing keywords found.
        </p>
      )}
    </div>
    <div className="mb-6">

      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-5 h-5 text-blue-600" />

        <h3 className="text-md font-bold text-gray-900">
          Matching Skills
        </h3>
      </div>

      {Array.isArray(atsResult?.matching_skills) &&
      atsResult.matching_skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {atsResult.matching_skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          No matching skills found.
        </p>
      )}
    </div>
    <div>

      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-amber-500" />

        <h3 className="text-md font-bold text-gray-900">
          AI Recommendations
        </h3>
      </div>

      {Array.isArray(atsResult?.recommendations) &&
      atsResult.recommendations.length > 0 ? (
        <div className="space-y-3">
          {atsResult.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl"
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">
                {index + 1}
              </div>

              <p className="text-sm text-gray-700 leading-6">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          No recommendations available.
        </p>
      )}
    </div>

  </div>
)}
              </main>
            </>
          )}

          {activeTab === "history" && (
            <>
              <header className="px-8 pt-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Scan History
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Review your previously evaluated resumes.
                </p>
              </header>

              <main className="px-8 py-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-3xl">
                  <div className="flex flex-col gap-3">
                    {historyLoading ? (
                      <p className="text-sm text-gray-400">
                        Loading history...
                      </p>
                    ) : historyError ? (
                      <p className="text-sm text-red-500">{historyError}</p>
                    ) : recentScans.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <FileText className="w-10 h-10 text-gray-300 mb-3" />

                        <p className="text-sm font-semibold text-gray-700">
                          No resume scans yet
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Upload your first resume to see your analysis history
                          here.
                        </p>
                      </div>
                    ) : (
                      recentScans.map((scan) => (
                        <div
                          key={scan.id}
                          className="flex items-center justify-between gap-4 py-4 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 truncate">
                                {scan.name}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {scan.date}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 flex-shrink-0">
                            <span className="font-extrabold text-emerald-600">
                              {scan.score}/100
                            </span>
                            <button
                              onClick={() => {
                                setSelectedResume({
                                  id: scan.id,
                                  name: scan.name,
                                  date: scan.date,
                                  score: scan.score,
                                  skills: scan.skills || [],
                                  missingKeywords: scan.missingKeywords || [],
                                  strengths: scan.strengths || [],
                                  suggestions: scan.suggestions || [],
                                });

                                setAnalysisReport({
                                  score: scan.score,
                                  skills: scan.skills || [],
                                  missingKeywords: scan.missingKeywords || [],
                                  strengths: scan.strengths || [],
                                  suggestions: scan.suggestions || [],
                                });

                                setActiveTab("analysis");
                              }}
                              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                              View Analysis
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </main>
    <section className="px-8 pb-8">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h2 className="text-xl font-bold text-gray-900">
        ATS Match History
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Review your previous ATS match analyses.
      </p>
    </div>
  </div>

  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
    {atsHistoryLoading ? (
      <p className="text-sm text-gray-400">
        Loading ATS history...
      </p>
    ) : atsHistoryError ? (
      <p className="text-sm text-red-500">
        {atsHistoryError}
      </p>
    ) : atsHistory.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <FileText className="w-10 h-10 text-gray-300 mb-3" />

        <p className="text-sm font-semibold text-gray-700">
          No ATS matches yet
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Analyze your resume against a job description to see
          ATS results here.
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {atsHistory.map((item) => (
          <div
            key={item.id}
            className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0" />

                  <p className="font-bold text-gray-900 truncate">
                    {item.job_title}
                  </p>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  {item.company || "Company not specified"}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Resume: {item.resume_name}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString()
                    : "-"}
                </p>
              </div>

             <div className="flex items-center gap-4">
  <div className="text-center">
    <p className="text-2xl font-extrabold text-emerald-600">
      {Number(item.ats_score || 0).toFixed(1)}
    </p>

    <p className="text-[10px] text-gray-400 uppercase font-bold">
      ATS Score
    </p>
  </div>

  <button
    type="button"
    onClick={() => {
      setAtsResult({
        id: item.id,
        resume: item.resume_id,
        job_description: item.job_description_id,
        ats_score: Number(item.ats_score) || 0,
        matched_keywords: Array.isArray(item.matched_keywords)
          ? item.matched_keywords
          : [],
        missing_keywords: Array.isArray(item.missing_keywords)
          ? item.missing_keywords
          : [],
        matching_skills: Array.isArray(item.matching_skills)
          ? item.matching_skills
          : [],
        recommendations: Array.isArray(item.recommendations)
          ? item.recommendations
          : [],
      });

      setActiveTab("analysis");
    }}
    className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
  >
    View Result
  </button>
</div>

            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                  Matched Keywords
                </p>

                <div className="flex flex-wrap gap-2">
                  {Array.isArray(item.matched_keywords) &&
                  item.matched_keywords.length > 0 ? (
                    item.matched_keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      No matched keywords
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                  Missing Keywords
                </p>

                <div className="flex flex-wrap gap-2">
                  {Array.isArray(item.missing_keywords) &&
                  item.missing_keywords.length > 0 ? (
                    item.missing_keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      No missing keywords
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>
            </>
          )}

          {activeTab === "profile" && <Profile />}
        </div>
      </div>
    </div>
  );
}

export default AnalyticDashboard;
