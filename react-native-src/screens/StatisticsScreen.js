import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart, ProgressChart } from 'react-native-svg-charts';
import { getTasks, getWeeklyStats } from '../utils/storage';

const StatisticsScreen = () => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadStatistics();
    }, [])
  );

  const loadStatistics = async () => {
    try {
      const tasks = await getTasks();
      const completed = tasks.filter(t => t.isCompleted).length;
      setTotalTasks(tasks.length);
      setCompletedTasks(completed);

      const stats = await getWeeklyStats();
      setWeeklyStats(stats);
    } catch (error) {
      console.log('Error loading statistics:', error);
    }
  };

  const averageCompletion =
    weeklyStats.length > 0
      ? weeklyStats.reduce((sum, stat) => sum + stat.completionPercentage, 0) /
        weeklyStats.length
      : 0;

  const chartData = {
    labels: weeklyStats.map((_, i) => `Tuần ${i + 1}`),
    data: weeklyStats.map(stat => stat.completionPercentage / 100),
  };

  const barChartData = {
    labels: weeklyStats.map((_, i) => `W${i + 1}`),
    data: [weeklyStats.map(stat => stat.completionPercentage)],
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>✅</Text>
          <Text style={styles.cardLabel}>Hoàn thành</Text>
          <Text style={styles.cardValue}>{completedTasks}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardIcon}>📋</Text>
          <Text style={styles.cardLabel}>Tổng công việc</Text>
          <Text style={styles.cardValue}>{totalTasks}</Text>
        </View>
      </View>

      {/* Average Completion */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tỉ lệ hoàn thành trung bình</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressValue}>
            {Math.round(averageCompletion)}%
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${averageCompletion}%` },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Weekly Chart */}
      {weeklyStats.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tiến độ theo tuần</Text>
          <BarChart
            style={{ height: 200, marginVertical: 16 }}
            data={barChartData}
            keys={['data']}
            colors={['#667eea']}
            yAccessor={({ item }) => item}
            svg={{ fill: '#667eea' }}
            contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
            yMin={0}
            yMax={100}
          />
        </View>
      )}

      {/* Weekly Details */}
      {weeklyStats.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi tiết theo tuần</Text>
          {weeklyStats.map((stat, index) => (
            <View key={index} style={styles.weeklyCard}>
              <View style={styles.weeklyHeader}>
                <Text style={styles.weeklyDate}>
                  Tuần {index + 1}
                </Text>
                <Text style={styles.weeklyRatio}>
                  {stat.completedTasks}/{stat.totalTasks}
                </Text>
              </View>
              <View style={styles.weeklyProgressContainer}>
                <View style={styles.weeklyProgressBar}>
                  <View
                    style={[
                      styles.weeklyProgressFill,
                      {
                        width: `${stat.completionPercentage}%`,
                        backgroundColor:
                          stat.completionPercentage >= 70
                            ? '#4CAF50'
                            : stat.completionPercentage >= 40
                            ? '#FFA500'
                            : '#FF4444',
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.weeklyPercentage,
                    {
                      color:
                        stat.completionPercentage >= 70
                          ? '#4CAF50'
                          : stat.completionPercentage >= 40
                          ? '#FFA500'
                          : '#FF4444',
                    },
                  ]}
                >
                  {Math.round(stat.completionPercentage)}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
  },
  weeklyCard: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  weeklyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weeklyDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  weeklyRatio: {
    fontSize: 12,
    color: '#999',
  },
  weeklyProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weeklyProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  weeklyProgressFill: {
    height: '100%',
  },
  weeklyPercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    minWidth: 35,
  },
});

export default StatisticsScreen;
