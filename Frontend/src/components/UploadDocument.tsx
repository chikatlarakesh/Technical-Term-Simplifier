import { FC, useState } from 'react';

type Definition = { word: string; definition: string };

const UploadDocument: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [extractedWords, setExtractedWords] = useState<string[]>([]);
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [loading, setLoading] = useState(false);

  const hasContent = textContent.trim().length > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setTextContent(result);
        }
      };
      reader.readAsText(selectedFile);
    } else {
      setFile(null);
      setTextContent('');
    }
  };

  const handleSubmit = async () => {
    if (!hasContent) return;
    setLoading(true);
    setExtractedWords([]);
    setDefinitions([]);

    try {
      // 1️⃣ Extract
      const extractRes = await fetch('http://localhost:5000/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textContent }),
      });
      const extractData = await extractRes.json();
      if (!extractRes.ok) throw new Error(extractData.error || 'Extract failed');

      const words: string[] = extractData.words;
      setExtractedWords(words);

      // 2️⃣ Define
      const defineRes = await fetch('http://localhost:5000/api/define', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ words }),
      });
      const defineData = await defineRes.json();
      if (!defineRes.ok) throw new Error(defineData.error || 'Define failed');

      setDefinitions(defineData.definitions);
    } catch (err) {
      console.error('❌ Error in pipeline:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Upload Document</h1>
        <p className="text-gray-600 mt-1">Upload a technical document to extract and simplify terms</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">File Input</h2>
        </div>
        <div className="p-6 space-y-4">
          <input
            type="file"
            accept=".txt,.docx,.pdf"
            onChange={handleFileChange}
            className="w-full p-4 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
          {file && (
            <p className="text-gray-600">Selected file: {file.name}</p>
          )}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!hasContent || loading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? 'Processing…' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {/* Extracted Words */}
      {extractedWords.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Extracted Terms</h2>
          <ul className="list-disc list-inside space-y-1">
            {extractedWords.map((w, i) => (
              <li key={i} className="text-gray-700">{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Definitions */}
      {definitions.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Definitions</h2>
          <ul className="space-y-2">
            {definitions.map(({ word, definition }, i) => (
              <li key={i}>
                <strong>{word}:</strong> <span>{definition}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;