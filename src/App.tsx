
import { useState } from 'react'
import './App.css'
import { PetDisplay } from './components/PetDisplay'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Virtual Pet</h1>
      </header>
      
      <main className="app-content">
        <Tabs defaultValue="home" className="w-full max-w-3xl">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="play">Play</TabsTrigger>
            <TabsTrigger value="care">Care</TabsTrigger>
            <TabsTrigger value="shop">Shop</TabsTrigger>
          </TabsList>
          
          <TabsContent value="home" className="mt-4">
            <Card className="p-6">
              <PetDisplay />
            </Card>
          </TabsContent>
          
          <TabsContent value="play" className="mt-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Play with your pet</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24">Ball</Button>
                <Button variant="outline" className="h-24">Frisbee</Button>
                <Button variant="outline" className="h-24">Laser Pointer</Button>
                <Button variant="outline" className="h-24">Toy Mouse</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="care" className="mt-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Take care of your pet</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24">Feed</Button>
                <Button variant="outline" className="h-24">Groom</Button>
                <Button variant="outline" className="h-24">Sleep</Button>
                <Button variant="outline" className="h-24">Medicine</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="shop" className="mt-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Shop</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24">Food</Button>
                <Button variant="outline" className="h-24">Toys</Button>
                <Button variant="outline" className="h-24">Accessories</Button>
                <Button variant="outline" className="h-24">Furniture</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App