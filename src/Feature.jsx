import React from 'react';
import { CheckCircle2, Shield, Brain, Sparkles, Terminal, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

function Feature() {
  const featuresList = [
    {
      icon: <Brain className="w-6 h-6 text-emerald-600" />,
      title: "Deep AI Parsing Engine",
      description: "Our advanced algorithm extracts contact info, work history, skills, and education structures with near-perfect accuracy."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-indigo-600" />,
      title: "ATS Compatibility Scan",
      description: "Verify compliance with major ATS filters like Workday, Greenhouse, and Lever. Get real-time parser readiness rating."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: "Action-Verb Enhancer",
      description: "Automatically substitute generic experience sentences with strong, metric-driven impact descriptions."
    },
    {
      icon: <Terminal className="w-6 h-6 text-purple-600" />,
      title: "Keyword Injector",
      description: "Compare your resume against any target job description. Inject missing high-priority technical skills seamlessly."
    },
    {
      icon: <Shield className="w-6 h-6 text-rose-500" />,
      title: "Enterprise Grade Privacy",
      description: "We never store your personal data longer than needed or sell it to third-party scrapers. Keep your search safe."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      title: "Instant Scoring & PDF Download",
      description: "See your grade improve dynamically. Download your fully-compliant optimized version in high quality PDF format."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            Core Technologies
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
            Intelligent Tools to Supercharge Your Resume
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            ResumeAI optimizes every section of your profile to make you stand out to hiring managers and recruiters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/Register" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md inline-block">
            Start Scanning For Free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Feature;