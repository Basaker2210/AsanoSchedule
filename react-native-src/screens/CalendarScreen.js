import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getTasks } from '../utils/storage';
import { formatDate } from '../utils/dateHelper';

const CalendarScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    try {
      const allTasks = await getTasks();
      if (viewMode === 'week') {
        const weekStart = new Date(selectedDate);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);

        const weekTasks = allTasks.filter(task => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= weekStart && taskDate < weekEnd;
        });
        setTasks(weekTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
      } else {
        const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

        const monthTasks = allTasks.filter(task => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= monthStart && taskDate <= monthEnd;
        });
        setTasks(monthTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
      }
    } catch (error) {
      console.log('Error loading tasks:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#FF4444';
      case 'medium':
        return '#FFA500';
      case 'low':
        return '#4CAF50';
      default:
        return '#666';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.modeButton, viewMode === 'week' && styles.activeButton]}
          onPress={() => {
            setViewMode('week');
            loadTasks();
          }}
        >
          <Text style={[styles.modeText, viewMode === 'week' && styles.activeModeText]}>
            Tuần
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, viewMode === 'month' && styles.activeButton]}
          onPress={() => {
            setViewMode('month');
            loadTasks();
          }}
        >
          <Text style={[styles.modeText, viewMode === 'month' && styles.activeModeText]}>
            Tháng
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={styles.taskLeft}>
              <Text style={styles.taskDate}>{formatDate(item.dueDate)}</Text>
              <Text style={styles.taskTitle} numberOfLines={2}>
                {item.title}
              </Text>
              {item.description && (
                <Text style={styles.taskDescription} numberOfLines={1}>
                  {item.description}
                </Text>
              )}
            </View>
            <View style={styles.taskRight}>
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(item.priority) },
                ]}
              />
              {item.isCompleted && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color="#4CAF50"
                  style={{ marginTop: 4 }}
                />
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có công việc</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#667eea',
  },
  modeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeModeText: {
    color: 'white',
  },
  listContent: {
    padding: 12,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskLeft: {
    flex: 1,
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  taskDescription: {
    fontSize: 12,
    color: '#999',
  },
  taskRight: {
    alignItems: 'center',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default CalendarScreen;
