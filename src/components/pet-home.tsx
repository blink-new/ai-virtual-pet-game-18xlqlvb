
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Heart, Droplet, Battery, Utensils } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { usePetStore } from '../store/pet-store';
import { PetSprite } from './pet-sprite';
import { ChatInterface } from './chat-interface';
import { toast } from 'react-hot-toast';

export const PetHome = () => {
  const {
    pet,
    feed,
    play,
    clean,
    rest,
    increaseExperience,
    checkLevelUp,
  } = usePetStore();

  // Check if any stat is critically low (below 30%)
  const isHungerLow = pet.hunger < 30;
  const isHappinessLow = pet.happiness < 30;
  const isCleanlinessLow = pet.cleanliness < 30;
  const isEnergyLow = pet.energy < 30;
  
  const hasLowStats = isHungerLow || isHappinessLow || isCleanlinessLow || isEnergyLow;

  // Handle feeding the pet
  const handleFeed = () => {
    feed(20);
    increaseExperience(5);
    checkLevelUp();
    toast.success(`${pet.name} enjoyed the meal!`);
  };

  // Handle playing with the pet
  const handlePlay = () => {
    play(15);
    increaseExperience(10);
    checkLevelUp();
    toast.success(`${pet.name} had fun playing!`);
  };

  // Handle cleaning the pet
  const handleClean = () => {
    clean(25);
    increaseExperience(5);
    checkLevelUp();
    toast.success(`${pet.name} is squeaky clean!`);
  };

  // Handle letting the pet rest
  const handleRest = () => {
    rest(30);
    increaseExperience(5);
    checkLevelUp();
    toast.success(`${pet.name} feels refreshed!`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-gradient-to-r from-violet-100 to-indigo-100 shadow-lg rounded-xl overflow-hidden">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="w-full bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="home" className="flex-1">Home</TabsTrigger>
            <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
            <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="p-6 min-h-[500px]">
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Warning icon that appears when stats are low */}
                <AnimatePresence>
                  {hasLowStats && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -30 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10"
                    >
                      <AlertTriangle className="text-red-500 w-8 h-8" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <PetSprite
                  type={pet.type}
                  color={pet.color}
                  mood={
                    isHappinessLow ? 'sad' :
                    isHungerLow ? 'hungry' :
                    isCleanlinessLow ? 'dirty' :
                    isEnergyLow ? 'tired' : 'happy'
                  }
                />
              </div>

              <h2 className="text-2xl font-bold mt-4 mb-2 text-indigo-900">{pet.name}</h2>
              <p className="text-indigo-700 mb-6">Level {pet.level} {pet.type}</p>

              {/* Status indicators */}
              <div className="w-full max-w-md space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Utensils className={`w-5 h-5 ${isHungerLow ? 'text-red-500' : 'text-indigo-600'}`} />
                  <Progress 
                    value={pet.hunger} 
                    className={`h-3 ${isHungerLow ? 'bg-red-200' : 'bg-indigo-200'}`} 
                  />
                  <span className="text-sm font-medium w-8">{pet.hunger}%</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Heart className={`w-5 h-5 ${isHappinessLow ? 'text-red-500' : 'text-pink-500'}`} />
                  <Progress 
                    value={pet.happiness} 
                    className={`h-3 ${isHappinessLow ? 'bg-red-200' : 'bg-pink-200'}`} 
                  />
                  <span className="text-sm font-medium w-8">{pet.happiness}%</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Droplet className={`w-5 h-5 ${isCleanlinessLow ? 'text-red-500' : 'text-blue-500'}`} />
                  <Progress 
                    value={pet.cleanliness} 
                    className={`h-3 ${isCleanlinessLow ? 'bg-red-200' : 'bg-blue-200'}`} 
                  />
                  <span className="text-sm font-medium w-8">{pet.cleanliness}%</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Battery className={`w-5 h-5 ${isEnergyLow ? 'text-red-500' : 'text-green-500'}`} />
                  <Progress 
                    value={pet.energy} 
                    className={`h-3 ${isEnergyLow ? 'bg-red-200' : 'bg-green-200'}`} 
                  />
                  <span className="text-sm font-medium w-8">{pet.energy}%</span>
                </div>
              </div>

              {/* Warning panel for low stats */}
              <AnimatePresence>
                {hasLowStats && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full max-w-md mb-6"
                  >
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800">
                      <div className="font-medium flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {pet.name} needs attention!
                      </div>
                      <ul className="text-sm mt-2 space-y-1 pl-6 list-disc">
                        {isHungerLow && <li>{pet.name} is hungry!</li>}
                        {isHappinessLow && <li>{pet.name} is feeling sad!</li>}
                        {isCleanlinessLow && <li>{pet.name} needs a bath!</li>}
                        {isEnergyLow && <li>{pet.name} is tired!</li>}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isHungerLow ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } } : {}}
                >
                  <Button 
                    onClick={handleFeed} 
                    className={`w-full ${isHungerLow ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                  >
                    <Utensils className="mr-2 h-4 w-4" /> Feed
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isHappinessLow ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } } : {}}
                >
                  <Button 
                    onClick={handlePlay} 
                    className={`w-full ${isHappinessLow ? 'bg-red-500 hover:bg-red-600' : 'bg-pink-500 hover:bg-pink-600'}`}
                  >
                    <Heart className="mr-2 h-4 w-4" /> Play
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isCleanlinessLow ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } } : {}}
                >
                  <Button 
                    onClick={handleClean} 
                    className={`w-full ${isCleanlinessLow ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                  >
                    <Droplet className="mr-2 h-4 w-4" /> Clean
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isEnergyLow ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } } : {}}
                >
                  <Button 
                    onClick={handleRest} 
                    className={`w-full ${isEnergyLow ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    <Battery className="mr-2 h-4 w-4" /> Rest
                  </Button>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="p-4 min-h-[500px]">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="profile" className="p-6 min-h-[500px]">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4">
                <PetSprite type={pet.type} color={pet.color} mood="happy" />
              </div>
              
              <h2 className="text-2xl font-bold text-indigo-900">{pet.name}</h2>
              <p className="text-indigo-700 mb-2">Level {pet.level} {pet.type}</p>
              
              <div className="bg-white/50 rounded-lg p-4 w-full max-w-md mt-4">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Experience</span>
                    <span className="text-sm font-medium">{pet.experience}/{pet.level * 100} XP</span>
                  </div>
                  <Progress value={(pet.experience / (pet.level * 100)) * 100} className="h-2 bg-indigo-200" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <p className="text-xs text-indigo-700">Coins</p>
                    <p className="text-lg font-bold text-indigo-900">{pet.coins}</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <p className="text-xs text-indigo-700">Days</p>
                    <p className="text-lg font-bold text-indigo-900">{pet.days}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-indigo-900">Pet Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Type:</div>
                    <div className="font-medium">{pet.type}</div>
                    
                    <div>Color:</div>
                    <div className="font-medium capitalize">{pet.color}</div>
                    
                    <div>Birthday:</div>
                    <div className="font-medium">Day {pet.birthday}</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};