
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Pet {
  id: string;
  name: string;
  type: string;
  image: string;
  happiness: number;
  hunger: number;
  cleanliness: number;
  energy: number;
  createdAt: number;
}

interface PetStore {
  pet: Pet;
  updatePet: (updates: Partial<Pet>) => void;
  resetPet: () => void;
}

// Default pet data
const defaultPet: Pet = {
  id: '1',
  name: 'Fluffy',
  type: 'cat',
  image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop',
  happiness: 80,
  hunger: 70,
  cleanliness: 90,
  energy: 85,
  createdAt: Date.now(),
};

export const usePet = create<PetStore>()(
  persist(
    (set) => ({
      pet: defaultPet,
      updatePet: (updates) => set((state) => ({ 
        pet: { ...state.pet, ...updates } 
      })),
      resetPet: () => set({ pet: defaultPet }),
    }),
    {
      name: 'pet-storage',
    }
  )
);