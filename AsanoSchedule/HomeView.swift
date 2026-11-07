import SwiftUI

struct HomeView: View {
    @EnvironmentObject var dataManager: DataManager
    @State private var showAddTask = false
    @State private var selectedDate = Date()

    var todayTasks: [Task] {
        dataManager.getTasksForDate(selectedDate)
    }

    var body: some View {
        NavigationStack {
            VStack {
                // Date Picker
                DatePicker(
                    "Chọn ngày",
                    selection: $selectedDate,
                    displayedComponents: .date
                )
                .datePickerStyle(.graphical)
                .padding()

                // Tasks List
                List {
                    if todayTasks.isEmpty {
                        VStack(alignment: .center, spacing: 10) {
                            Image(systemName: "checkmark.circle.fill")
                                .font(.system(size: 50))
                                .foregroundColor(.green)
                            Text("Không có công việc")
                                .font(.headline)
                            Text("Hôm nay bạn đã hoàn thành hết!")
                                .font(.subheadline)
                                .foregroundColor(.gray)
                        }
                        .frame(maxWidth: .infinity)
                        .listRowBackground(Color.clear)
                    } else {
                        ForEach(todayTasks) { task in
                            TaskRowView(task: task)
                                .contentShape(Rectangle())
                                .onTapGesture {
                                    // Can navigate to edit view
                                }
                        }
                        .onDelete { indexSet in
                            for index in indexSet {
                                dataManager.deleteTask(todayTasks[index].id)
                            }
                        }
                    }
                }
                .listStyle(.plain)
            }
            .navigationTitle("Lịch công việc")
            .toolbar {
                Button(action: { showAddTask = true }) {
                    Image(systemName: "plus.circle.fill")
                        .font(.system(size: 24))
                }
            }
            .sheet(isPresented: $showAddTask) {
                AddTaskView(isPresented: $showAddTask)
                    .environmentObject(dataManager)
            }
        }
    }
}

struct TaskRowView: View {
    @EnvironmentObject var dataManager: DataManager
    var task: Task

    var body: some View {
        HStack {
            Button(action: {
                dataManager.toggleCompletion(task.id)
            }) {
                Image(systemName: task.isCompleted ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 20))
                    .foregroundColor(task.isCompleted ? .green : .gray)
            }

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(task.title)
                        .font(.headline)
                        .strikethrough(task.isCompleted)
                        .foregroundColor(task.isCompleted ? .gray : .primary)

                    if task.reminder {
                        Image(systemName: "bell.fill")
                            .font(.system(size: 12))
                            .foregroundColor(.orange)
                    }
                }

                HStack {
                    Label(task.priority.rawValue, systemImage: "flag.fill")
                        .font(.caption)
                        .foregroundColor(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 2)
                        .background(Color(task.priority.color))
                        .cornerRadius(4)

                    Label(task.dueDate.formatted(date: .abbreviated, time: .shortened), systemImage: "clock")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }

            Spacer()
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    HomeView()
        .environmentObject(DataManager())
}
