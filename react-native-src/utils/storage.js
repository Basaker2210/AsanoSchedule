import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const TASKS_KEY = '@asano_schedule_tasks';

export const getTasks = async () => {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Error getting tasks:', error);
    return [];
  }
};

export const addTask = async (task) => {
  try {
    const tasks = await getTasks();
    const newTask = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return newTask;
  } catch (error) {
    console.log('Error adding task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const tasks = await getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
  } catch (error) {
    console.log('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const tasks = await getTasks();
    const filtered = tasks.filter(t => t.id !== taskId);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.log('Error deleting task:', error);
    throw error;
  }
};

export const toggleTask = async (taskId) => {
  try {
    const tasks = await getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
  } catch (error) {
    console.log('Error toggling task:', error);
    throw error;
  }
};

export const getTasksByDate = async (date) => {
  try {
    const tasks = await getTasks();
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(t => {
      const taskDate = new Date(t.dueDate).toISOString().split('T')[0];
      return taskDate === dateStr;
    });
  } catch (error) {
    console.log('Error getting tasks by date:', error);
    return [];
  }
};

export const getWeeklyStats = async () => {
  try {
    const tasks = await getTasks();
    const stats = [];

    for (let i = 0; i < 4; i++) {
      const weekDate = new Date();
      weekDate.setDate(weekDate.getDate() - i * 7);

      const weekStart = new Date(weekDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const weekTasks = tasks.filter(t => {
        const taskDate = new Date(t.dueDate);
        return taskDate >= weekStart && taskDate < weekEnd;
      });

      const completed = weekTasks.filter(t => t.isCompleted).length;

      stats.push({
        weekDate: weekStart.toISOString(),
        totalTasks: weekTasks.length,
        completedTasks: completed,
        completionPercentage: weekTasks.length > 0 ? (completed / weekTasks.length) * 100 : 0,
      });
    }

    return stats.sort((a, b) => new Date(b.weekDate) - new Date(a.weekDate));
  } catch (error) {
    console.log('Error getting weekly stats:', error);
    return [];
  }
};
