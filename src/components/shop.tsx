
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Utensils, Heart, Shirt, Gift, Coins } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { usePetStore } from '../store/pet-store';
import { toast } from 'react-hot-toast';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  effect: () => void;
  category: 'food' | 'toy' | 'clothing' | 'special';
}

export const Shop = () => {
  const { pet, increaseHunger, increaseHappiness, increaseEnergy, increaseCoins, decreaseCoins } = usePetStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Define shop items
  const shopItems: ShopItem[] = [
    {
      id: 'premium-food',
      name: 'Premium Food',
      description: 'A delicious meal that will fully satisfy your pet.',
      price: 10,
      icon: <Utensils className="w-8 h-8 text-amber-500" />,
      effect: () => {
        increaseHunger(50);
        toast.success(`${pet.name} enjoyed the premium food!`);
      },
      category: 'food',
    },
    {
      id: 'gourmet-treat',
      name: 'Gourmet Treat',
      description: 'A special treat that boosts happiness and hunger.',
      price: 15,
      icon: <Gift className="w-8 h-8 text-pink-500" />,
      effect: () => {
        increaseHunger(30);
        increaseHappiness(30);
        toast.success(`${pet.name} loved the gourmet treat!`);
      },
      category: 'food',
    },
    {
      id: 'interactive-toy',
      name: 'Interactive Toy',
      description: 'A fun toy that greatly increases happiness.',
      price: 20,
      icon: <Heart className="w-8 h-8 text-red-500" />,
      effect: () => {
        increaseHappiness(60);
        toast.success(`${pet.name} is having a blast with the new toy!`);
      },
      category: 'toy',
    },
    {
      id: 'energy-drink',
      name: 'Energy Drink',
      description: 'Restores energy so your pet can play more.',
      price: 15,
      icon: <Gift className="w-8 h-8 text-green-500" />,
      effect: () => {
        increaseEnergy(50);
        toast.success(`${pet.name} feels energized!`);
      },
      category: 'food',
    },
    {
      id: 'stylish-hat',
      name: 'Stylish Hat',
      description: 'A fashionable hat that makes your pet look cool.',
      price: 30,
      icon: <Shirt className="w-8 h-8 text-blue-500" />,
      effect: () => {
        increaseHappiness(40);
        toast.success(`${pet.name} looks fabulous in the new hat!`);
      },
      category: 'clothing',
    },
    {
      id: 'cozy-sweater',
      name: 'Cozy Sweater',
      description: 'A warm sweater that keeps your pet comfortable.',
      price: 35,
      icon: <Shirt className="w-8 h-8 text-purple-500" />,
      effect: () => {
        increaseHappiness(45);
        increaseEnergy(20);
        toast.success(`${pet.name} feels cozy and stylish in the new sweater!`);
      },
      category: 'clothing',
    },
    {
      id: 'lucky-charm',
      name: 'Lucky Charm',
      description: 'A special item that brings good fortune.',
      price: 50,
      icon: <Gift className="w-8 h-8 text-yellow-500" />,
      effect: () => {
        increaseCoins(25);
        increaseHappiness(30);
        toast.success(`The lucky charm brought ${pet.name} some extra coins!`);
      },
      category: 'special',
    },
  ];

  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  // Handle purchase
  const handlePurchase = (item: ShopItem) => {
    if (pet.coins < item.price) {
      toast.error("Not enough coins!");
      return;
    }

    decreaseCoins(item.price);
    item.effect();
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Pet Shop</h2>
        <div className="flex items-center gap-2 bg-indigo-100 px-3 py-1.5 rounded-full">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-indigo-900">{pet.coins}</span>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
          className="rounded-full"
        >
          All Items
        </Button>
        <Button
          variant={selectedCategory === 'food' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('food')}
          className="rounded-full"
        >
          Food
        </Button>
        <Button
          variant={selectedCategory === 'toy' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('toy')}
          className="rounded-full"
        >
          Toys
        </Button>
        <Button
          variant={selectedCategory === 'clothing' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('clothing')}
          className="rounded-full"
        >
          Clothing
        </Button>
        <Button
          variant={selectedCategory === 'special' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('special')}
          className="rounded-full"
        >
          Special
        </Button>
      </div>

      {/* Shop items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="p-4 flex items-start gap-4 bg-white/80 backdrop-blur-sm">
              <div className="bg-indigo-100 p-3 rounded-lg">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-indigo-900">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{item.price}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handlePurchase(item)}
                    disabled={pet.coins < item.price}
                    className={pet.coins < item.price ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No items found in this category.
        </div>
      )}
    </div>
  );
};