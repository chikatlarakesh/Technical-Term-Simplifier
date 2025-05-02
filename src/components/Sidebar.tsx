import { FC } from 'react';
import { 
  Home, 
  BookOpen, 
  NotebookPen, 
  Upload, 
  Compass, 
  Settings, 
  BookText 
} from 'lucide-react';

type Tab = 'dashboard' | 'vocabulary' | 'upload' | 'explore' | 'settings';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Sidebar: FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { 
      id: 'dashboard' as Tab,
      name: 'Dashboard',
      icon: <Home size={20} />,
      description: 'Home'
    },
    { 
      id: 'vocabulary' as Tab,
      name: 'Vocabulary Notebook',
      icon: <NotebookPen size={20} />,
      description: 'Your saved terms'
    },
    { 
      id: 'upload' as Tab, 
      name: 'Upload Document',
      icon: <Upload size={20} />,
      description: 'Add new content'
    },
    { 
      id: 'explore' as Tab,
      name: 'Explore Content',
      icon: <Compass size={20} />,
      description: 'Discover new topics'
    },
    { 
      id: 'settings' as Tab,
      name: 'Settings',
      icon: <Settings size={20} />,
      description: 'Your preferences'
    }
  ];

  return (
    <div className="h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center border-b border-gray-200">
        <div className="mr-2 p-2 bg-purple-100 rounded-lg">
          <BookText className="text-purple-600" size={24} />
        </div>
        <div>
          <h1 className="font-semibold text-lg text-gray-800">Term Simplifier</h1>
          <p className="text-xs text-gray-500">Learn with ease</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
        <ul className="px-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full px-3 py-3 flex items-center space-x-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className={`${activeTab === item.id ? 'text-purple-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.description}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-purple-300 flex items-center justify-center text-purple-700 font-semibold">
            JD
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Jane Doe</p>
            <p className="text-xs text-gray-500">Level 3 Learner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;