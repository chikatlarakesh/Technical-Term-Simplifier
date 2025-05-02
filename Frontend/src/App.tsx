import { useState } from 'react';
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

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setShowMobileSidebar(false);
  };

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - hidden on mobile, shown on medium and up */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Mobile sidebar - shown when toggled */}
      <div className={`fixed inset-y-0 left-0 transform ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          toggleSidebar={toggleMobileSidebar} 
          activeTab={activeTab}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 pb-24 pt-2">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'vocabulary' && <VocabularyNotebook />}
          {activeTab === 'upload' && <UploadDocument />}
          {activeTab === 'explore' && <ExploreContent />}
          {activeTab === 'settings' && <Settings />}
        </main>

        <AudioPlayer />
      </div>
    </div>
  );
}

export default App;