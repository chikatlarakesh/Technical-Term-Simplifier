import { FC, useState } from 'react';
import { Check, Bookmark, BookOpen, RefreshCw } from 'lucide-react';

// Mock data
const termData = [
  {
    id: 1,
    term: 'Containerization',
    definition: 'A lightweight form of virtualization that packages an application and its dependencies together.',
    source: 'Docker Documentation',
    category: 'DevOps',
    mastery: 75,
  },
  {
    id: 2,
    term: 'Neural Network',
    definition: 'A computing system inspired by biological neural networks that can learn from examples.',
    source: 'AI Fundamentals Blog',
    category: 'AI',
    mastery: 40,
  },
  {
    id: 3,
    term: 'SQL Injection',
    definition: 'A code injection technique used to attack data-driven applications by inserting malicious SQL statements.',
    source: 'Cybersecurity 101',
    category: 'Security',
    mastery: 90,
  },
  {
    id: 4,
    term: 'Data Lake',
    definition: 'A storage repository that holds a vast amount of raw data in its native format until needed.',
    source: 'Big Data Concepts',
    category: 'Data Science',
    mastery: 30,
  },
];

const RecentTerms: FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  const getMasteryColor = (mastery: number): string => {
    if (mastery >= 80) return 'bg-green-500';
    if (mastery >= 40) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div>
      {/* View Toggle */}
      <div className="flex justify-end px-4 py-2 bg-gray-50">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 text-xs font-medium rounded-l-lg border ${
              viewMode === 'list'
                ? 'bg-purple-100 text-purple-700 border-purple-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            List View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('card')}
            className={`px-3 py-1.5 text-xs font-medium rounded-r-lg border ${
              viewMode === 'card'
                ? 'bg-purple-100 text-purple-700 border-purple-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Flashcard View
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="divide-y divide-gray-200">
          {termData.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{item.term}</h3>
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.definition}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <BookOpen size={14} className="mr-1" />
                    <span>{item.source}</span>
                  </div>
                </div>

                <div className="ml-4 flex flex-col items-end">
                  {/* Mastery Progress */}
                  <div className="w-16 bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className={`h-2 rounded-full ${getMasteryColor(item.mastery)}`} 
                      style={{ width: `${item.mastery}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{item.mastery}% Mastered</span>
                  
                  {/* Actions */}
                  <div className="mt-2 flex space-x-2">
                    <button className="p-1 rounded-full text-gray-400 hover:text-purple-600 hover:bg-purple-100">
                      <Bookmark size={16} />
                    </button>
                    <button className="p-1 rounded-full text-gray-400 hover:text-green-600 hover:bg-green-100">
                      <Check size={16} />
                    </button>
                    <button className="p-1 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-100">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {termData.map((item) => (
            <div 
              key={item.id}
              className={`relative h-40 rounded-xl border border-gray-200 cursor-pointer transform transition-transform duration-500 ${
                flippedCard === item.id ? 'shadow-md scale-105' : 'shadow-sm hover:shadow'
              }`}
              onClick={() => toggleCard(item.id)}
            >
              <div className="absolute inset-0 w-full h-full">
                {/* Front of card */}
                <div 
                  className={`absolute inset-0 w-full h-full bg-white rounded-xl p-4 backface-hidden transition-opacity duration-500 ${
                    flippedCard === item.id ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{item.term}</h3>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
                      {item.category}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <BookOpen size={14} className="mr-1" />
                    <span>{item.source}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getMasteryColor(item.mastery)}`} 
                        style={{ width: `${item.mastery}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
                      <span>{item.mastery}% Mastered</span>
                      <span className="text-purple-600">Tap to flip</span>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div 
                  className={`absolute inset-0 w-full h-full bg-white rounded-xl p-4 backface-hidden transition-opacity duration-500 ${
                    flippedCard === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <p className="text-sm text-gray-700">{item.definition}</p>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <button className="text-xs text-purple-600 hover:underline">
                      Mark as mastered
                    </button>
                    <span className="text-xs text-gray-500">Tap to flip back</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTerms;