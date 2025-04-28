
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

export type PetType = 'dragon' | 'cat' | 'dog' | 'bird' | 'rabbit';
export type PetColor = 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'teal' | 'yellow';
export type PetMood = 'happy' | 'sad' | 'hungry' | 'dirty' | 'tired';

export interface Message {
  id: string;
  sender: 'user' | 'pet';
  text: string;
  timestamp: string;
}

interface Pet {
  name: string;
  type: PetType;
  color: PetColor;
  hunger: number;
  happiness: number;
  cleanliness: number;
  energy: number;
  experience: number;
  level: number;
  coins: number;
  days: number;
  birthday: number;
  inventory: string[];
}

interface PetStore {
  pet: Pet;
  messages: Message[];
  gameStarted: boolean;
  
  // Pet creation
  createPet: (name: string, type: PetType, color: PetColor) => void;
  startGame: () => void;
  
  // Pet care actions
  feed: (amount: number) => void;
  play: (amount: number) => void;
  clean: (amount: number) => void;
  rest: (amount: number) => void;
  
  // Stat modifiers
  decreaseHunger: (amount: number) => void;
  decreaseHappiness: (amount: number) => void;
  decreaseCleanliness: (amount: number) => void;
  decreaseEnergy: (amount: number) => void;
  increaseHunger: (amount: number) => void;
  increaseHappiness: (amount: number) => void;
  increaseCleanliness: (amount: number) => void;
  increaseEnergy: (amount: number) => void;
  
  // Experience and progression
  increaseExperience: (amount: number) => void;
  checkLevelUp: () => void;
  increaseCoins: (amount: number) => void;
  decreaseCoins: (amount: number) => void;
  increaseDays: () => void;
  
  // Inventory
  addToInventory: (itemId: string) => void;
  
  // Chat
  addMessage: (message: Message) => void;
}

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      pet: {
        name: '',
        type: 'cat',
        color: 'blue',
        hunger: 100,
        happiness: 100,
        cleanliness: 100,
        energy: 100,
        experience: 0,
        level: 1,
        coins: 50, // Start with some coins to buy items
        days: 1,
        birthday: 1,
        inventory: [],
      },
      messages: [],
      gameStarted: false,
      
      createPet: (name, type, color) => set({
        pet: {
          ...get().pet,
          name,
          type,
          color,
        },
      }),
      
      startGame: () => set({ gameStarted: true }),
      
      feed: (amount) => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            hunger: Math.min(100, pet.hunger + amount),
          },
        });
      },
      
      play: (amount) => {
        const { pet } = get();
        // Energy decreases only when playing
        set({
          pet: {
            ...pet,
            happiness: Math.min(100, pet.happiness + amount),
            energy: Math.max(0, pet.energy - amount / 2),
          },
        });
      },
      
      clean: (amount) => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            cleanliness: Math.min(100, pet.cleanliness + amount),
          },
        });
      },
      
      rest: (amount) => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            energy: Math.min(100, pet.energy + amount),
          },
        });
      },
      
      decreaseHunger: (amount) => {
        const { pet } = get();
        const newHunger = Math.max(0, pet.hunger - amount);
        
        // Show warning toast when hunger first drops below 30%
        if (pet.hunger >= 30 && newHunger < 30) {
          toast.error(`${pet.name} is getting hungry!`, {
            icon: '🍽️',
          });
        }
        
        set({
          pet: {
            ...pet,
            hunger: newHunger,
          },
        });
      },
      
      decreaseHappiness: (amount) => {
        const { pet } = get();
        const newHappiness = Math.max(0, pet.happiness - amount);
        
        // Show warning toast when happiness first drops below 30%
        if (pet.happiness >= 30 && newHappiness < 30) {
          toast.error(`${pet.name} is feeling sad!`, {
            icon: '😢',
          });
        }
        
        set({
          pet: {
            ...pet,
            happiness: newHappiness,
          },
        });
      },
      
      decreaseCleanliness: (amount) => {
        const { pet } = get();
        const newCleanliness = Math.max(0, pet.cleanliness - amount);
        
        // Show warning toast when cleanliness first drops below 30%
        if (pet.cleanliness >= 30 && newCleanliness < 30) {
          toast.error(`${pet.name} needs a bath!`, {
            icon: '🛁',
          });
        }
        
        set({
          pet: {
            ...pet,
            cleanliness: newCleanliness,
          },
        });
      },
      
      decreaseEnergy: (amount) => {
        const { pet } = get();
        const newEnergy = Math.max(0, pet.energy - amount);
        
        // Show warning toast when energy first drops below 30%
        if (pet.energy >= 30 && newEnergy < 30) {
          toast.error(`${pet.name} is getting tired!`, {
            icon: '😴',
          });
        }
        
        set({
          pet: {
            ...pet,
            energy: newEnergy,
          },
        });
      },
      
      increaseHunger: (amount) => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            hunger: Math.min(100, pet.hunger + amount),
          },
        });
      },
      
      increaseHappiness: (amount) => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            happiness: Math.min(100, pet.happiness + amount),
          },
        });
      },
      
      increaseCleanliness: (amount) => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            cleanliness: Math.min(100, pet.cleanliness + amount),
          },
        });
      },
      
      increaseEnergy: (amount) => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            energy: Math.min(100, pet.energy + amount),
          },
        });
      },
      
      increaseExperience: (amount) => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            experience: pet.experience + amount,
          },
        });
      },
      
      checkLevelUp: () => {
        const { pet } = get();
        const experienceThreshold = pet.level * 100;
        
        if (pet.experience >= experienceThreshold) {
          // Level up the pet
          const newLevel = pet.level + 1;
          const remainingExp = pet.experience - experienceThreshold;
          const coinReward = newLevel * 10;
          
          // Apply level-up bonuses
          set({
            pet: {
              ...pet,
              level: newLevel,
              experience: remainingExp,
              coins: pet.coins + coinReward,
              // Boost stats as a level-up reward
              hunger: Math.min(100, pet.hunger + 20),
              happiness: Math.min(100, pet.happiness + 20),
              cleanliness: Math.min(100, pet.cleanliness + 20),
              energy: Math.min(100, pet.energy + 20),
            },
          });
          
          // Show level-up notification
          toast.success(`${pet.name} leveled up to level ${newLevel}! Earned ${coinReward} coins!`, {
            icon: '🎉',
            duration: 5000,
          });
        }
      },
      
      increaseCoins: (amount) => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            coins: pet.coins + amount,
          },
        });
      },
      
      decreaseCoins: (amount) => {
        const { pet } = get();
        if (pet.coins >= amount) {
          set({
            pet: {
              ...pet,
              coins: pet.coins - amount,
            },
          });
          return true;
        }
        return false;
      },
      
      increaseDays: () => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            days: pet.days + 1,
          },
        });
      },
      
      addToInventory: (itemId) => {
        const { pet } = get();
        set({
          pet: {
            ...pet,
            inventory: [...pet.inventory, itemId],
          },
        });
      },
      
      addMessage: (message) => {
        set({
          messages: [...get().messages, message],
        });
      },
    }),
    {
      name: 'pet-storage',
    }
  )
);