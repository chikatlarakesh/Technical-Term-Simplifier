// App.tsx
import { useState, useEffect } from 'react';
import { auth, googleProvider, githubProvider, facebookProvider } from './firebase'; // Import all providers
import { signInWithPopup, signOut } from 'firebase/auth';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VocabularyNotebook from './components/VocabularyNotebook';
import UploadDocument from './components/UploadDocument';
import ExploreContent from './components/ExploreContent';
import Settings from './components/Settings';
import Header from './components/Header';
import AudioPlayer from './components/AudioPlayer';

type Tab = 'dashboard' | 'vocabulary' | 'upload' | 'explore' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [showSignup, setShowSignup] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) setShowSignup(false);
    });
    return () => unsubscribe();
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setShowMobileSidebar(false);
  };

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (!currentUser) {
    return showSignup ? (
      <Signup 
        onSignIn={() => setShowSignup(false)} 
        switchToLogin={() => setShowSignup(false)} 
      />
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-2 bg-white py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 mb-3"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="h-5 w-5" 
            />
            Sign in with Google
          </button>
          <button
            onClick={handleGithubSignIn}
            className="w-full flex justify-center items-center gap-2 bg-white py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 mb-3"
          >
            <img 
              src="https://github.com/favicon.ico" 
              alt="GitHub" 
              className="h-5 w-5" 
            />
            Sign in with GitHub
          </button>
          <button
            onClick={handleFacebookSignIn}
            className="w-full flex justify-center items-center gap-2 bg-white py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 mb-3"
          >
            <img 
              src="https://www.facebook.com/favicon.ico" 
              alt="Facebook" 
              className="h-5 w-5" 
            />
            Sign in with Facebook
          </button>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => setShowSignup(true)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up instead
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      {showMobileSidebar && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      <div className={`fixed inset-y-0 left-0 transform ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleMobileSidebar} activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto px-4 sm:px 것을6 pb-24 pt-2">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'vocabulary' && <VocabularyNotebook />}
          {activeTab === 'upload' && <UploadDocument />}
          {activeTab === 'explore' && <ExploreContent />}
          {activeTab === 'settings' && <Settings />}
        </main>
        <AudioPlayer />
      </div>
      <button 
        onClick={handleSignOut}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}

export default App;