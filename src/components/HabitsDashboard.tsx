
import React from 'react';
import { useHabits } from '@/contexts/HabitsContext';
import HabitCard from './HabitCard';
import AddHabitForm from './AddHabitForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const HabitsDashboard: React.FC = () => {
  const { habits, isLoading } = useHabits();
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[250px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-full" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Habits</h1>
          <p className="text-muted-foreground mt-1">
            Track your daily habits and build streaks
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <AddHabitForm />
        </div>
      </div>
      
      {habits.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Welcome to your Habit Tracker!</CardTitle>
            <CardDescription>
              You haven't created any habits yet. Get started by adding your first habit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddHabitForm />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitsDashboard;
