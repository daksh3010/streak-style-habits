
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit } from '@/types/habit';
import { calculateStreak, generateId, getTodayDate } from '@/utils/habitUtils';
import { toast } from '@/components/ui/use-toast';

interface HabitsContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'currentStreak' | 'longestStreak' | 'completedDates'>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (habit: Habit) => void;
  isLoading: boolean;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
};

export const HabitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load habits from localStorage on mount
  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      try {
        const parsedHabits = JSON.parse(storedHabits);
        
        // Convert string dates to Date objects
        const processedHabits = parsedHabits.map((habit: any) => ({
          ...habit,
          createdAt: new Date(habit.createdAt),
          completedDates: habit.completedDates.map((date: string) => new Date(date))
        }));
        
        setHabits(processedHabits);
      } catch (error) {
        console.error('Error parsing stored habits:', error);
        toast({
          title: "Error loading habits",
          description: "There was a problem loading your saved habits.",
          variant: "destructive"
        });
      }
    } else {
      // Add sample habits if no habits exist
      const sampleHabits: Habit[] = [
        {
          id: generateId(),
          name: 'Drink Water',
          description: 'Drink 8 glasses of water',
          frequency: 'daily',
          createdAt: new Date(),
          color: '#4CAF50',
          icon: 'droplet',
          currentStreak: 3,
          longestStreak: 5,
          completedDates: [
            new Date(new Date().setDate(new Date().getDate() - 3)),
            new Date(new Date().setDate(new Date().getDate() - 2)),
            new Date(new Date().setDate(new Date().getDate() - 1)),
          ]
        },
        {
          id: generateId(),
          name: 'Exercise',
          description: 'Work out for 30 minutes',
          frequency: 'daily',
          createdAt: new Date(),
          color: '#F44336',
          icon: 'heart',
          currentStreak: 0,
          longestStreak: 7,
          completedDates: []
        }
      ];
      
      setHabits(sampleHabits);
    }
    
    setIsLoading(false);
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits, isLoading]);

  // Add a new habit
  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'currentStreak' | 'longestStreak' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habit,
      id: generateId(),
      createdAt: new Date(),
      currentStreak: 0,
      longestStreak: 0,
      completedDates: []
    };
    
    setHabits(prevHabits => [...prevHabits, newHabit]);
    
    toast({
      title: "Habit created",
      description: `"${habit.name}" has been added to your habits.`
    });
  };

  // Delete a habit
  const deleteHabit = (id: string) => {
    const habitToDelete = habits.find(h => h.id === id);
    if (!habitToDelete) return;
    
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
    
    toast({
      title: "Habit deleted",
      description: `"${habitToDelete.name}" has been removed.`
    });
  };

  // Toggle completion of a habit for today
  const toggleHabitCompletion = (habit: Habit) => {
    const today = getTodayDate();
    
    setHabits(prevHabits => {
      return prevHabits.map(h => {
        if (h.id !== habit.id) return h;
        
        let newCompletedDates = [...h.completedDates];
        
        // Check if habit is already completed today
        const todayCompletionIndex = newCompletedDates.findIndex(date => {
          const d = new Date(date);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === today.getTime();
        });
        
        // Toggle completion
        if (todayCompletionIndex >= 0) {
          // Remove today's completion
          newCompletedDates.splice(todayCompletionIndex, 1);
          toast({
            title: "Habit unmarked",
            description: `"${h.name}" marked as not completed.`
          });
        } else {
          // Add today's completion
          newCompletedDates.push(today);
          toast({
            title: "Streak continued! 🔥",
            description: `You've completed "${h.name}" today.`
          });
        }
        
        // Calculate new streak
        const newStreak = calculateStreak(newCompletedDates);
        const newLongestStreak = Math.max(h.longestStreak, newStreak);
        
        return {
          ...h,
          completedDates: newCompletedDates,
          currentStreak: newStreak,
          longestStreak: newLongestStreak
        };
      });
    });
  };

  const value = {
    habits,
    addHabit,
    deleteHabit,
    toggleHabitCompletion,
    isLoading
  };

  return (
    <HabitsContext.Provider value={value}>
      {children}
    </HabitsContext.Provider>
  );
};
