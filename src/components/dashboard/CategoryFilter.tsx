import { FC, useState } from 'react';
import { PieChart, Filter } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Categories', count: 127, color: 'bg-gray-200 text-gray-800' },
  { id: 'ai', name: 'AI & Machine Learning', count: 42, color: 'bg-blue-100 text-blue-800' },
  { id: 'web', name: 'Web Development', count: 35, color: 'bg-purple-100 text-purple-800' },
  { id: 'cloud', name: 'Cloud Computing', count: 28, color: 'bg-green-100 text-green-800' },
  { id: 'security', name: 'Cybersecurity', count: 15, color: 'bg-red-100 text-red-800' },
  { id: 'data', name: 'Data Science', count: 7, color: 'bg-yellow-100 text-yellow-800' },
];

const CategoryFilter: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <PieChart size={18} className="text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
        </div>
        <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
          <Filter size={14} className="mr-1" />
          Filter
        </button>
      </div>
      
      <div className="p-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`w-full px-3 py-2.5 flex items-center justify-between rounded-lg mb-1 transition-colors ${
              selectedCategory === category.id
                ? 'bg-purple-50 border border-purple-200'
                : 'hover:bg-gray-50 border border-transparent'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="text-sm font-medium text-gray-700">{category.name}</span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${category.color}`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;