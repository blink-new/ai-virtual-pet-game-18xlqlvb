
import { useEffect, useState } from 'react';
import { usePet } from '../store/petStore';
import './PetDisplay.css';
import { Toast } from './ui/Toast';

interface PetDisplayProps {
  showStats?: boolean;
}

export const PetDisplay = ({ showStats = true }: PetDisplayProps) => {
  const { pet, updatePet } = usePet();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [attentionNeeded, setAttentionNeeded] = useState(false);
  const [lastCommunication, setLastCommunication] = useState(Date.now());

  // Pet communication messages based on stats
  const getPetMessage = () => {
    if (pet.hunger <= 30) return `${pet.name} looks hungry...`;
    if (pet.happiness <= 30) return `${pet.name} seems sad...`;
    if (pet.cleanliness <= 30) return `${pet.name} needs a bath!`;
    if (pet.energy <= 30) return `${pet.name} looks tired...`;
    
    // Random messages when stats are okay
    const randomMessages = [
      `${pet.name} purrs softly.`,
      `${pet.name} looks at you with curious eyes.`,
      `${pet.name} stretches lazily.`,
      `${pet.name} meows for attention.`,
      `${pet.name} playfully paws at the screen.`
    ];
    
    return randomMessages[Math.floor(Math.random() * randomMessages.length)];
  };

  // Check if pet needs attention
  useEffect(() => {
    const checkPetNeeds = () => {
      const currentTime = Date.now();
      // Only show communication if it's been at least 30 seconds since the last one
      if (currentTime - lastCommunication > 30000) {
        if (pet.hunger <= 30 || pet.happiness <= 30 || pet.cleanliness <= 30) {
          setAttentionNeeded(true);
          setToastMessage(getPetMessage());
          setShowToast(true);
          setLastCommunication(currentTime);
          
          // Hide the attention animation after 5 seconds
          setTimeout(() => {
            setAttentionNeeded(false);
          }, 5000);
        } else if (Math.random() < 0.3) { // 30% chance of random communication
          setToastMessage(getPetMessage());
          setShowToast(true);
          setLastCommunication(currentTime);
        }
      }
    };

    const communicationInterval = setInterval(checkPetNeeds, 10000); // Check every 10 seconds
    
    return () => clearInterval(communicationInterval);
  }, [pet, lastCommunication]);

  // Hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="pet-display-container">
      <div className={`pet-image ${attentionNeeded ? 'attention-needed' : ''}`}>
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
      
      {showToast && <Toast message={toastMessage} />}
    </div>
  );
};