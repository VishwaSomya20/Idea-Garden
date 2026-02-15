
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles } from 'lucide-react';
import { Idea } from '../types';

interface FlowerModalProps {
  idea: Idea | null;
  onClose: () => void;
}

const FlowerModal: React.FC<FlowerModalProps> = ({ idea, onClose }) => {
  return (
    <AnimatePresence>
      {idea && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/5 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white w-full max-w-sm p-6 rounded-[32px] shadow-2xl border-4 border-[#90be6d]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            >
              <X size={20} />
            </button>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} className="text-[#f9c74f]" />
                <h2 className="text-2xl font-bold text-[#4d908e] font-comic">{idea.title}</h2>
              </div>
              <div className="flex items-center gap-2 text-[#277da1] text-[10px] font-bold uppercase tracking-widest">
                <Calendar size={12} />
                <span>Bloomed on {idea.date}</span>
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl mb-2">
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {idea.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FlowerModal;
