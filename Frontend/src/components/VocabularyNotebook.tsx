import { FC, useState } from 'react';
import { Plus, Download, BookOpenCheck, Filter, ArrowUpDown, Trash, Edit, Check, X } from 'lucide-react';

const initialTerms = [
  {
    id: 1,
    term: 'Containerization',
    meaning: 'A lightweight form of virtualization that packages an application and its dependencies together.',
    source: 'Docker Documentation',
    notes: 'Understand the difference between VMs and containers',
    mastered: true,
  },
  {
    id: 2,
    term: 'Neural Network',
    meaning: 'A computing system inspired by biological neural networks that can learn from examples.',
    source: 'AI Fundamentals Blog',
    notes: '',
    mastered: false,
  },
  {
    id: 3,
    term: 'SQL Injection',
    meaning: 'A code injection technique used to attack data-driven applications by inserting malicious SQL statements.',
    source: 'Cybersecurity 101',
    notes: 'Research prepared statements as a prevention method',
    mastered: true,
  },
  {
    id: 4,
    term: 'Data Lake',
    meaning: 'A storage repository that holds a vast amount of raw data in its native format until needed.',
    source: 'Big Data Concepts',
    notes: '',
    mastered: false,
  },
  {
    id: 5,
    term: 'Serverless Architecture',
    meaning: 'A development model where applications are hosted by a third-party service, eliminating the need for server management.',
    source: 'AWS Documentation',
    notes: 'Compare AWS Lambda vs Azure Functions',
    mastered: false,
  },
];

const VocabularyNotebook: FC = () => {
  const [terms, setTerms] = useState(initialTerms);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTermForm, setNewTermForm] = useState(false);
  const [newTerm, setNewTerm] = useState({
    term: '',
    meaning: '',
    source: '',
    notes: '',
  });

  const filteredTerms = terms.filter(term => {
    if (filter === 'all') return true;
    if (filter === 'mastered') return term.mastered;
    if (filter === 'learning') return !term.mastered;
    return true;
  });

  const handleAddTerm = () => {
    if (!newTerm.term || !newTerm.meaning) return;
    
    setTerms([
      ...terms,
      {
        id: terms.length + 1,
        ...newTerm,
        mastered: false,
      }
    ]);
    
    setNewTerm({
      term: '',
      meaning: '',
      source: '',
      notes: '',
    });
    
    setNewTermForm(false);
  };

  const handleToggleMastered = (id: number) => {
    setTerms(terms.map(term => 
      term.id === id ? { ...term, mastered: !term.mastered } : term
    ));
  };

  const handleDeleteTerm = (id: number) => {
    setTerms(terms.filter(term => term.id !== id));
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Vocabulary Notebook</h1>
          <p className="text-gray-600 mt-1">Manage and organize your technical terms</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button 
            onClick={() => setNewTermForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            <Plus size={16} className="mr-2" />
            Add Term
          </button>
          
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Add New Term Form */}
      {newTermForm && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Add New Term</h2>
            <button 
              onClick={() => setNewTermForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-1">
                Term*
              </label>
              <input
                type="text"
                id="term"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={newTerm.term}
                onChange={(e) => setNewTerm({...newTerm, term: e.target.value})}
                placeholder="Enter the technical term"
              />
            </div>
            
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <input
                type="text"
                id="source"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={newTerm.source}
                onChange={(e) => setNewTerm({...newTerm, source: e.target.value})}
                placeholder="Where did you encounter this term?"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="meaning" className="block text-sm font-medium text-gray-700 mb-1">
              Meaning*
            </label>
            <textarea
              id="meaning"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newTerm.meaning}
              onChange={(e) => setNewTerm({...newTerm, meaning: e.target.value})}
              placeholder="Provide a simplified definition"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newTerm.notes}
              onChange={(e) => setNewTerm({...newTerm, notes: e.target.value})}
              placeholder="Add any additional notes or context"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setNewTermForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTerm}
              disabled={!newTerm.term || !newTerm.meaning}
              className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                !newTerm.term || !newTerm.meaning
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              Add Term
            </button>
          </div>
        </div>
      )}
      
      {/* Filters & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between">
          <div className="flex space-x-2 mb-3 sm:mb-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                filter === 'all'
                  ? 'bg-purple-100 text-purple-700 border border-purple-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Terms ({terms.length})
            </button>
            <button
              onClick={() => setFilter('mastered')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                filter === 'mastered'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Mastered ({terms.filter(t => t.mastered).length})
            </button>
            <button
              onClick={() => setFilter('learning')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                filter === 'learning'
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Learning ({terms.filter(t => !t.mastered).length})
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
              <Filter size={14} className="mr-1" />
              Filter
            </button>
            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
              <ArrowUpDown size={14} className="mr-1" />
              Sort
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Term
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meaning
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTerms.map((term) => (
                <tr key={term.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{term.term}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs line-clamp-2">{term.meaning}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{term.source}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{term.notes || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      term.mastered 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {term.mastered ? 'Mastered' : 'Learning'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleToggleMastered(term.id)}
                        className={`p-1 rounded-full ${
                          term.mastered 
                            ? 'text-green-600 hover:bg-green-100' 
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title={term.mastered ? 'Mark as learning' : 'Mark as mastered'}
                      >
                        <BookOpenCheck size={18} />
                      </button>
                      <button 
                        className="p-1 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-100"
                        title="Edit term"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteTerm(term.id)}
                        className="p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100"
                        title="Delete term"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTerms.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-2">No terms found with the current filter.</p>
            <button 
              onClick={() => setFilter('all')}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              View all terms
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyNotebook;