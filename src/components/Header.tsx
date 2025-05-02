import { FC, useState } from 'react';
import { Menu, Search, Bell } from 'lucide-react';

type Tab = 'dashboard' | 'vocabulary' | 'upload' | 'explore' | 'settings';

interface HeaderProps {
  toggleSidebar: () => void;
  activeTab: Tab;
}

const Header: FC<HeaderProps> = ({ toggleSidebar, activeTab }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getPageTitle = (tab: Tab): string => {
    switch(tab) {
      case 'dashboard': return 'Dashboard';
      case 'vocabulary': return 'Vocabulary Notebook';
      case 'upload': return 'Upload Document';
      case 'explore': return 'Explore Content';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 py-3 px-4 sm:px-6 flex items-center">
      <button 
        className="md:hidden mr-4 text-gray-500 hover:text-gray-700"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      
      <div className="flex-1 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{getPageTitle(activeTab)}</h1>
          <p className="text-sm text-gray-500">Learn technical terms the easy way</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Notifications */}
          <button className="p-2 rounded-full relative text-gray-500 hover:text-gray-700 hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-purple-500"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;