import React from 'react';
import { CVData, Experience, Education, Project, Certification, Theme } from '../types';
import { FiPlus, FiTrash2, FiUpload, FiZap } from 'react-icons/fi';
import SkillsInput from './SkillsInput';
import LanguagesInput from './LanguagesInput';

interface CVFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
  photo: string | null;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onGenerateWithAI: () => void;
}

const CVForm: React.FC<CVFormProps> = ({ cvData, setCvData, photo, onPhotoChange, theme, setTheme, onGenerateWithAI }) => {
  
  const handleChange = <K extends keyof CVData>(
    key: K,
    value: CVData[K]
  ) => {
    setCvData((prev) => ({ ...prev, [key]: value }));
  };

  const handleContactChange = <K extends keyof CVData['contact']>(
    key: K,
    value: CVData['contact'][K]
  ) => {
    setCvData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: value },
    }));
  };

  const handleItemChange = <T,>(
    section: keyof CVData,
    index: number,
    field: keyof T,
    value: string
  ) => {
    setCvData((prev) => {
      const newSection = [...(prev[section] as T[])];
      newSection[index] = { ...newSection[index], [field]: value };
      return { ...prev, [section]: newSection };
    });
  };

  const addItem = (section: 'experiences' | 'education' | 'projects' | 'certifications') => {
    setCvData((prev) => ({
      ...prev,
      [section]: [...prev[section], {}],
    }));
  };
  
  const removeItem = (section: keyof CVData, index: number) => {
    setCvData((prev) => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">CV Details</h2>
        <button
          onClick={onGenerateWithAI}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
        >
          <FiZap size={16} /> Fill with AI
        </button>
      </div>

      <Section title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" value={cvData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} />
            <Input label="Title / Profession" value={cvData.title} onChange={(e) => handleChange('title', e.target.value)} />
            <Input label="Email" value={cvData.contact.email || ''} onChange={(e) => handleContactChange('email', e.target.value)} />
            <Input label="Phone" value={cvData.contact.phone || ''} onChange={(e) => handleContactChange('phone', e.target.value)} />
            <Input label="Website" placeholder="https://..." value={cvData.contact.website || ''} onChange={(e) => handleContactChange('website', e.target.value)} />
            <Input label="LinkedIn" placeholder="https://linkedin.com/in/..." value={cvData.contact.linkedin || ''} onChange={(e) => handleContactChange('linkedin', e.target.value)} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">Profile Photo</label>
          <div className="mt-1 flex items-center gap-4">
              {photo && <img src={photo} alt="Profile" className="w-16 h-16 rounded-full object-cover" />}
              <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <FiUpload size={16} /> Upload Photo
              </label>
              <input id="photo-upload" type="file" accept="image/*" className="sr-only" onChange={onPhotoChange} />
          </div>
        </div>
      </Section>

      <Section title="Professional Summary">
        <textarea
          value={cvData.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          rows={4}
          className="w-full p-2 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="A brief summary of your career, skills, and goals."
        />
      </Section>
      
      <ExpandableSection title="Experience" onAdd={() => addItem('experiences')}>
        {cvData.experiences.map((exp, i) => (
          <div key={i} className="p-4 rounded-md border border-gray-200 bg-gray-50/50 relative">
            <button onClick={() => removeItem('experiences', i)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><FiTrash2 /></button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input placeholder="Role" value={exp.role || ''} onChange={(e) => handleItemChange<Experience>('experiences', i, 'role', e.target.value)} />
              <Input placeholder="Company" value={exp.company || ''} onChange={(e) => handleItemChange<Experience>('experiences', i, 'company', e.target.value)} />
              <Input placeholder="Duration (e.g., 2020 - Present)" value={exp.duration || ''} onChange={(e) => handleItemChange<Experience>('experiences', i, 'duration', e.target.value)} />
            </div>
            <textarea placeholder="Details & Achievements" value={exp.details || ''} onChange={(e) => handleItemChange<Experience>('experiences', i, 'details', e.target.value)} className="w-full p-2 mt-3 rounded-md border-gray-300" rows={3} />
          </div>
        ))}
      </ExpandableSection>
      
      <ExpandableSection title="Education" onAdd={() => addItem('education')}>
        {cvData.education.map((edu, i) => (
          <div key={i} className="p-4 rounded-md border border-gray-200 bg-gray-50/50 relative">
            <button onClick={() => removeItem('education', i)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><FiTrash2 /></button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input placeholder="Degree / Certification" value={edu.degree || ''} onChange={(e) => handleItemChange<Education>('education', i, 'degree', e.target.value)} />
              <Input placeholder="Institute" value={edu.institute || ''} onChange={(e) => handleItemChange<Education>('education', i, 'institute', e.target.value)} />
              <Input placeholder="Year / Duration" value={edu.year || ''} onChange={(e) => handleItemChange<Education>('education', i, 'year', e.target.value)} />
            </div>
          </div>
        ))}
      </ExpandableSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="Skills">
            <SkillsInput 
                skills={cvData.skills} 
                onAdd={(skill) => handleChange('skills', [...cvData.skills, skill])}
                onRemove={(index) => handleChange('skills', cvData.skills.filter((_, i) => i !== index))}
            />
        </Section>
        <Section title="Languages">
            <LanguagesInput
                languages={cvData.languages}
                onAdd={(lang) => handleChange('languages', [...cvData.languages, lang])}
                onRemove={(index) => handleChange('languages', cvData.languages.filter((_, i) => i !== index))}
            />
        </Section>
      </div>
      
      <ExpandableSection title="Projects" onAdd={() => addItem('projects')}>
        {cvData.projects.map((proj, i) => (
            <div key={i} className="p-4 rounded-md border border-gray-200 bg-gray-50/50 relative">
                <button onClick={() => removeItem('projects', i)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><FiTrash2 /></button>
                <div className="grid grid-cols-1 gap-3">
                    <Input placeholder="Project Title" value={proj.title || ''} onChange={(e) => handleItemChange<Project>('projects', i, 'title', e.target.value)} />
                    <Input placeholder="Link (optional)" value={proj.link || ''} onChange={(e) => handleItemChange<Project>('projects', i, 'link', e.target.value)} />
                    <textarea placeholder="Project Details" value={proj.details || ''} onChange={(e) => handleItemChange<Project>('projects', i, 'details', e.target.value)} className="w-full p-2 mt-1 rounded-md border-gray-300" rows={2} />
                </div>
            </div>
        ))}
      </ExpandableSection>

      <ExpandableSection title="Certifications" onAdd={() => addItem('certifications')}>
        {cvData.certifications.map((cert, i) => (
            <div key={i} className="p-4 rounded-md border border-gray-200 bg-gray-50/50 relative">
                <button onClick={() => removeItem('certifications', i)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><FiTrash2 /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input placeholder="Certification Name" value={cert.name || ''} onChange={(e) => handleItemChange<Certification>('certifications', i, 'name', e.target.value)} />
                    <Input placeholder="Issuer" value={cert.issuer || ''} onChange={(e) => handleItemChange<Certification>('certifications', i, 'issuer', e.target.value)} />
                    <Input placeholder="Year" value={cert.year || ''} onChange={(e) => handleItemChange<Certification>('certifications', i, 'year', e.target.value)} />
                </div>
            </div>
        ))}
      </ExpandableSection>

      <Section title="Hobbies">
        <Input placeholder="e.g. Hiking, Reading, Coding" value={cvData.hobbies} onChange={(e) => handleChange('hobbies', e.target.value)} />
      </Section>
      
      <Section title="Theme">
        <div className="flex flex-wrap gap-2">
            {(['light', 'dark', 'orange', 'multi'] as Theme[]).map((t) => (
                <button 
                    key={t} 
                    onClick={() => setTheme(t)}
                    className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                        theme === t ? 'ring-2 ring-offset-2 ring-indigo-500 bg-indigo-50 text-indigo-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                >
                    {t}
                </button>
            ))}
        </div>
      </Section>
    </div>
  );
};


const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
        {children}
    </div>
);

const ExpandableSection: React.FC<{ title: string; onAdd: () => void; children: React.ReactNode }> = ({ title, onAdd, children }) => (
  <div>
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <button onClick={onAdd} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50">
        <FiPlus size={16} /> Add
      </button>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, ...props }) => (
    <div>
        {label && <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>}
        <input {...props} className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
    </div>
);


export default CVForm;
