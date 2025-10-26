
import React, { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

interface SkillsInputProps {
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (index: number) => void;
}

const SkillsInput: React.FC<SkillsInputProps> = ({ skills, onAdd, onRemove }) => {
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
          placeholder="Add a skill..." 
        />
        <button 
          onClick={handleAdd} 
          className="px-4 py-2 rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100"
          aria-label="Add skill"
        >
          <FiPlus />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <div key={i} className="inline-flex items-center gap-2 px-2 py-1 rounded bg-indigo-100 text-indigo-800 text-sm">
            <span>{skill}</span>
            <button onClick={() => onRemove(i)} className="text-indigo-600 hover:text-indigo-800" aria-label={`Remove ${skill}`}>
              <FiX size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
