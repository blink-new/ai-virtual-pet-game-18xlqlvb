
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { usePetStore } from '../store/pet-store';
import { PetType, PetColor } from '../store/pet-store';
import { PetSprite } from './pet-sprite';

export const AdoptionCenter = () => {
  const { createPet } = usePetStore();
  const [name, setName] = useState('');
  const [type, setType] = useState<PetType>('cat');
  const [color, setColor] = useState<PetColor>('blue');
  const [nameError, setNameError] = useState('');

  const petTypes: PetType[] = ['cat', 'dog', 'dragon', 'bird', 'rabbit'];
  const petColors: PetColor[] = ['blue', 'red', 'green', 'purple', 'orange', 'pink', 'teal', 'yellow'];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.trim() === '') {
      setNameError('Please enter a name for your pet');
    } else {
      setNameError('');
    }
  };

  const handleAdopt = () => {
    if (name.trim() === '') {
      setNameError('Please enter a name for your pet');
      return;
    }
    
    createPet(name, type, color);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6"
      >
        <h1 className="text-2xl font-bold text-center text-indigo-900 mb-6">
          Adoption Center
        </h1>
        
        <div className="mb-6">
          <Label htmlFor="pet-name" className="text-indigo-900">
            Name your pet
          </Label>
          <Input
            id="pet-name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter a name..."
            className="mt-1"
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>
        
        <div className="mb-6">
          <Label className="text-indigo-900 block mb-2">
            Choose a pet type
          </Label>
          <div className="grid grid-cols-5 gap-2">
            {petTypes.map((petType) => (
              <motion.div
                key={petType}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer p-2 rounded-lg ${
                  type === petType ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'bg-gray-50'
                }`}
                onClick={() => setType(petType)}
              >
                <div className="w-full aspect-square relative">
                  <PetSprite type={petType} color={color} mood="happy" />
                </div>
                <p className="text-center text-xs mt-1 capitalize">{petType}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <Label className="text-indigo-900 block mb-2">
            Choose a color
          </Label>
          <div className="grid grid-cols-4 gap-3">
            {petColors.map((petColor) => (
              <motion.div
                key={petColor}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer rounded-lg p-1 ${
                  color === petColor ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setColor(petColor)}
              >
                <div 
                  className="w-full aspect-square rounded-full"
                  style={{ 
                    backgroundColor: petColor,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <p className="text-center text-xs mt-1 capitalize">{petColor}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32">
            <PetSprite type={type} color={color} mood="happy" />
          </div>
        </div>
        
        <Button
          onClick={handleAdopt}
          disabled={name.trim() === ''}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          <Heart className="mr-2 h-4 w-4" /> Adopt Pet
        </Button>
      </motion.div>
    </div>
  );
};