import { FC } from 'react';
import { Award, Star, Zap, Calendar } from 'lucide-react';

const ProgressTracker: FC = () => {
  const xpThisWeek = 560;
  const xpGoal = 750;
  const percentage = (xpThisWeek / xpGoal) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Your Progress</h2>
      </div>
      
      <div className="p-4">
        {/* XP Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Weekly XP Progress</span>
            <span className="text-sm font-medium text-gray-900">{xpThisWeek} / {xpGoal} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Keep learning to reach your weekly goal!</p>
        </div>
        
        {/* Achievements */}
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <Award size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">Jargon Breaker Lv.2</h3>
              <p className="text-xs text-gray-500">Simplified 50 technical terms</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg mr-3">
              <Star size={20} className="text-yellow-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">Category Master</h3>
              <p className="text-xs text-gray-500">Learned terms from 5 categories</p>
            </div>
          </div>
          
          <div className="flex items-center opacity-60">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <Zap size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">Vocabulary Wizard</h3>
              <p className="text-xs text-gray-500">Create a collection of 25 terms</p>
            </div>
            <div className="ml-auto text-xs text-purple-600">15/25</div>
          </div>
        </div>
        
        {/* Streak */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Calendar size={18} className="text-purple-600 mr-2" />
            <span className="text-sm font-medium text-gray-900">7 Day Streak!</span>
          </div>
          <div className="mt-3 flex justify-between">
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <div key={day} className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  day <= 6 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {day + 1}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][day]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;