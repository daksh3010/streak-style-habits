
import React from 'react';
import { HabitsProvider } from '@/contexts/HabitsContext';
import HabitsDashboard from '@/components/HabitsDashboard';
import HabitSummary from '@/components/HabitSummary';

const Index = () => {
  return (
    <HabitsProvider>
      <div className="container py-6 space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400">
            Streak
            <span className="text-accent">Habit</span>
          </h1>
          <p className="text-muted-foreground mt-1">Build better habits, one streak at a time</p>
        </header>
        
        <HabitSummary />
        
        <HabitsDashboard />
        
        <footer className="text-center text-muted-foreground text-sm pt-4 border-t mt-8">
          <p>StreakHabit - Track your habits and build consistent streaks</p>
        </footer>
      </div>
    </HabitsProvider>
  );
};

export default Index;
