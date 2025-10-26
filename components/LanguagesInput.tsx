
import React, { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

interface LanguagesInputProps {
  languages: string[];
  onAdd: (language: string) => void;
  onRemove: (index: number) => void;
}

const LanguagesInput: React.FC<LanguagesInputProps> = ({ languages, onAdd, onRemove }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <input 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          onKeyDown={handleKeyDown}
          className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
          placeholder="e.g., English (Native)"
        />
        <button 
          onClick={handleAdd} 
          className="px-4 py-2 rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100"
          aria-label="Add language"
        >
          <FiPlus />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {languages.map((lang, i) => (
          <div key={i} className="inline-flex items-center gap-2 px-2 py-1 rounded bg-gray-100 text-gray-800 text-sm">
            <span>{lang}</span>
            <button onClick={() => onRemove(i)} className="text-gray-600 hover:text-gray-800" aria-label={`Remove ${lang}`}>
              <FiX size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesInput;
