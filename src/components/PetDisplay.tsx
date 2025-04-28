
import { useState } from 'react';
import { usePet } from '../store/petStore';
import './PetDisplay.css';

interface PetDisplayProps {
  showStats?: boolean;
}

export const PetDisplay = ({ showStats = true }: PetDisplayProps) => {
  const { pet, updatePet } = usePet();

  return (
    <div className="pet-display-container">
      <div className="pet-image">
        <img src={pet.image} alt={pet.name} />
      </div>
      
      {showStats && (
        <div className="pet-stats">
          <div className="stat">
            <span>Happiness:</span>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: `${pet.happiness}%`, backgroundColor: pet.happiness < 30 ? '#ff6b6b' : '#4dabf7' }}></div>
            </div>
          </div>
          <div className="stat">
            <span>Hunger:</span>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: `${pet.hunger}%`, backgroundColor: pet.hunger < 30 ? '#ff6b6b' : '#69db7c' }}></div>
            </div>
          </div>
          <div className="stat">
            <span>Cleanliness:</span>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: `${pet.cleanliness}%`, backgroundColor: pet.cleanliness < 30 ? '#ff6b6b' : '#339af0' }}></div>
            </div>
          </div>
          <div className="stat">
            <span>Energy:</span>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: `${pet.energy}%`, backgroundColor: pet.energy < 30 ? '#ff6b6b' : '#fcc419' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};