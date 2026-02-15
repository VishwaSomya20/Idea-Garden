
import React from 'react';
import { Idea } from '../types';
import FlowerComponent from './FlowerComponent';
import RabbitComponent from './RabbitComponent';
import { GrassAsset } from '../constants';

interface GardenProps {
  ideas: Idea[];
  onFlowerClick: (idea: Idea) => void;
}

const Garden: React.FC<GardenProps> = ({ ideas, onFlowerClick }) => {
  const grassPatches = React.useMemo(() => {
    const patches: { id: number; x: number; y: number; scale: number }[] = [];
    const count = 30;
    const minDistance = 8;

    for (let i = 0; i < count; i++) {
      let x, y, tooClose;
      let attempts = 0;
      do {
        x = 15 + Math.random() * 70;
        y = 15 + Math.random() * 70;
        tooClose = patches.some(p => Math.sqrt((p.x - x)**2 + (p.y - y)**2) < minDistance);
        attempts++;
      } while (tooClose && attempts < 80);

      patches.push({
        id: i,
        x,
        y,
        scale: 0.3 + Math.random() * 0.4
      });
    }
    return patches;
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      <div 
        className="relative w-full max-w-[750px] aspect-square bg-[#90be6d] shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-visible border-[2px] border-[#43aa8b] transition-all duration-1000"
        style={{
          borderRadius: '55% 45% 72% 28% / 37% 65% 35% 63%',
          transform: 'rotate(-2deg)',
          background: 'linear-gradient(135deg, #90be6d 0%, #a2d149 100%)'
        }}
      >
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none rounded-[inherit]"
          style={{
            backgroundImage: 'radial-gradient(#277da1 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Grass Layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {grassPatches.map((p) => (
            <div 
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: `scale(${p.scale})`, 
                opacity: 0.5
              }}
            >
              <GrassAsset />
            </div>
          ))}
        </div>

        {/* Rabbit Layer - Reduced to 3 Rabbits */}
        {[...Array(3)].map((_, i) => (
          <RabbitComponent key={i} />
        ))}

        {/* Flower Layer */}
        <div className="absolute inset-0 z-10">
          {ideas.map((idea) => (
            <FlowerComponent key={idea.id} idea={idea} onClick={onFlowerClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Garden;
