import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, API_BASE_URL } from "./api";

function ATSAnalysis() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [selectedResume, setSelectedResume] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // Fetch uploaded resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await apiFetch(`${API_BASE_URL}/api/history/`);

        if (!response.ok) {
          throw new Error("Failed to fetch resumes.");
        }

        const data = await response.json();
        setResumes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResumes();
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    if (!selectedResume) {
      setError("Please select a resume.");
      return;
    }

    if (!jobTitle.trim()) {
      setError("Please enter the job title.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter the job description.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Save Job Description
      const jdResponse = await apiFetch(
        `${API_BASE_URL}/api/job-descriptions/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_title: jobTitle,
            company: company,
            description: description,
          }),
        }
      );

      const jdData = await jdResponse.json();

      if (!jdResponse.ok) {
        throw new Error(
          jdData.detail ||
            jdData.error ||
            "Failed to save job description."
        );
      }

      // Step 2: ATS Match
      const atsResponse = await apiFetch(
        `${API_BASE_URL}/api/ats-match/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume_id: selectedResume,
            job_description_id: jdData.id,
          }),
        }
      );

      const atsData = await atsResponse.json();

      if (!atsResponse.ok) {
        throw new Error(
          atsData.detail ||
            atsData.error ||
            "ATS analysis failed."
        );
      }

      setResult(atsData.analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            ATS Resume Match
          </h1>

          <p className="mt-2 text-slate-600">
            Compare your resume with a specific job description.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleAnalyze}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Resume */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Select Resume
            </label>

            <select
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Select your resume</option>

              {resumes.map((resume) => (
                <option
                  key={resume.resume_id}
                  value={resume.resume_id}
                >
                  {resume.file_name}
                </option>
              ))}
            </select>
          </div>

          {/* Job Title */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Job Title
            </label>

            <input
              type="text"
              placeholder="e.g. Java Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {/* Company */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Company
            </label>

            <input
              type="text"
              placeholder="e.g. ABC Technologies"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {/* Job Description */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Job Description
            </label>

            <textarea
              rows={12}
              placeholder="Paste the company's job description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Analyze ATS"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex flex-col items-center border-b border-slate-200 pb-8">
              <h2 className="text-xl font-bold text-slate-900">
                ATS Match Result
              </h2>

              <div className="mt-5 flex h-32 w-32 items-center justify-center rounded-full border-8 border-emerald-500">
                <span className="text-3xl font-bold text-slate-900">
                  {result.ats_score}%
                </span>
              </div>
            </div>

            {/* Matched Keywords */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900">
                Matched Keywords
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {(result.matched_keywords || []).map(
                  (item, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700"
                    >
                      ✓ {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900">
                Missing Keywords
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {(result.missing_keywords || []).map(
                  (item, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700"
                    >
                      ✕ {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Matching Skills */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900">
                Matching Skills
              </h3>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {(result.matching_skills || []).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900">
                Recommendations
              </h3>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {(result.recommendations || []).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSAnalysis;