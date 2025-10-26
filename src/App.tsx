import React, { useState, useRef, useCallback } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CVData, Theme } from "./types";
import { INITIAL_CV_DATA, THEME_CLASSES } from "./constants";
import CVForm from "./components/CVForm";
import CVPreview from "./components/CVPreview";
import AIModal from "./components/AIModal";
import { generateCVData } from "./services/geminiService";

export default function App() {
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [photo, setPhoto] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("multi");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleGenerateWithAI = async (prompt: string) => {
    setIsLoadingAi(true);
    setAiError(null);
    try {
        const aiGeneratedData = await generateCVData(prompt);
        // Sanitize data to ensure all arrays are initialized
        const sanitizedData: CVData = {
            ...INITIAL_CV_DATA,
            ...aiGeneratedData,
            experiences: aiGeneratedData.experiences || [],
            education: aiGeneratedData.education || [],
            skills: aiGeneratedData.skills || [],
            certifications: aiGeneratedData.certifications || [],
            languages: aiGeneratedData.languages || [],
            projects: aiGeneratedData.projects || [],
            contact: aiGeneratedData.contact || {},
        };
        setCvData(sanitizedData);
        setIsAiModalOpen(false);
    } catch (error) {
        console.error("Error generating CV data with AI:", error);
        setAiError("Failed to generate CV data. Please try again.");
    } finally {
        setIsLoadingAi(false);
    }
  };


  const exportToPDF = useCallback(async () => {
    const element = previewRef.current;
    if (!element) return;

    // Temporarily increase scale for better quality
    const originalWidth = element.style.width;
    element.style.width = '794px';

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    // Restore original width
    element.style.width = originalWidth;

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "p",
      unit: "px",
      format: [canvas.width / 2, canvas.height / 2],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`${(cvData.fullName || "cv").replace(/\s+/g, "_")}.pdf`);
  }, [cvData.fullName]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">AI-Powered CV Builder</h1>
          <button 
            onClick={exportToPDF} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Download PDF
          </button>
        </div>
      </header>
      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <CVForm
            cvData={cvData}
            setCvData={setCvData}
            photo={photo}
            onPhotoChange={handlePhotoChange}
            theme={theme}
            setTheme={setTheme}
            onGenerateWithAI={() => setIsAiModalOpen(true)}
          />
          <div className="lg:sticky top-24 h-full">
            <CVPreview
              ref={previewRef}
              cvData={cvData}
              photo={photo}
              themeClass={THEME_CLASSES[theme]}
            />
          </div>
        </div>
      </main>
      <AIModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onGenerate={handleGenerateWithAI}
        isLoading={isLoadingAi}
        error={aiError}
      />
    </div>
  );
}
