
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Idea } from '../types';
import { FlowerAssets } from '../constants';

interface FlowerComponentProps {
  idea: Idea;
  onClick: (idea: Idea) => void;
}

const FlowerComponent: React.FC<FlowerComponentProps> = ({ idea, onClick }) => {
  const isCustom = idea.flowerType === 'custom';

  const SparkleBurst = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.8, 0], 
            opacity: [0, 1, 0],
            x: Math.cos(i * 30 * Math.PI / 180) * 50,
            y: Math.sin(i * 30 * Math.PI / 180) * 50,
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.8 
          }}
          className="absolute w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_12px_#60a5fa]"
        />
      ))}
    </div>
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${idea.x}%`,
        top: `${idea.y}%`,
        width: '38px',
        height: '38px',
        transformOrigin: 'bottom center',
        cursor: 'pointer',
        zIndex: idea.isNew ? 1000 : 10 + Math.floor(idea.y), 
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(idea);
      }}
    >
      <AnimatePresence>
        {idea.isNew && (
          <>
            {/* The Blue Marble (Magical Seed) Pop-up Animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{ 
                scale: [0, 2, 1, 0], 
                opacity: [0, 1, 1, 0],
                y: [ 0, -30, 0, 0 ]
              }}
              transition={{ 
                duration: 1.5, 
                times: [0, 0.4, 0.7, 1],
                ease: "backOut" 
              }}
              className="absolute inset-0 m-auto w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full shadow-[0_0_20px_rgba(59,130,246,1)] z-50 pointer-events-none border-2 border-white"
            />
            <SparkleBurst />
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={idea.isNew ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        animate={{ 
          scale: idea.isNew ? [0, 0, 2.5, 1 * idea.scale] : 1 * idea.scale,
          opacity: 1
        }}
        transition={{ 
          duration: 2,
          times: [0, 0.5, 0.8, 1],
          type: 'spring',
          damping: 10,
          stiffness: 90
        }}
        style={{ width: '100%', height: '100%', transformOrigin: 'bottom center' }}
      >
        <motion.div
          animate={{
            rotate: [ -2.5, 2.5, -2.5 ],
            y: [0, -1.5, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ width: '100%', height: '100%', transformOrigin: 'bottom center' }}
        >
          {isCustom && idea.flowerImage ? (
            <div className="relative w-full h-full flex flex-col items-center">
               <div className="absolute bottom-0 w-1 bg-[#43aa8b] h-4" />
               <img src={idea.flowerImage} alt="Custom" className="w-full h-2/3 object-contain relative z-10" />
            </div>
          ) : (
            FlowerAssets[idea.flowerType] || FlowerAssets['sunflower']
          )}
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none opacity-40">
        <div className="w-1 h-2 bg-[#2a6d51] rounded-full rotate-[-15deg]" />
        <div className="w-1 h-2 bg-[#43aa8b] rounded-full rotate-[15deg]" />
      </div>
    </motion.div>
  );
};

export default FlowerComponent;
