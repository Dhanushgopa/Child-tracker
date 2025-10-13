import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Apple } from "lucide-react";
import React, { useState } from "react";

const FoodLog = () => {
  const [childName, setChildName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [meals, setMeals] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: ""
  });

  const handleMealChange = (meal: keyof typeof meals, value: string) => {
    setMeals(prev => ({ ...prev, [meal]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this data to a database or state management system
    alert(`Food log saved for ${childName} on ${date}`);
    console.log({ childName, date, meals });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Food Log</h1>
            <p className="text-xl text-muted-foreground">
              Track your child's daily nutrition intake
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Apple className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Daily Food Intake</h2>
                <p className="text-sm text-muted-foreground">Log your child's meals and snacks</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="childName" className="flex items-center gap-2 text-foreground font-medium">
                    <User className="w-4 h-4 text-primary" />
                    Child's Name
                  </Label>
                  <Input
                    id="childName"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Enter child's name"
                    className="bg-background"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2 text-foreground font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-background"
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="breakfast" className="text-foreground font-medium">
                    Breakfast
                  </Label>
                  <Textarea
                    id="breakfast"
                    value={meals.breakfast}
                    onChange={(e) => handleMealChange('breakfast', e.target.value)}
                    placeholder="What did your child eat for breakfast? (e.g., oatmeal with banana, milk)"
                    className="bg-background min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lunch" className="text-foreground font-medium">
                    Lunch
                  </Label>
                  <Textarea
                    id="lunch"
                    value={meals.lunch}
                    onChange={(e) => handleMealChange('lunch', e.target.value)}
                    placeholder="What did your child eat for lunch? (e.g., chicken sandwich, apple slices, water)"
                    className="bg-background min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dinner" className="text-foreground font-medium">
                    Dinner
                  </Label>
                  <Textarea
                    id="dinner"
                    value={meals.dinner}
                    onChange={(e) => handleMealChange('dinner', e.target.value)}
                    placeholder="What did your child eat for dinner? (e.g., pasta with vegetables, milk)"
                    className="bg-background min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="snacks" className="text-foreground font-medium">
                    Snacks
                  </Label>
                  <Textarea
                    id="snacks"
                    value={meals.snacks}
                    onChange={(e) => handleMealChange('snacks', e.target.value)}
                    placeholder="What snacks did your child have? (e.g., yogurt, crackers, fruit)"
                    className="bg-background min-h-[100px]"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg" className="bg-success hover:bg-success/90 text-success-foreground">
                  Save Food Log
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FoodLog;