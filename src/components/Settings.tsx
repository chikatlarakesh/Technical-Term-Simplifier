import { FC, useState } from 'react';
import { Bell, Volume2, Moon, Sun, Eye, Languages, User, UserCog, Save } from 'lucide-react';

const Settings: FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(true);
  const [voiceType, setVoiceType] = useState('female');
  const [voiceSpeed, setVoiceSpeed] = useState('1');
  const [language, setLanguage] = useState('en');
  
  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">Customize your learning experience</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <UserCog size={18} className="text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Account Preferences</h2>
          </div>
        </div>
        
        <div className="p-4 divide-y divide-gray-200">
          {/* Profile */}
          <div className="py-4">
            <h3 className="text-md font-medium text-gray-700 mb-3">Profile</h3>
            
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="h-24 w-24 rounded-xl bg-purple-300 flex items-center justify-center text-purple-700 font-semibold text-2xl">
                  JD
                </div>
                <button className="mt-2 text-sm text-purple-600 hover:text-purple-700">
                  Change Avatar
                </button>
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue="Jane"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    defaultValue="Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="jane.doe@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Learning Interest
                  </label>
                  <select 
                    id="category" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    defaultValue="ai"
                  >
                    <option value="ai">AI & Machine Learning</option>
                    <option value="web">Web Development</option>
                    <option value="cloud">Cloud Computing</option>
                    <option value="security">Cybersecurity</option>
                    <option value="data">Data Science</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="py-4">
            <div className="flex items-center mb-3">
              <Bell size={18} className="text-purple-600 mr-2" />
              <h3 className="text-md font-medium text-gray-700">Notifications</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                  <p className="text-xs text-gray-500">Receive alerts for new terms and progress updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Email Digest</p>
                  <p className="text-xs text-gray-500">Weekly summary of your learning progress</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={emailDigest}
                    onChange={() => setEmailDigest(!emailDigest)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Appearance */}
          <div className="py-4">
            <div className="flex items-center mb-3">
              <Eye size={18} className="text-purple-600 mr-2" />
              <h3 className="text-md font-medium text-gray-700">Appearance</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Dark Mode</p>
                <p className="text-xs text-gray-500">Switch between light and dark themes</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setDarkMode(false)}
                  className={`p-2 rounded-lg ${darkMode ? 'text-gray-400' : 'bg-yellow-100 text-yellow-600'}`}
                >
                  <Sun size={20} />
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  className={`p-2 rounded-lg ${!darkMode ? 'text-gray-400' : 'bg-purple-100 text-purple-600'}`}
                >
                  <Moon size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Text-to-Speech */}
          <div className="py-4">
            <div className="flex items-center mb-3">
              <Volume2 size={18} className="text-purple-600 mr-2" />
              <h3 className="text-md font-medium text-gray-700">Text-to-Speech</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Enable Audio Reading</p>
                  <p className="text-xs text-gray-500">Read simplified content aloud</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={textToSpeech}
                    onChange={() => setTextToSpeech(!textToSpeech)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              {textToSpeech && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-purple-100">
                  <div>
                    <label htmlFor="voice-type" className="block text-sm font-medium text-gray-700 mb-1">
                      Voice Type
                    </label>
                    <select 
                      id="voice-type" 
                      value={voiceType}
                      onChange={(e) => setVoiceType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="voice-speed" className="block text-sm font-medium text-gray-700 mb-1">
                      Default Speed
                    </label>
                    <select 
                      id="voice-speed" 
                      value={voiceSpeed}
                      onChange={(e) => setVoiceSpeed(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="0.5">0.5x</option>
                      <option value="0.75">0.75x</option>
                      <option value="1">1.0x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2.0x</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Language */}
          <div className="py-4">
            <div className="flex items-center mb-3">
              <Languages size={18} className="text-purple-600 mr-2" />
              <h3 className="text-md font-medium text-gray-700">Language & Region</h3>
            </div>
            
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Display Language
              </label>
              <select 
                id="language" 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="en">English (US)</option>
                <option value="en-uk">English (UK)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;