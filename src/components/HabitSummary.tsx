
import React from 'react';
import { useHabits } from '@/contexts/HabitsContext';
import { isCompletedToday } from '@/utils/habitUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Trophy, Calendar, CheckCircle } from 'lucide-react';

const HabitSummary: React.FC = () => {
  const { habits } = useHabits();
  
  // Calculate summary statistics
  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => isCompletedToday(habit)).length;
  const completionRate = totalHabits ? Math.round((completedToday / totalHabits) * 100) : 0;
  
  const longestStreak = habits.reduce((max, habit) => 
    Math.max(max, habit.longestStreak), 0);
    
  const totalCompletions = habits.reduce((sum, habit) => 
    sum + habit.completedDates.length, 0);
  
  const stats = [
    {
      title: "Today's Progress",
      value: `${completedToday}/${totalHabits}`,
      description: `${completionRate}% Complete`,
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    },
    {
      title: "Longest Streak",
      value: `${longestStreak} days`,
      description: "Keep it going!",
      icon: <Flame className="h-4 w-4 text-orange-500" />
    },
    {
      title: "Total Tracked",
      value: totalHabits.toString(),
      description: "Active habits",
      icon: <Calendar className="h-4 w-4 text-blue-500" />
    },
    {
      title: "Total Completions",
      value: totalCompletions.toString(),
      description: "Great work!",
      icon: <Trophy className="h-4 w-4 text-yellow-500" />
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HabitSummary;
