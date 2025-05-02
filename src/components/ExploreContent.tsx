import { FC, useState } from 'react';
import { Search, BookOpen, ArrowUpRight, Filter, TrendingUp } from 'lucide-react';

const categoryColors: Record<string, string> = {
  'AI': 'bg-blue-100 text-blue-800',
  'Cloud': 'bg-green-100 text-green-800',
  'Security': 'bg-red-100 text-red-800',
  'Data': 'bg-yellow-100 text-yellow-800',
  'Web': 'bg-purple-100 text-purple-800',
};

const mockData = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamental concepts of machine learning and how algorithms work.',
    terms: 42,
    category: 'AI',
    popularity: 'Trending',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Cloud Computing Fundamentals',
    description: 'Understand the basics of cloud infrastructure, services, and deployment models.',
    terms: 35,
    category: 'Cloud',
    popularity: 'Popular',
    image: 'https://images.pexels.com/photos/7988116/pexels-photo-7988116.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Cybersecurity Essentials',
    description: 'Learn about key security concepts, threats, and protection strategies.',
    terms: 48,
    category: 'Security',
    popularity: 'New',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Big Data Analytics',
    description: 'Explore techniques for analyzing large datasets and extracting insights.',
    terms: 32,
    category: 'Data',
    popularity: 'Popular',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    title: 'Modern Web Development',
    description: 'Learn about frontend frameworks, APIs, and modern web app architecture.',
    terms: 29,
    category: 'Web',
    popularity: 'Trending',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    title: 'Natural Language Processing',
    description: 'Understand how computers process and analyze human language data.',
    terms: 37,
    category: 'AI',
    popularity: 'New',
    image: 'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const ExploreContent: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredContent = mockData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Explore Content</h1>
        <p className="text-gray-600 mt-1">Discover curated content and expand your technical vocabulary</p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Search by topic or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <TrendingUp size={16} className="mr-2" />
              Sort by: Popular
            </button>
          </div>
        </div>
        
        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              selectedCategory === null
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Topics
          </button>
          
          {Object.keys(categoryColors).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : categoryColors[category].replace('text-', 'hover:') + ' hover:bg-opacity-80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-40 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${categoryColors[item.category]}`}>
                  {item.category}
                </span>
                
                {item.popularity === 'Trending' && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 flex items-center">
                    <TrendingUp size={12} className="mr-1" /> Trending
                  </span>
                )}
                
                {item.popularity === 'New' && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                    New
                  </span>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="flex items-center text-xs text-gray-500">
                  <BookOpen size={14} className="mr-1" />
                  {item.terms} terms
                </span>
                
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium inline-flex items-center">
                  Explore <ArrowUpRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredContent.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500 mb-2">No content found matching your search criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Clear filters and try again
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreContent;