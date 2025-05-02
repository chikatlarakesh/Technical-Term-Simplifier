import { FC, useState } from 'react';
import { Upload, FileText, AlertCircle, ChevronDown, Paperclip } from 'lucide-react';

const UploadDocument: FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };
  
  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Upload Document</h1>
        <p className="text-gray-600 mt-1">Upload a PDF or text file to extract and simplify technical terms</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Document Upload</h2>
        </div>
        
        <div className="p-6">
          {/* File Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center ${
              dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="p-3 bg-purple-100 rounded-full mb-4">
              <Upload size={24} className="text-purple-600" />
            </div>
            
            <p className="text-lg font-medium text-gray-700 mb-1">
              {fileName ? 'File ready for processing' : 'Drag and drop your file here'}
            </p>
            
            {fileName ? (
              <div className="mt-2 flex items-center p-2 bg-gray-50 rounded-lg">
                <FileText size={18} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">{fileName}</span>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
            )}
            
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileChange}
            />
            
            {!fileName && (
              <label
                htmlFor="file-upload"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 cursor-pointer"
              >
                <Paperclip size={16} className="mr-2" />
                Choose File
              </label>
            )}
          </div>
          
          {fileName && (
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Processing Options</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="extract-all"
                      type="radio"
                      name="processing"
                      defaultChecked
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <label htmlFor="extract-all" className="ml-2 block text-sm text-gray-700">
                      Extract all technical terms
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="extract-highlight"
                      type="radio"
                      name="processing"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <label htmlFor="extract-highlight" className="ml-2 block text-sm text-gray-700">
                      Only extract highlighted terms
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="generate-summary"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="generate-summary" className="ml-2 block text-sm text-gray-700">
                      Generate a simplified summary of the document
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Categories</h3>
                <div className="relative">
                  <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                    <option>Auto-detect category</option>
                    <option>Programming</option>
                    <option>Machine Learning</option>
                    <option>Cloud Computing</option>
                    <option>Cybersecurity</option>
                    <option>Data Science</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start">
                <AlertCircle size={18} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> For large PDFs, processing may take a few minutes. 
                    The system will extract terms and define them based on context.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
                  <Upload size={16} className="mr-2" />
                  Process Document
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Uploads</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Introduction to Neural Networks.pdf</h3>
                  <p className="text-xs text-gray-500">Uploaded 2 days ago • 42 terms extracted</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Processed
              </span>
            </div>
          </div>
          
          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Cloud Computing Fundamentals.pdf</h3>
                  <p className="text-xs text-gray-500">Uploaded 1 week ago • 35 terms extracted</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Processed
              </span>
            </div>
          </div>
          
          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Blockchain Whitepaper.pdf</h3>
                  <p className="text-xs text-gray-500">Uploaded 2 weeks ago • 28 terms extracted</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Processed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;