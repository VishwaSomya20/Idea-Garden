
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerStyle } from '../types';
import { Flower, Loader2, Leaf, X, Wand2, Sprout } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface IdeaPanelProps {
  onBloom: (data: { title: string; description: string; flowerType: string; flowerImage?: string }) => void;
  onMinimize?: () => void;
  showClose?: boolean;
}

const IdeaPanel: React.FC<IdeaPanelProps> = ({ onBloom, onMinimize, showClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'planting' | 'bloomed'>('idle');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDescription = async () => {
    if (!title) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a professional product manager or startup mentor. The user has a project idea called: "${title}".
        Provide a concise, practical, and professional 2-sentence description. 
        Focus on the real-world utility, target audience, and primary benefit of this idea.
        DO NOT use any whimsical, fantasy, or storybook-style language. 
        Provide a straightforward, normal description as if you were writing for a business proposal or project brief.`,
      });
      const generatedText = response.text || "";
      setDescription(generatedText.trim().replace(/^"|"$/g, ''));
    } catch (error) {
      console.error("AI Generation failed:", error);
      setDescription("A clear and professional description of your idea.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setStatus('planting');
    
    setTimeout(() => {
      const types = [FlowerStyle.SUNFLOWER, FlowerStyle.TULIP, FlowerStyle.ROSE, FlowerStyle.DAISY];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      onBloom({
        title,
        description,
        flowerType: randomType,
      });
      setStatus('bloomed');
      setTitle('');
      setDescription('');
      setTimeout(() => setStatus('idle'), 2000);
    }, 800);
  };

  return (
    <div className="relative w-full max-w-[320px] bg-white shadow-2xl rounded-[32px] p-6 md:p-8 flex flex-col gap-5 md:gap-6 border-[1px] border-gray-100">
      
      {showClose && onMinimize && (
        <button 
          onClick={onMinimize}
          className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      )}

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-12 h-12 bg-[#90be6d] rounded-2xl flex items-center justify-center shadow-md -rotate-3 border-2 border-white">
          <Flower className="text-white" size={26} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#4d908e] font-comic tracking-tight">Idea Garden</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mt-0.5">Where your thoughts grow</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="group">
          <label className="flex items-center gap-2 text-[9px] font-black text-[#277da1] mb-2 uppercase tracking-[0.12em]">
            <Leaf size={10} className="text-[#90be6d]" />
            Project Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-[#43aa8b] focus:outline-none transition-all text-sm font-medium placeholder:text-gray-300 shadow-sm"
            placeholder="e.g. NYC Cat Cafe"
            required
          />
        </div>

        <div className="group relative">
          <label className="flex items-center gap-2 text-[9px] font-black text-[#277da1] mb-2 uppercase tracking-[0.12em]">
            <Sprout size={10} className="text-[#43aa8b]" />
            Description
          </label>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-[#43aa8b] focus:outline-none min-h-[100px] text-sm font-medium resize-none transition-all placeholder:text-gray-300 pr-10 shadow-sm"
              placeholder="What makes it special?"
              required
            />
            <AnimatePresence>
              {title && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={generateDescription}
                  disabled={isGenerating}
                  className="absolute bottom-3 right-3 p-2 bg-[#f9c74f] text-[#582f0e] rounded-xl shadow-md transition-all disabled:opacity-50"
                  title="Enhance Idea"
                >
                  {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-5 rounded-[24px] text-white font-black text-xl md:text-2xl shadow-xl flex items-center justify-center gap-4 transition-all ${
            status === 'bloomed' ? 'bg-[#43aa8b]' : 'bg-[#277da1]'
          }`}
          type="submit"
          disabled={status !== 'idle' || isGenerating}
        >
          {status === 'idle' && (
            <span className="tracking-tight">Bloom</span>
          )}
          {status === 'planting' && <Loader2 className="animate-spin" size={24} />}
          {status === 'bloomed' && <span className="animate-bounce">✨ Bloomed!</span>}
        </motion.button>
      </form>

      <div className="pt-2 flex flex-col items-center opacity-10">
        <div className="w-10 h-0.5 bg-gray-200 mb-1" />
        <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest">Storybook Engine v2.0</p>
      </div>
    </div>
  );
};

export default IdeaPanel;
