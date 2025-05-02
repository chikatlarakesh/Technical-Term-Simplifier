import { FC } from 'react';
import { 
  BarChart3, 
  BookOpenCheck, 
  Zap, 
  Trophy, 
  ArrowUpRight, 
  Filter 
} from 'lucide-react';
import RecentTerms from './dashboard/RecentTerms';
import ProgressTracker from './dashboard/ProgressTracker';
import CategoryFilter from './dashboard/CategoryFilter';

const Dashboard: FC = () => {
  const userName = "Jane";

  return (
    <div className="space-y-6 py-4">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userName} 👋</h1>
          <p className="text-gray-600 mt-1">You've learned 7 new terms this week. Keep it up!</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          
          <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
            <Zap size={16} className="mr-2" />
            Quick Learn
          </button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Terms Learned" 
          value="127" 
          change="+12 this week" 
          icon={<BookOpenCheck className="text-green-500" />} 
          color="bg-green-100"
        />
        <StatCard 
          title="Mastery Level" 
          value="Intermediate" 
          change="42% to Advanced" 
          icon={<Trophy className="text-yellow-500" />} 
          color="bg-yellow-100"
        />
        <StatCard 
          title="Daily Streak" 
          value="7 days" 
          change="Personal best: 14" 
          icon={<Zap className="text-purple-500" />} 
          color="bg-purple-100"
        />
        <StatCard 
          title="Categories" 
          value="5 explored" 
          change="Try Cloud Computing" 
          icon={<BarChart3 className="text-blue-500" />} 
          color="bg-blue-100"
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Terms */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">My Recent Terms</h2>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium inline-flex items-center">
                View all <ArrowUpRight size={16} className="ml-1" />
              </button>
            </div>
            
            <RecentTerms />
          </div>
        </div>
        
        {/* Right Sidebar - Progress and Categories */}
        <div className="space-y-6">
          <ProgressTracker />
          <CategoryFilter />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{change}</p>
        </div>
        <div className={`h-12 w-12 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;