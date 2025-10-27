import React, { forwardRef } from 'react';
import { CVData } from '../types';
import { FiMail, FiPhone, FiGlobe, FiLinkedin } from 'react-icons/fi';

interface CVPreviewProps {
  cvData: CVData;
  photo: string | null;
  themeClass: string;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ cvData, photo, themeClass }, ref) => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Live Preview</h2>
      <div 
        ref={ref} 
        className={`w-full aspect-[1/1.414] p-8 text-sm transition-colors duration-300 ${themeClass}`}
        style={{ minHeight: '1123px', width: '794px' }}
      >
        <header className="flex items-center gap-8 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg shrink-0">
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">Photo</div>
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold">{cvData.fullName || 'Your Name'}</h1>
            <h2 className="text-xl font-medium text-indigo-300 mt-1">{cvData.title || 'Your Professional Title'}</h2>
          </div>
        </header>

        <main className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <PreviewSection title="Professional Summary">
              <p className="opacity-90">{cvData.summary || 'A brief summary about your professional background and career aspirations.'}</p>
            </PreviewSection>
            
            <PreviewSection title="Experience">
              {cvData.experiences.length > 0 ? cvData.experiences.map((exp, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-base">{exp.role || 'Role'} at {exp.company || 'Company'}</h4>
                  <p className="text-xs opacity-70 mb-1">{exp.duration || 'Duration'}</p>
                  <p className="opacity-90 whitespace-pre-wrap">{exp.details || 'Details about your role and achievements.'}</p>
                </div>
              )) : <p className="opacity-50">No experience added.</p>}
            </PreviewSection>

            <PreviewSection title="Projects">
              {cvData.projects.length > 0 ? cvData.projects.map((proj, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-base">{proj.title || 'Project Title'}</h4>
                  {proj.link && <a href={proj.link} className="text-xs text-indigo-300 hover:underline">{proj.link}</a>}
                  <p className="opacity-90 mt-1">{proj.details || 'Project description.'}</p>
                </div>
              )) : <p className="opacity-50">No projects added.</p>}
            </PreviewSection>
          </div>

          <aside className="space-y-6">
            <PreviewSection title="Contact">
              <div className="space-y-2">
                {cvData.contact.email && <ContactItem icon={<FiMail />} text={cvData.contact.email} />}
                {cvData.contact.phone && <ContactItem icon={<FiPhone />} text={cvData.contact.phone} />}
                {cvData.contact.website && <ContactItem icon={<FiGlobe />} text={cvData.contact.website} />}
                {cvData.contact.linkedin && <ContactItem icon={<FiLinkedin />} text={cvData.contact.linkedin} />}
              </div>
            </PreviewSection>
            
            <PreviewSection title="Education">
              {cvData.education.length > 0 ? cvData.education.map((edu, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <h4 className="font-semibold">{edu.degree || 'Degree'}</h4>
                  <p className="opacity-80 text-xs">{edu.institute || 'Institute'} - {edu.year || 'Year'}</p>
                </div>
              )) : <p className="opacity-50">No education added.</p>}
            </PreviewSection>
            
            <PreviewSection title="Skills">
              <div className="flex flex-wrap gap-2">
                {cvData.skills.length > 0 ? cvData.skills.map((skill, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-md border border-white/20 bg-white/10">{skill}</span>
                )) : <p className="opacity-50 text-xs">No skills added.</p>}
              </div>
            </PreviewSection>
            
            <PreviewSection title="Languages">
                {cvData.languages.length > 0 ? cvData.languages.map((lang, i) => (
                    <p key={i} className="opacity-90">{lang}</p>
                )) : <p className="opacity-50">No languages added.</p>}
            </PreviewSection>
            
            <PreviewSection title="Certifications">
                {cvData.certifications.length > 0 ? cvData.certifications.map((cert, i) => (
                    <div key={i} className="mb-2 last:mb-0">
                        <h4 className="font-semibold">{cert.name || 'Certification'}</h4>
                        <p className="text-xs opacity-70">{cert.issuer || 'Issuer'} {cert.year ? `(${cert.year})` : ''}</p>
                    </div>
                )) : <p className="opacity-50">No certifications added.</p>}
            </PreviewSection>

          </aside>
        </main>
      </div>
    </div>
  );
});

const PreviewSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-bold border-b-2 border-indigo-400 pb-1 mb-3">{title}</h3>
    {children}
  </div>
);

const ContactItem: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <span className="text-indigo-300">{icon}</span>
    <span className="opacity-90">{text}</span>
  </div>
);


export default CVPreview;