import { useNavigate } from "react-router-dom";

export default function DemoAnalysis() {
  const navigate = useNavigate();

  const skills = ["Python", "React", "Django", "AWS", "Docker"];
  const missingKeywords = ["Leadership", "Agile", "CI/CD"];

  const strengths = [
    "Strong technical skills",
    "Good project experience",
    "Relevant technology stack",
  ];

  const suggestions = [
    "Add measurable achievements",
    "Improve professional summary",
    "Add missing industry keywords",
  ];

  const score = 85;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans">

      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
              R
            </div>

            <div>
              <h1 className="font-bold text-gray-900">
                ResumeAI Pro
              </h1>
              <p className="text-[10px] text-emerald-600 font-semibold">
                AI Resume Analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            

            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition"
            >
              ← Back
            </button>
          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        {/* TITLE */}
        <div className="mb-8">
          <p className="text-sm text-emerald-600 font-bold mb-2">
            RESUME ANALYSIS
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Demo Analysis Report
          </h2>

          <p className="text-gray-500 mt-2">
            See how ResumeAI evaluates your resume for ATS compatibility.
          </p>
        </div>

       
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 mb-6">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div className="flex flex-col items-center justify-center">

              <div className="relative w-52 h-52 flex items-center justify-center">

                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#059669 ${score * 3.6}deg, #e5e7eb ${score * 3.6}deg)`,
                  }}
                />

                <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center">

                  <span className="text-6xl font-bold text-emerald-600">
                    {score}
                  </span>

                  <span className="text-xs font-bold text-gray-400 tracking-wider">
                    AI SCORE
                  </span>

                </div>

              </div>

              <div className="mt-5 px-5 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-sm">
                Highly Competitive
              </div>

            </div>

           
            <div>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Overall Performance
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Your resume has a strong foundation.
              </h3>

              <p className="text-gray-500 leading-relaxed mb-6">
                Your technical skills and project experience make your resume
                competitive. Adding measurable achievements and a few missing
                industry keywords can improve your ATS performance further.
              </p>

              <div className="grid grid-cols-2 gap-3">

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 font-semibold">
                    ATS Compatibility
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    88%
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 font-semibold">
                    Skills Match
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    82%
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* SKILLS */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Detected Skills
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Skills identified from your resume
              </p>
            </div>

            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-full">
              {skills.length} Skills
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-100"
              >
                ✓ {skill}
              </span>
            ))}
          </div>

        </section>

        
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
              ⚠
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Missing Keywords
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Adding these may improve your ATS match
              </p>
            </div>

          </div>

          <div className="flex flex-wrap gap-3">
            {missingKeywords.map((keyword) => (
              <span
                key={keyword}
                className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-semibold"
              >
                + {keyword}
              </span>
            ))}
          </div>

        </section>

        {/* STRENGTHS + SUGGESTIONS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* STRENGTHS */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                ✓
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Strengths
              </h3>

            </div>

            <div className="space-y-3">
              {strengths.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50"
                >
                  <span className="text-emerald-600 font-bold">
                    ✓
                  </span>

                  <span className="text-sm text-gray-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </section>

          {/* SUGGESTIONS */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                💡
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Suggestions
              </h3>

            </div>

            <div className="space-y-3">
              {suggestions.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50"
                >
                  <span className="text-emerald-600 font-bold">
                    →
                  </span>

                  <span className="text-sm text-gray-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </section>

        </div>

        {/* CTA */}
        <section className="rounded-3xl bg-[#111827] p-7 sm:p-10 text-center">

          <p className="text-emerald-400 text-sm font-bold mb-2">
            READY TO IMPROVE YOUR RESUME?
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Get your real AI resume analysis
          </h3>

          <p className="text-gray-400 text-sm mt-2 mb-6">
            Upload your resume and get personalized ATS insights.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-xl transition"
          >
            Analyze My Resume →
          </button>

        </section>

      </main>

    </div>
  );
}