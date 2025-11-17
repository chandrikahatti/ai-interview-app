import React, { useState, useEffect } from 'react';
import { Upload, Briefcase, Code, Users, BookOpen, TrendingUp, FileText, CheckCircle, MessageSquare } from 'lucide-react';

const AIInterviewApp = () => {
  const [screen, setScreen] = useState('email');
  const [email, setEmail] = useState('');
  const [hasOldResume, setHasOldResume] = useState(false);
  const [mode, setMode] = useState('');
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedJobPost, setSelectedJobPost] = useState('');
  const [interviewType, setInterviewType] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const jobPosts = ['Data Analyst', 'SDET', 'SMPO', 'Developer'];
  const skills = ['Java', 'Python', 'SQL', 'Power BI', 'Tableau', 'Agile', 'React', 'Node.js', 'AWS', 'Docker'];

  const interviewTypes = [
    { id: 'warmup', name: 'Warm Up', icon: '🔥', desc: 'Multiple choice questions' },
    { id: 'technical', name: 'Technical Interview', icon: '💻', desc: 'In-depth technical questions' },
    { id: 'techno-behavioral', name: 'Techno Behavioral', icon: '🤝', desc: 'Behavioral + Technical blend' },
    { id: 'coding', name: 'Coding', icon: '⌨️', desc: 'Live coding challenges' },
    { id: 'complete', name: 'Complete Interview', icon: '🎯', desc: 'Full interview experience' },
    { id: 'not-getting-calls', name: '"Not Getting Calls?"', icon: '📞', desc: 'Resume & profile help' }
  ];

  const resourceOptions = [
    { id: 'companies', name: 'Top 10 Companies Hiring', icon: '🏢', desc: 'Based on your skills' },
    { id: 'nn-questions', name: 'How to Answer NN Questions', icon: '❓', desc: 'Neural network question guides' },
    { id: 'blogs', name: 'Blog Suggestions', icon: '📝', desc: 'Latest trends in your field' },
    { id: 'upskilling', name: 'Upskilling Recommendations', icon: '📈', desc: 'Skills to learn next' },
    { id: 'project-questions', name: 'Project Question Answers', icon: '🎨', desc: 'Top answers for project questions' }
  ];

  const sampleMCQ = [
    { q: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
    { q: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correct: 1 },
    { q: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Question Language', 'Standard Query Language', 'System Query Language'], correct: 0 }
  ];

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setHasOldResume(true);
    }
  }, []);

  const handleEmailSubmit = () => {
    if (email) {
      localStorage.setItem('userEmail', email);
      if (hasOldResume) {
        setScreen('resume-choice');
      } else {
        setScreen('mode-selection');
      }
    }
  };

  const handleResumeChoice = (useOld) => {
    if (useOld) {
      setResume({ name: 'previous-resume.pdf', isOld: true });
    }
    setScreen('mode-selection');
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'resume') setResume(file);
      if (type === 'jd') setJd(file);
    }
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const startInterview = (type) => {
    if (type === 'not-getting-calls') {
      setScreen('not-getting-calls-options');
    } else {
      setInterviewType(type);
      setScreen('interview');
      setCurrentQuestion(0);
      setInterviewComplete(false);
    }
  };

  const handleAnswer = () => {
    if (currentQuestion < sampleMCQ.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setInterviewComplete(true);
      setScreen('resources');
    }
  };

  const showResource = (resourceId) => {
    setScreen('resource-detail');
    // In a real app, this would fetch actual data
  };

  // Email Screen
  if (screen === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Interview Prep</h1>
            <p className="text-gray-600">Ace your next interview with AI-powered practice</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            />
            <button
              onClick={handleEmailSubmit}
              disabled={!email}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Resume Choice Screen
  if (screen === 'resume-choice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome back!</h2>
          <p className="text-gray-600 mb-6 text-center">Would you like to use your previous resume?</p>
          
          <div className="space-y-3">
            <button
              onClick={() => handleResumeChoice(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Use Previous Resume
            </button>
            <button
              onClick={() => handleResumeChoice(false)}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Upload New Resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mode Selection Screen
  if (screen === 'mode-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Interview Mode</h1>
            <p className="text-gray-600">Select how you'd like to prepare</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div 
              onClick={() => { setMode('with-resume'); setScreen('upload-docs'); }}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Upload className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">With Resume & JD</h3>
              <p className="text-gray-600">Upload your resume and job description for personalized interview prep</p>
            </div>

            <div 
              onClick={() => { setMode('without-resume'); setScreen('skill-selection'); }}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Code className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">By Skills/Job Post</h3>
              <p className="text-gray-600">Select your skills or job role to get started quickly</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Upload Documents Screen
  if (screen === 'upload-docs') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Documents</h2>
            
            <div className="space-y-6">
              {!resume?.isOld && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition">
                  <label className="cursor-pointer block">
                    <div className="text-center">
                      <Upload className="mx-auto mb-2 text-gray-400" size={40} />
                      <p className="font-semibold text-gray-700">Upload Resume</p>
                      <p className="text-sm text-gray-500">{resume ? resume.name : 'PDF, DOC, DOCX'}</p>
                    </div>
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'resume')} accept=".pdf,.doc,.docx" />
                  </label>
                </div>
              )}

              {resume?.isOld && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                  <CheckCircle className="text-green-600 mr-3" />
                  <span className="text-green-800 font-semibold">Using previous resume</span>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition">
                <label className="cursor-pointer block">
                  <div className="text-center">
                    <FileText className="mx-auto mb-2 text-gray-400" size={40} />
                    <p className="font-semibold text-gray-700">Upload Job Description (Optional)</p>
                    <p className="text-sm text-gray-500">{jd ? jd.name : 'PDF, DOC, DOCX, TXT'}</p>
                  </div>
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'jd')} accept=".pdf,.doc,.docx,.txt" />
                </label>
              </div>

              <button
                onClick={() => setScreen('interview-types')}
                disabled={!resume}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 transition"
              >
                Continue to Interview Options
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Skill Selection Screen
  if (screen === 'skill-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Path</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Job Posts</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {jobPosts.map(job => (
                  <button
                    key={job}
                    onClick={() => { setSelectedJobPost(job); setSelectedSkills([]); }}
                    className={`p-4 rounded-lg font-semibold transition ${
                      selectedJobPost === job
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {job}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Or Select Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {skills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => { toggleSkill(skill); setSelectedJobPost(''); }}
                    className={`p-3 rounded-lg font-semibold transition ${
                      selectedSkills.includes(skill)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
              <label className="cursor-pointer block">
                <div className="text-center">
                  <FileText className="mx-auto mb-2 text-gray-400" size={40} />
                  <p className="font-semibold text-gray-700">Upload Job Description (Optional)</p>
                  <p className="text-sm text-gray-500">{jd ? jd.name : 'PDF, DOC, DOCX, TXT'}</p>
                </div>
                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'jd')} />
              </label>
            </div>

            <button
              onClick={() => setScreen('interview-types')}
              disabled={!selectedJobPost && selectedSkills.length === 0}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 transition"
            >
              Continue to Interview Options
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Interview Types Screen
  if (screen === 'interview-types') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Interview Type</h1>
            <p className="text-gray-600">Select the type of practice you need</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewTypes.map(type => (
              <div
                key={type.id}
                onClick={() => startInterview(type.id)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{type.name}</h3>
                <p className="text-gray-600 text-sm">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Interview Screen
  if (screen === 'interview') {
    const question = sampleMCQ[currentQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-indigo-600">Question {currentQuestion + 1}/{sampleMCQ.length}</span>
                <span className="text-sm font-semibold text-gray-600">{interviewType.toUpperCase()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / sampleMCQ.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.q}</h2>

            <div className="space-y-3 mb-6">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={handleAnswer}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition"
                >
                  <span className="font-semibold text-gray-700">{String.fromCharCode(65 + idx)}.</span> {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setScreen('interview-types')}
                className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Back
              </button>
              <button
                onClick={handleAnswer}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Resources Screen
  if (screen === 'resources') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Interview Complete!</h1>
              <p className="text-gray-600">Great job! Here are some resources to help you further</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {resourceOptions.map(resource => (
              <div
                key={resource.id}
                onClick={() => showResource(resource.id)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{resource.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.name}</h3>
                <p className="text-gray-600 text-sm">{resource.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setScreen('interview-types')}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Start Another Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Resource Detail Screen
  if (screen === 'resource-detail') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Top 10 Companies Hiring</h2>
            
            <div className="space-y-4">
              {[
                { company: 'Google', role: 'Software Engineer', skills: 'Java, Python, System Design', link: '#' },
                { company: 'Microsoft', role: 'Data Analyst', skills: 'SQL, Power BI, Excel', link: '#' },
                { company: 'Amazon', role: 'SDET', skills: 'Java, Selenium, API Testing', link: '#' },
                { company: 'Meta', role: 'Full Stack Developer', skills: 'React, Node.js, GraphQL', link: '#' },
                { company: 'Apple', role: 'iOS Developer', skills: 'Swift, iOS SDK, UI/UX', link: '#' }
              ].map((job, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{job.company}</h3>
                      <p className="text-gray-600">{job.role}</p>
                    </div>
                    <a 
                      href={job.link}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
                    >
                      Apply
                    </a>
                  </div>
                  <p className="text-sm text-gray-500">Skills: {job.skills}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen('resources')}
              className="mt-6 px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Back to Resources
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AIInterviewApp;
