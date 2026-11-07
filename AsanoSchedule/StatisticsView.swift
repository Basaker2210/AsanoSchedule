import SwiftUI
import Charts

struct StatisticsView: View {
    @EnvironmentObject var dataManager: DataManager

    var weeklyStats: [WeeklyStats] {
        dataManager.getWeeklyStats()
    }

    var averageCompletion: Double {
        guard !weeklyStats.isEmpty else { return 0 }
        let total = weeklyStats.reduce(0) { $0 + $1.completionPercentage }
        return total / Double(weeklyStats.count)
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Summary Card
                    VStack(spacing: 12) {
                        Text("Tổng quát")
                            .font(.headline)

                        HStack(spacing: 20) {
                            StatCard(
                                icon: "checkmark.circle.fill",
                                title: "Hoàn thành",
                                value: String(dataManager.tasks.filter { $0.isCompleted }.count),
                                color: .green
                            )

                            StatCard(
                                icon: "list.bullet",
                                title: "Tổng công việc",
                                value: String(dataManager.tasks.count),
                                color: .blue
                            )
                        }
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    .padding()

                    // Average Completion
                    VStack(spacing: 12) {
                        HStack {
                            Text("Tỉ lệ hoàn thành trung bình")
                                .font(.headline)
                            Spacer()
                            Text(String(format: "%.0f%%", averageCompletion))
                                .font(.headline)
                                .foregroundColor(.blue)
                        }

                        ProgressView(value: averageCompletion / 100)
                            .tint(.blue)
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    .padding()

                    // Weekly Chart
                    VStack(spacing: 12) {
                        Text("Tiến độ theo tuần")
                            .font(.headline)
                            .frame(maxWidth: .infinity, alignment: .leading)

                        if !weeklyStats.isEmpty {
                            Chart(weeklyStats) { stat in
                                BarMark(
                                    x: .value("Tuần", stat.weekDate.formatted(date: .abbreviated, time: .omitted)),
                                    y: .value("Tỉ lệ (%)", stat.completionPercentage)
                                )
                                .foregroundStyle(
                                    stat.completionPercentage >= 70 ? Color.green :
                                    stat.completionPercentage >= 40 ? Color.yellow :
                                    Color.red
                                )
                            }
                            .frame(height: 250)
                            .chartYAxis {
                                AxisMarks(position: .leading)
                            }
                        } else {
                            Text("Chưa có dữ liệu")
                                .foregroundColor(.gray)
                                .frame(height: 200)
                                .frame(maxWidth: .infinity)
                        }
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    .padding()

                    // Detailed Weekly Stats
                    VStack(spacing: 12) {
                        Text("Chi tiết theo tuần")
                            .font(.headline)
                            .frame(maxWidth: .infinity, alignment: .leading)

                        ForEach(weeklyStats) { stat in
                            WeeklyStatRow(stat: stat)
                        }
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    .padding()
                }
                .padding(.vertical)
            }
            .navigationTitle("Thống kê")
        }
    }
}

struct StatCard: View {
    let icon: String
    let title: String
    let value: String
    let color: Color

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 28))
                .foregroundColor(color)

            Text(title)
                .font(.caption)
                .foregroundColor(.gray)

            Text(value)
                .font(.title2)
                .fontWeight(.bold)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.white)
        .cornerRadius(8)
    }
}

struct WeeklyStatRow: View {
    let stat: WeeklyStats

    var body: some View {
        VStack(spacing: 8) {
            HStack {
                Text(stat.weekDate.formatted(date: .abbreviated, time: .omitted))
                    .font(.subheadline)
                    .fontWeight(.semibold)

                Spacer()

                Text("\(stat.completedTasks)/\(stat.totalTasks)")
                    .font(.caption)
                    .foregroundColor(.gray)
            }

            HStack(spacing: 8) {
                ProgressView(value: stat.completionPercentage / 100)
                    .tint(
                        stat.completionPercentage >= 70 ? .green :
                        stat.completionPercentage >= 40 ? .yellow :
                        .red
                    )

                Text(String(format: "%.0f%%", stat.completionPercentage))
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(
                        stat.completionPercentage >= 70 ? .green :
                        stat.completionPercentage >= 40 ? .orange :
                        .red
                    )
            }
        }
        .padding()
        .background(Color.white)
        .cornerRadius(8)
    }
}

#Preview {
    StatisticsView()
        .environmentObject(DataManager())
}
