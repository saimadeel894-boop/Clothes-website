import React, { useState, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, Download, Share2, Loader, AlertCircle, Key } from 'lucide-react';
import { generateFashionDesign } from '../services/geminiService';

export const AiStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if ((window as any).aistudio && (window as any).aistudio.hasSelectedApiKey) {
        const has = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(has);
      } else {
        // Assume key is present/handled externally if wrapper is missing to avoid blocking in dev
        setHasApiKey(true);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
      if ((window as any).aistudio && (window as any).aistudio.openSelectKey) {
          await (window as any).aistudio.openSelectKey();
          setHasApiKey(true);
      }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateFashionDesign(prompt, size);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError("Could not generate image. Please try a different prompt.");
      }
    } catch (e: any) {
        console.error(e);
        if (e.message && (e.message.includes("403") || e.message.includes("Requested entity was not found"))) {
             if (e.message.includes("Requested entity was not found")) {
                 setHasApiKey(false);
             }
             setError("Access denied or Key not found. Please ensure you have selected a valid API key.");
        } else {
            setError("Something went wrong during generation. Please try again.");
        }
    } finally {
      setLoading(false);
    }
  };

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
           <div className="max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-900">
                    <Key size={40} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">API Key Required</h1>
                <p className="text-gray-600">
                    To use the AI Design Studio with high-quality models (Gemini 3 Pro), you need to select a paid API key.
                </p>
                <button 
                  onClick={handleSelectKey}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                    Select API Key
                </button>
                <p className="text-xs text-gray-400">
                    Billing must be enabled for the project. 
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-slate-900 ml-1">
                        Learn more about billing
                    </a>.
                </p>
            </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles size={200} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                <Sparkles className="text-purple-400" />
                AI Design Studio
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Use our advanced "Nano Banana Pro" engine to visualize high-fidelity fashion concepts. 
                Select 4K for ultra-realistic detail.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Controls */}
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                        Describe Your Vision
                    </label>
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="E.g., A futuristic cyberpunk street jacket with neon blue piping, matte black fabric, high collar..."
                        className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none resize-none bg-white mb-6 text-sm"
                    />

                    <label className="block text-sm font-bold text-slate-900 mb-3">
                        Resolution Quality
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-8">
                        {(['1K', '2K', '4K'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`py-2 px-3 rounded-lg text-sm font-bold border transition-all ${
                                    size === s 
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading || !prompt.trim()}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader className="animate-spin" /> : <Sparkles />}
                        {loading ? 'Designing...' : 'Generate Design'}
                    </button>
                    <p className="text-xs text-gray-400 text-center mt-3">
                        Powered by Gemini 3 Pro
                    </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <AlertCircle size={16} /> Pro Tip
                    </h4>
                    <p className="text-sm text-blue-800 leading-relaxed">
                        For 4K resolution images, please be patient as generation may take slightly longer. Ensure your prompt describes textures and lighting for best results.
                    </p>
                </div>
            </div>

            {/* Display Area */}
            <div className="lg:col-span-2">
                <div className="bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 aspect-square flex items-center justify-center overflow-hidden relative shadow-inner">
                    {loading ? (
                        <div className="text-center">
                            <Loader size={48} className="animate-spin text-slate-900 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 animate-pulse">Creating Masterpiece...</h3>
                            <p className="text-gray-500 mt-2">Rendering details in {size}</p>
                        </div>
                    ) : generatedImage ? (
                        <div className="relative group w-full h-full">
                             <img 
                                src={generatedImage} 
                                alt="Generated Design" 
                                className="w-full h-full object-contain bg-white" 
                            />
                            <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform text-slate-900">
                                    <Download size={20} />
                                </button>
                                <button className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform text-slate-900">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 max-w-sm px-6">
                            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <ImageIcon size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-600 mb-2">Canvas Empty</h3>
                            <p className="text-sm">Enter a prompt and select a resolution to generate your custom fashion design.</p>
                            {error && (
                                <div className="mt-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};