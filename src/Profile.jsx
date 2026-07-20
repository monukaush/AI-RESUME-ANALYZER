function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="flex flex-col items-center justify-between gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm sm:flex-row">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <img 
            className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-50" 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
            alt="Profile photo"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Monu Kaushik</h1>
            <p className="text-sm font-medium text-gray-500">Backend Developer</p>
          </div>
        </div>
        
        <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-1 text-gray-900">Profile Information</h2>
        <h3 className="pb-4 mb-4 text-sm text-gray-500 border-b border-gray-100">Basic information and details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Full Name</p>
            <h4 className="font-semibold text-gray-800 mt-1">Monu Kaushik</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</p>
            <h4 className="font-semibold text-gray-800 mt-1">monukaushik@gmail.com</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</p>
            <h4 className="font-semibold text-gray-800 mt-1">+91 9548814457</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Location</p>
            <h4 className="font-semibold text-gray-800 mt-1">Greater Noida, India</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-1 text-gray-900">Career Preferences</h2>
        <h3 className="pb-4 mb-4 text-sm text-gray-500 border-b border-gray-100">Job expectations and preferences</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Preferred Role</p>
            <h4 className="font-semibold text-gray-800 mt-1">Backend Developer</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Experience</p>
            <h4 className="font-semibold text-gray-800 mt-1">Fresher</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Expected Salary</p>
            <h4 className="font-semibold text-gray-800 mt-1">5-8 LPA</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Preferred Location</p>
            <h4 className="font-semibold text-gray-800 mt-1">Noida</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-1 text-gray-900">Skills</h2>
        <h3 className="pb-4 mb-6 text-sm text-gray-500 border-b border-gray-100">Technologies and programming languages</h3>

        <div className="flex flex-wrap gap-2">
          {["React", "Node.js", "Django", "Python", "C++", "SQL", "Git", "Tailwind CSS"].map((skill) => (
            <span 
              key={skill} 
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-1 text-gray-900">Professional Links</h2>
        <h3 className="pb-4 mb-6 text-sm text-gray-500 border-b border-gray-100">Online profiles and portfolio</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#" className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all group">
            <div className="text-xl text-gray-600 group-hover:text-gray-900">💻</div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">GitHub</p>
              <h4 className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 mt-0.5">View Profile</h4>
            </div>
          </a>

          <a href="#" className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all group">
            <div className="text-xl text-gray-600 group-hover:text-gray-900">🔗</div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">LinkedIn</p>
              <h4 className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 mt-0.5">Connect</h4>
            </div>
          </a>

          <a href="#" className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all group">
            <div className="text-xl text-gray-600 group-hover:text-gray-900">🌐</div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Portfolio</p>
              <h4 className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 mt-0.5">Visit Site</h4>
            </div>
          </a>

          <a href="#" className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all group">
            <div className="text-xl text-gray-600 group-hover:text-gray-900">⚡</div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">LeetCode</p>
              <h4 className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 mt-0.5">View Solved</h4>
            </div>
          </a>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-1 text-gray-900">AI Recommendations ⭐</h2>
        <h3 className="pb-4 mb-6 text-sm text-gray-500 border-b border-gray-100">💡 AI Suggestions</h3>

        <div className="space-y-3">
          {[
            "Add more quantified achievements",
            "Improve project descriptions",
            "Add AWS or Docker skills",
            "Include more action verbs"
          ].map((suggestion, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50 text-gray-700 text-sm font-medium"
            >
              <span className="text-green-600 font-bold">✔</span>
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-1 text-gray-900">Resume Statistics</h2>
        <h3 className="pb-4 mb-6 text-sm text-gray-500 border-b border-gray-100">Performance metrics and overview</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Resumes</span>
              <span className="text-lg">📄</span>
            </div>
            <h4 className="text-2xl font-bold text-gray-800">12</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Highest ATS Score</span>
              <span className="text-lg">⭐</span>
            </div>
            <h4 className="text-2xl font-bold text-green-600">94</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Average Score</span>
              <span className="text-lg">📊</span>
            </div>
            <h4 className="text-2xl font-bold text-blue-600">87</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Analyses Completed</span>
              <span className="text-lg">🔥</span>
            </div>
            <h4 className="text-2xl font-bold text-orange-600">28</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-1 text-gray-900">Account Details</h2>
        <h3 className="pb-4 mb-4 text-sm text-gray-500 border-b border-gray-100">Plan usage and account status</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</p>
            <h4 className="font-semibold text-gray-800 mt-1">Free</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">AI Credits</p>
            <h4 className="font-semibold text-gray-800 mt-1">48 / 50</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email Verified</p>
            <h4 className="font-semibold text-green-600 mt-1">✅ Verified</h4>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Member Since</p>
            <h4 className="font-semibold text-gray-800 mt-1">July 2026</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-1 text-gray-900">Recent Activity</h2>
        <h3 className="pb-4 mb-6 text-sm text-gray-500 border-b border-gray-100">Latest actions and profile updates</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg text-lg">📄</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-800">Uploaded Resume.pdf</h4>
                <span className="text-xs text-gray-400">Recent</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg text-lg">📈</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-800">ATS Score Improved</h4>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">82 → 91</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg text-lg">🔍</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-800">Last Analysis</h4>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;