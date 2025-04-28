
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { WelcomeScreen } from './components/welcome-screen';
import { AdoptionCenter } from './components/adoption-center';
import { PetHome } from './components/pet-home';
import { usePetStore } from './store/pet-store';
import { Shop } from './components/shop';

function App() {
  const { gameStarted, pet, decreaseHunger, decreaseHappiness, decreaseCleanliness, increaseDays } = usePetStore();

  // Set up timers for decreasing stats
  useEffect(() => {
    if (!gameStarted || !pet.name) return;

    // Decrease hunger, happiness, and cleanliness every minute
    const statsInterval = setInterval(() => {
      decreaseHunger(5);
      decreaseHappiness(5);
      decreaseCleanliness(5);
    }, 60000); // 60000ms = 1 minute

    // Increase days counter every 5 minutes
    const daysInterval = setInterval(() => {
      increaseDays();
    }, 300000); // 300000ms = 5 minutes

    return () => {
      clearInterval(statsInterval);
      clearInterval(daysInterval);
    };
  }, [gameStarted, pet.name, decreaseHunger, decreaseHappiness, decreaseCleanliness, increaseDays]);

  // Render different screens based on game state
  const renderScreen = () => {
    if (!gameStarted) {
      return <WelcomeScreen />;
    }

    if (gameStarted && !pet.name) {
      return <AdoptionCenter />;
    }

    return <PetHome />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Toaster position="top-right" />
      {renderScreen()}
    </div>
  );
}

export default App;