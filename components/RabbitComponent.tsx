
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RabbitComponent: React.FC = () => {
  const [position, setPosition] = useState({ 
    x: 25 + Math.random() * 50, 
    y: 25 + Math.random() * 50 
  });
  const [direction, setDirection] = useState(Math.random() > 0.5 ? 1 : -1);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        const newX = 25 + Math.random() * 50;
        setDirection(newX > position.x ? 1 : -1);
        setPosition({
          x: newX,
          y: 25 + Math.random() * 50,
        });
      }
    }, 5000);
    return () => clearInterval(moveInterval);
  }, [position.x]);

  return (
    <motion.div
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
      }}
      className="absolute z-20 pointer-events-none"
      style={{ width: '36px', height: '36px' }}
    >
      <motion.div
        animate={{
          y: [0, -12, 0], 
          scaleY: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: 2.5 + Math.random() * 4,
        }}
        style={{ 
          scaleX: direction, 
          width: '100%', 
          height: '100%' 
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          {/* Plain White Silhouette Rabbit Side Profile */}
          <g fill="#FFFFFF">
            {/* Tail */}
            <circle cx="15" cy="75" r="7" />
            {/* Main Body */}
            <ellipse cx="45" cy="70" rx="28" ry="20" />
            {/* Neck/Head Connector */}
            <ellipse cx="65" cy="55" rx="12" ry="14" transform="rotate(-20 65 55)" />
            {/* Head */}
            <ellipse cx="75" cy="45" rx="14" ry="11" />
            {/* Ears */}
            <ellipse cx="78" cy="22" rx="5" ry="18" transform="rotate(10 78 22)" />
            {/* Second Ear (slightly offset) */}
            <ellipse cx="70" cy="24" rx="5" ry="18" transform="rotate(-5 70 24)" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default RabbitComponent;
