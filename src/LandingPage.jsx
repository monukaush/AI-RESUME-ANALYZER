
import { Link } from 'react-router'; // Uses React Router for native seamless page transitions
import { ArrowRight, PlayCircle, CheckCircle, Info, Key, Award, Shield } from 'lucide-react';


export default function LandingPage() {
  
  // Re-creating the micro-interaction scroll animations
 

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-sans overflow-x-hidden min-h-screen">
      
      <main className="pt-24">
        
        {/* Hero Section */}
        <section className="relative px-6 py-16 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6 relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#6cf8bb]/20 text-[#00714d] text-xs font-medium gap-2">
                <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
                Powered by Advanced GPT-4 Analysis
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight">
                Transform Your Resume with <span className="text-[#006c49]">AI-Powered</span> Insights.
              </h1>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                Upload your resume and let our AI engine scan for gaps, optimize keywords, and calculate your competitive score in seconds. Get hired faster by top-tier tech companies.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <Link to="/Register" className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm text-sm ">
  Get Started Free
  <ArrowRight className="w-4 h-4" />
</Link>
              
                <button className="w-full sm:w-auto border border-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-[#f7f9fb] transition-all flex items-center justify-center gap-2 bg-red-400">
                  <PlayCircle className="w-5 h-5" />
                  See Demo
                </button>
              </div>

              
            </div>

            {/* Right Column Dashboard Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 shadow-sm overflow-hidden">
                
                {/* Score Radial Visualizer */}
                <div className="flex flex-col items-center text-center space-y-4 py-8">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                      <circle className="text-gray-200" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                      <circle className="text-[#006c49]" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" strokeDasharray="553" strokeDashoffset="83"></circle>
                    </svg> */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-extrabold text-black">85</span>
                      <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">AI SCORE</span>
                    </div>
                  </div>
                  <div className="bg-[#6cf8bb]/20 px-4 py-2 rounded-full text-[#006c49] font-bold text-sm">
                    Highly Competitive
                  </div>
                </div>

                {/* Analysis List Snippet */}
                <div className="space-y-3 mt-4 border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#f7f9fb]">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-[#006c49] w-5 h-5" />
                      <span className="text-sm font-medium">Cloud Computing Keywords</span>
                    </div>
                    <span className="text-[#006c49] font-bold text-sm">+12pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#f7f9fb]">
                    <div className="flex items-center gap-3">
                      <Info className="text-red-600 w-5 h-5" />
                      <span className="text-sm font-medium">Missing Impact Metrics</span>
                    </div>
                    <span className="text-red-600 font-bold text-sm">-8pts</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 border border-gray-100 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-black p-2 rounded-lg text-white">
                  <ArrowRight className="w-4 h-4 transform -rotate-45" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">Analysis Ready</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Just now</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Feature Grid Section */}
        <section id="features" className="bg-white py-16 px-6 border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-black">Powerful Intelligence for Your Job Search</h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                We leverage the same ATS technology used by Fortune 500 companies to give you the upper hand in every application.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl border border-gray-100 hover-lift bg-white shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">AI Scoring</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Get a real-time "Hireability Score" based on current market demands and specific job descriptions. Know exactly where you stand.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-gray-100 hover-lift bg-white shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white mb-4">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Keyword Optimization</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Identify missing technical skills and soft skills that ATS filters look for. Automatically inject them into your experience sections.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-gray-100 hover-lift bg-white shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white mb-4">
                  <Info className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Instant Feedback</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  No more waiting days for feedback. Our AI provides line-by-line improvement suggestions for impact, tone, and formatting in seconds.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Bento Grid Analysis Preview */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            <div className="lg:col-span-8 bg-[#131b2e] rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="relative z-10">
                <span className="bg-[#006c49] text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">NEW FEATURE</span>
                <h2 className="text-3xl font-bold tracking-tight mb-3">Deep Job Matching</h2>
                <p className="text-sm text-gray-300 max-w-md leading-relaxed">
                  Paste a LinkedIn job URL and we'll instantly rewrite your bullet points to match the exact requirements of that role.
                </p>
              </div>
              <div className="mt-8 relative z-10 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl text-black">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white/70">Matching for: "Senior Product Designer"</span>
                  <span className="text-[#6cf8bb] font-bold text-sm">92% Match</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded bg-[#006c49]/30 text-[#6cf8bb] text-[10px] font-bold">FIGMA</span>
                  <span className="px-2 py-1 rounded bg-[#006c49]/30 text-[#6cf8bb] text-[10px] font-bold">SYSTEMS DESIGN</span>
                  <span className="px-2 py-1 rounded bg-[#006c49]/30 text-[#6cf8bb] text-[10px] font-bold">USER RESEARCH</span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#006c49]/20 rounded-full blur-3xl -mr-20 -mb-20"></div>
            </div>

            <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-8 flex flex-col justify-center items-center text-center space-y-4 shadow-sm">
              <div className="w-20 h-20 bg-[#6cf8bb]/20 rounded-full flex items-center justify-center text-[#006c49]">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-black">ATS Certified</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our templates are 100% compliant with major ATS systems like Workday, Lever, and Greenhouse.
              </p>
              <button className="text-[#006c49] font-bold text-sm hover:underline">View Templates</button>
            </div>

            <div className="lg:col-span-12 bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-black">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg font-bold text-black">Enterprise-Grade Security</p>
                  <p className="text-sm text-gray-500">Your data is encrypted and never sold to third parties.</p>
                </div>
              </div>
              <div className="flex items-center gap-8 grayscale opacity-40 font-black tracking-wider text-xl text-black">
                <span>SECURE</span>
                <span>TRUSTED</span>
                <span>VERIFIED</span>
              </div>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto rounded-3xl bg-black text-white p-8 md:p-12 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Ready to Land Your Dream Job?</h2>
              <p className="text-base text-gray-300 max-w-xl mx-auto">
                Join over 50,000 professionals who used AI to optimize their career trajectory. No credit card required to start.
              </p>
              <Link to="/Register" className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform inline-block">
                Analyze My Resume Now
              </Link>
            </div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#006c49]/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#006c49]/5 rounded-full blur-3xl"></div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center bg-[#f7f9fb] border-t border-gray-200/50">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <img alt="Logo Small" className="h-8 w-auto rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRzLdfwRTuMfU7mtBRjk5tBfmPgxUBknXXkiiBMe8eK_RsAGjMj1sEDR_eUiRbXt0O6G6BsruQqAMrL3HcyutfKQrXi-XvXyuAPtJV-GySWOcP-6MAsJcrOUhjQ8C6Zawr5iybGwbAKp_gGgnViUvCxlcz89LCazidoSGb7axz9BrgDZi2I9p8nRj-XJPO8g9WN8S6bNQ9Jop3y_7oNSid4bhIRUY31n8pMEh9QkNhZM8b0bA7rKSojA" />
          <span className="text-xl font-bold text-black">ResumeAI</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-500">
          <a className="hover:text-[#006c49] transition-colors" href="#privacy">Privacy Policy</a>
          <a className="hover:text-[#006c49] transition-colors" href="#terms">Terms of Service</a>
          <a className="hover:text-[#006c49] transition-colors" href="#contact">Contact</a>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-gray-400">
          © {new Date().getFullYear()} ResumeAI Analysis. All rights reserved.
        </p>
      </footer>

    </div>
  );
}