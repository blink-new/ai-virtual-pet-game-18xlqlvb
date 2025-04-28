
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { usePetStore } from '../store/pet-store';

export const WelcomeScreen = () => {
  const { startGame } = usePetStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-indigo-900 mb-2"
        >
          Virtual Pet Companion
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-indigo-700 mb-6"
        >
          Adopt, care for, and chat with your own AI pet!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-6"
        >
          <img
            src="https://opengameart.org/sites/default/files/styles/medium/public/pet_group.png"
            alt="Virtual Pets"
            className="w-full h-auto rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://opengameart.org/sites/default/files/styles/medium/public/pet_idle.png";
            }}
          />
        </motion.div>
        
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-left mb-6 space-y-2 text-gray-700"
        >
          <li className="flex items-center">
            <span className="mr-2">🐾</span> Choose your perfect pet companion
          </li>
          <li className="flex items-center">
            <span className="mr-2">💬</span> Chat with your pet using AI
          </li>
          <li className="flex items-center">
            <span className="mr-2">🍽️</span> Feed, play with, and care for your pet
          </li>
          <li className="flex items-center">
            <span className="mr-2">🛍️</span> Buy items from the shop to make your pet happy
          </li>
          <li className="flex items-center">
            <span className="mr-2">📈</span> Watch your pet grow and level up
          </li>
        </motion.ul>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            onClick={startGame}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-lg"
          >
            Start Your Adventure
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};