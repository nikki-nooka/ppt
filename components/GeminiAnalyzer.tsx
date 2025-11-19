import React, { useState, useRef } from 'react';
import { analyzeEnvironmentImage } from '../services/geminiService';
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react';

const GeminiAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    setError(null);
    try {
      const jsonString = await analyzeEnvironmentImage(image);
      const parsed = JSON.parse(jsonString);
      setResult(parsed);
    } catch (err) {
      setError("Failed to analyze image. Please try again or check API Key.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl mx-auto border border-gray-100">
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div 
            className="aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-gray-100 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4 text-gray-400">
                <Camera className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm font-medium">Click to upload environment photo</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!image || analyzing}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
              ${!image || analyzing ? 'bg-gray-200 text-gray-400' : 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-teal-500/30'}
            `}
          >
            {analyzing ? <Loader2 className="animate-spin" /> : <Upload className="w-5 h-5" />}
            {analyzing ? 'Analyzing Hazards...' : 'Detect Health Risks'}
          </button>
        </div>

        {/* Results Section */}
        <div className="flex flex-col justify-center min-h-[200px]">
          {!result && !error && !analyzing && (
             <div className="text-center text-gray-400">
               <p>AI Analysis results will appear here.</p>
               <p className="text-xs mt-2 opacity-70">Detects: Stagnant water, pollution, garbage.</p>
             </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-start gap-3">
              <AlertOctagon className="w-5 h-5 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Risk Level</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold 
                  ${result.riskLevel?.toLowerCase().includes('high') ? 'bg-red-100 text-red-700' : 
                    result.riskLevel?.toLowerCase().includes('medium') ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'}`}>
                  {result.riskLevel}
                </span>
              </div>
              
              <div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Hazards Detected</span>
                <ul className="mt-2 space-y-1">
                  {result.hazards?.map((h: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      {h}
                    </li>
                  ))}
                  {(!result.hazards || result.hazards.length === 0) && <p className="text-gray-500 italic">No immediate hazards detected.</p>}
                </ul>
              </div>

              <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
                <div className="flex gap-2 mb-1">
                   <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5" />
                   <span className="text-sm font-bold text-teal-800">Recommendation</span>
                </div>
                <p className="text-teal-700 text-sm leading-relaxed ml-6">{result.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeminiAnalyzer;
