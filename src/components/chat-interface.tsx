
import React, { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { usePetStore } from '../store/pet-store';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export const ChatInterface = () => {
  const { pet, messages, addMessage, increaseHappiness, decreaseEnergy } = usePetStore();
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    addMessage({
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    });
    
    // Simulate pet response
    setTimeout(() => {
      const responses = [
        `*${pet.name} wags tail happily*`,
        `*${pet.name} tilts head curiously*`,
        `*${pet.name} looks excited*`,
        `I love when you talk to me!`,
        `That's interesting! Tell me more!`,
        `*${pet.name} jumps around playfully*`,
        `You're the best owner ever!`,
        `*${pet.name} nuzzles against you*`,
      ];
      
      // Add pet response
      addMessage({
        id: (Date.now() + 1).toString(),
        sender: 'pet',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
      });
      
      // Increase happiness and decrease energy when chatting
      increaseHappiness(5);
      decreaseEnergy(2);
    }, 1000);
    
    // Clear input
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-md p-4">
      <div className="text-xl font-bold text-center mb-4 text-indigo-800">
        Chat with {pet.name}
      </div>
      
      <ScrollArea className="flex-grow mb-4 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-purple-200 text-gray-800 rounded-tl-none'
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} /> {/* Invisible element for auto-scrolling */}
        </div>
      </ScrollArea>
      
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Say something nice..."
          className="bg-white/80 border-indigo-200"
        />
        <Button onClick={handleSend} className="bg-indigo-600 hover:bg-indigo-700">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};