import React, { useState, useEffect } from 'react';

function Profile() {
  const [profileData, setProfileData] = useState({
    name: 'Monu Kaushik',
    email: 'monukaushik@gmail.com',
    phone: '+91 9548814457',
    location: 'Greater Noida, India',
    preferred_role: 'Backend Developer',
    experience: 'Fresher',
    expected_salary: '5-8 LPA',
    preferred_location: 'Noida',
    skills: ["React", "Node.js", "Django", "Python", "C++", "SQL", "Git", "Tailwind CSS"],
    github: 'https://github.com/monukaush',
    linkedin: 'https://www.linkedin.com/in/shivkant-sharma-8a7a67337/?skipRedirect=true',
    leetcode: 'https://leetcode.com/u/shivkantsharma_1234/'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    ...profileData, 
    github: 'https://github.com/monukaush', 
    linkedin: 'https://www.linkedin.com/in/shivkant-sharma-8a7a67337/?skipRedirect=true',
    leetcode: 'https://leetcode.com/u/shivkantsharma_1234/',
    skills: profileData.skills.join(', ') 
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const userEmail = localStorage.getItem('userEmail') || 'monukaushik@gmail.com';

  useEffect(() => {
    fetchProfile();
  }, [userEmail]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/profile/?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setFormData({
          ...data,
          skills: Array.isArray(data.skills) ? data.skills.join(', ') : data.skills
        });
      } else {
        console.log("Using default profile values (user not registered in backend yet).");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/profile/update/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          name: formData.name,
          phone: formData.phone,
          location: formData.location,
          preferred_role: formData.preferred_role,
          experience: formData.experience,
          expected_salary: formData.expected_salary,
          preferred_location: formData.preferred_location,
          skills: formData.skills,
          github: formData.github,
          linkedin: formData.linkedin,
          leetcode: formData.leetcode
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setProfileData(result.profile);
        setFormData({
          ...result.profile,
          skills: Array.isArray(result.profile.skills) ? result.profile.skills.join(', ') : result.profile.skills
        });
        setIsEditing(false);
        setMessage('Profile updated successfully!');
      } else {
        setError(result.error || 'Failed to update profile.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {message && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200">
          {message}
        </div>
      )}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
          {error}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Career Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Preferred Role</label>
                <input
                  type="text"
                  name="preferred_role"
                  value={formData.preferred_role}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Expected Salary</label>
                <input
                  type="text"
                  name="expected_salary"
                  value={formData.expected_salary}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Preferred Location</label>
                <input
                  type="text"
                  name="preferred_location"
                  value={formData.preferred_location}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Skills</h2>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Skills (comma-separated)</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                rows="3"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">GitHub URL</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">LeetCode URL</label>
                <input
                  type="url"
                  name="leetcode"
                  value={formData.leetcode}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                  placeholder="https://leetcode.com/yourusername"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...profileData,
                  skills: Array.isArray(profileData.skills) ? profileData.skills.join(', ') : profileData.skills
                });
                setIsEditing(false);
              }}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex flex-col items-center justify-between gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm sm:flex-row">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <img 
                className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-50" 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
                alt="Profile photo"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                <p className="text-sm font-medium text-gray-500">{profileData.preferred_role || "Backend Developer"}</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-1 text-gray-900">Profile Information</h2>
            <h3 className="pb-4 mb-4 text-sm text-gray-500 border-b border-gray-100">Basic information and details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Full Name</p>
                <h4 className="font-semibold text-gray-800 mt-1">{profileData.name}</h4>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</p>
                <h4 className="font-semibold text-gray-800 mt-1">{profileData.email}</h4>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</p>
                <h4 className="font-semibold text-gray-800 mt-1">{profileData.phone || "Not set"}</h4>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Location</p>
                <h4 className="font-semibold text-gray-800 mt-1">{profileData.location || "Not set"}</h4>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-1 text-gray-900">Career Preferences</h2>
            <h3 className="pb-4 mb-4 text-sm text-gray-500 border-b border-gray-100">Job expectations and preferences</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Preferred Role</p>
                <h4 className="font-semibold text-gray-800 mt-1">{profileData.preferred_role || "Not set"}</h4>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Experience</p>
                <h4 className="font-semibold text-gray-800 mt-1">{profileData.experience || "Not set"}</h4>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Expected Salary</p>
                <h4 className="font-semibold text-gray-800 mt-1">{profileData.expected_salary || "Not set"}</h4>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Preferred Location</p>
                <h4 className="font-semibold text-gray-800 mt-1">{profileData.preferred_location || "Not set"}</h4>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-1 text-gray-900">Skills</h2>
            <h3 className="pb-4 mb-6 text-sm text-gray-500 border-b border-gray-100">Technologies and programming languages</h3>

            <div className="flex flex-wrap gap-2">
              {Array.isArray(profileData.skills) && profileData.skills.length > 0 ? (
                profileData.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">No skills added yet</span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-1 text-gray-900">Professional Links</h2>
            <h3 className="pb-4 mb-6 text-sm text-gray-500 border-b border-gray-100">Online profiles and portfolio</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a 
                href={profileData.github || "https://github.com/monukaush"} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all group"
              >
                <div className="text-xl text-gray-600 group-hover:text-gray-900">💻</div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">GitHub</p>
                  <h4 className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 mt-0.5">
                    {profileData.github || "https://github.com/monukaush" ? "View Profile" : "Not connected"}
                  </h4>
                </div>
              </a>

              <a 
                href={profileData.linkedin || "https://www.linkedin.com/in/shivkant-sharma-8a7a67337/?skipRedirect=true"} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all group"
              >
                <div className="text-xl text-gray-600 group-hover:text-gray-900">🔗</div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">LinkedIn</p>
                  <h4 className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 mt-0.5">
                    {profileData.linkedin || "https://www.linkedin.com/in/shivkant-sharma-8a7a67337/?skipRedirect=true" ? "Connect" : "Not connected"}
                  </h4>
                </div>
              </a>

              <a 
                href={profileData.leetcode || "https://leetcode.com/u/shivkantsharma_1234/"} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all group"
              >
                <div className="text-xl text-gray-600 group-hover:text-gray-900">⚡</div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">LeetCode</p>
                  <h4 className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 mt-0.5">
                    {profileData.leetcode || "https://leetcode.com/u/shivkantsharma_1234/" ? "View Solved" : "Not connected"}
                  </h4>
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
        </>
      )}
    </div>
  );
}

export default Profile;