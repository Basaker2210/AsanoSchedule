import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getTasks, addTask, deleteTask, toggleTask } from '../utils/storage';
import { formatDate } from '../utils/dateHelper';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium',
  });

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    try {
      const allTasks = await getTasks();
      const todayTasks = allTasks.filter(
        task => formatDate(task.dueDate) === formatDate(selectedDate)
      );
      setTasks(todayTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)));
    } catch (error) {
      console.log('Error loading tasks:', error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên công việc');
      return;
    }

    try {
      await addTask({
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        isCompleted: false,
      });
      setNewTask({ title: '', description: '', dueDate: new Date(), priority: 'medium' });
      setShowAddModal(false);
      loadTasks();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm công việc');
    }
  };

  const handleDeleteTask = async (taskId) => {
    Alert.alert('Xoá công việc', 'Bạn chắc chắn muốn xoá?', [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: async () => {
          await deleteTask(taskId);
          loadTasks();
        },
      },
    ]);
  };

  const handleToggleTask = async (taskId) => {
    await toggleTask(taskId);
    loadTasks();
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setShowDatePicker(false);
      // loadTasks sẽ được gọi tự động khi selectedDate thay đổi
    }
  };

  useEffect(() => {
    loadTasks();
  }, [selectedDate]);

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

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'Cao';
      case 'medium':
        return 'Trung bình';
      case 'low':
        return 'Thấp';
      default:
        return priority;
    }
  };

  return (
    <View style={styles.container}>
      {/* Date Picker */}
      <View style={styles.dateSection}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialCommunityIcons name="calendar" size={20} color="#667eea" />
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}

      {/* Tasks List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <TouchableOpacity
              onPress={() => handleToggleTask(item.id)}
              style={styles.checkButton}
            >
              <MaterialCommunityIcons
                name={item.isCompleted ? 'check-circle' : 'circle-outline'}
                size={24}
                color={item.isCompleted ? '#4CAF50' : '#ccc'}
              />
            </TouchableOpacity>

            <View style={styles.taskContent}>
              <Text
                style={[
                  styles.taskTitle,
                  item.isCompleted && styles.completedText,
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <View style={styles.taskMeta}>
                <View
                  style={[
                    styles.priorityBadge,
                    { backgroundColor: getPriorityColor(item.priority) },
                  ]}
                >
                  <Text style={styles.priorityText}>
                    {getPriorityLabel(item.priority)}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
              <MaterialCommunityIcons name="trash-can" size={20} color="#FF4444" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="check-all" size={50} color="#4CAF50" />
            <Text style={styles.emptyText}>Không có công việc</Text>
            <Text style={styles.emptySubText}>Hôm nay bạn đã hoàn thành hết!</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>

      {/* Add Task Modal */}
      <Modal visible={showAddModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancelButton}>Huỷ</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Thêm công việc</Text>
            <TouchableOpacity onPress={handleAddTask}>
              <Text style={styles.saveButton}>Lưu</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Tên công việc *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên công việc"
              value={newTask.title}
              onChangeText={(text) =>
                setNewTask({ ...newTask, title: text })
              }
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Mô tả</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Nhập mô tả"
              value={newTask.description}
              onChangeText={(text) =>
                setNewTask({ ...newTask, description: text })
              }
              multiline
              numberOfLines={4}
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Ưu tiên</Text>
            <View style={styles.priorityOptions}>
              {['low', 'medium', 'high'].map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityOption,
                    newTask.priority === priority && styles.priorityOptionSelected,
                  ]}
                  onPress={() => setNewTask({ ...newTask, priority })}
                >
                  <Text
                    style={[
                      styles.priorityOptionText,
                      newTask.priority === priority && styles.priorityOptionTextSelected,
                    ]}
                  >
                    {getPriorityLabel(priority)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dateSection: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  listContent: {
    padding: 15,
    paddingBottom: 80,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  checkButton: {
    marginRight: 12,
    marginTop: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#667eea',
    paddingTop: 50,
  },
  cancelButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContent: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  priorityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  priorityOptionSelected: {
    borderColor: '#667eea',
    backgroundColor: '#667eea',
  },
  priorityOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  priorityOptionTextSelected: {
    color: 'white',
  },
});

export default HomeScreen;
