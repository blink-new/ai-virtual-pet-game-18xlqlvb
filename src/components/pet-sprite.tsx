
import React from 'react';
import { motion } from 'framer-motion';
import { PetType, PetColor, PetMood } from '../store/pet-store';

interface PetSpriteProps {
  type: PetType;
  color: PetColor;
  mood?: PetMood;
}

export const PetSprite: React.FC<PetSpriteProps> = ({ type, color, mood = 'happy' }) => {
  // Map pet types to sprite URLs from OpenGameArt
  const petSprites = {
    dragon: 'https://opengameart.org/sites/default/files/styles/medium/public/dragon_0.gif',
    cat: 'https://opengameart.org/sites/default/files/styles/medium/public/cat_idle.gif',
    dog: 'https://opengameart.org/sites/default/files/styles/medium/public/dog_idle.gif',
    bird: 'https://opengameart.org/sites/default/files/styles/medium/public/bird_idle.gif',
    rabbit: 'https://opengameart.org/sites/default/files/styles/medium/public/bunny_idle.gif',
  };

  // Fallback sprite if the URL doesn't work
  const fallbackSprite = 'https://opengameart.org/sites/default/files/styles/medium/public/pet_idle.png';

  // Map colors to CSS filter values
  const colorFilters = {
    red: 'hue-rotate(0deg) saturate(1.5)',
    blue: 'hue-rotate(240deg) saturate(1.5)',
    green: 'hue-rotate(120deg) saturate(1.5)',
    purple: 'hue-rotate(280deg) saturate(1.5)',
    orange: 'hue-rotate(30deg) saturate(1.5)',
    pink: 'hue-rotate(320deg) saturate(1.5)',
    teal: 'hue-rotate(180deg) saturate(1.5)',
    yellow: 'hue-rotate(60deg) saturate(1.5)',
  };

  // Map moods to animations
  const moodAnimations = {
    happy: {
      y: [0, -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        },
      },
    },
    sad: {
      rotate: [-5, 5, -5],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        },
      },
    },
    hungry: {
      scale: [1, 1.1, 1],
      transition: {
        scale: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        },
      },
    },
    dirty: {
      opacity: [1, 0.7, 1],
      filter: ['blur(0px)', 'blur(1px)', 'blur(0px)'],
      transition: {
        opacity: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        },
        filter: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        },
      },
    },
    tired: {
      y: [0, 5, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="w-32 h-32 relative"
        animate={moodAnimations[mood]}
      >
        <img
          src={petSprites[type] || fallbackSprite}
          alt={`${type} pet`}
          className="w-full h-full object-contain"
          style={{
            filter: colorFilters[color],
          }}
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = fallbackSprite;
          }}
        />
        
        {/* Mood indicators */}
        {mood === 'hungry' && (
          <motion.div
            className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            🍽️
          </motion.div>
        )}
        
        {mood === 'sad' && (
          <motion.div
            className="absolute -top-4 -right-4 bg-blue-400 rounded-full p-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            😢
          </motion.div>
        )}
        
        {mood === 'dirty' && (
          <motion.div
            className="absolute -top-4 -right-4 bg-brown-400 rounded-full p-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            🛁
          </motion.div>
        )}
        
        {mood === 'tired' && (
          <motion.div
            className="absolute -top-4 -right-4 bg-purple-400 rounded-full p-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            😴
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};