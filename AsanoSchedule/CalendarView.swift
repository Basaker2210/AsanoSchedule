import SwiftUI

struct CalendarView: View {
    @EnvironmentObject var dataManager: DataManager
    @State private var viewMode: ViewMode = .month
    @State private var selectedDate = Date()

    enum ViewMode {
        case week
        case month
    }

    var displayedTasks: [Task] {
        switch viewMode {
        case .week:
            return dataManager.getTasksForWeek(selectedDate)
        case .month:
            return dataManager.getTasksForMonth(selectedDate)
        }
    }

    var body: some View {
        NavigationStack {
            VStack {
                // View Mode Picker
                Picker("Chế độ xem", selection: $viewMode) {
                    Text("Tuần").tag(ViewMode.week)
                    Text("Tháng").tag(ViewMode.month)
                }
                .pickerStyle(.segmented)
                .padding()

                // Date Picker
                DatePicker(
                    "Chọn ngày",
                    selection: $selectedDate,
                    displayedComponents: viewMode == .week ? [.date] : [.date]
                )
                .datePickerStyle(.graphical)
                .padding()

                // Tasks List
                List(displayedTasks) { task in
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text(task.title)
                                    .font(.headline)
                                    .strikethrough(task.isCompleted)

                                Text(task.description)
                                    .font(.caption)
                                    .foregroundColor(.gray)
                                    .lineLimit(2)
                            }

                            Spacer()

                            Button(action: {
                                dataManager.toggleCompletion(task.id)
                            }) {
                                Image(systemName: task.isCompleted ? "checkmark.circle.fill" : "circle")
                                    .font(.system(size: 24))
                                    .foregroundColor(task.isCompleted ? .green : .gray)
                            }
                        }

                        HStack(spacing: 12) {
                            Label(task.priority.rawValue, systemImage: "flag.fill")
                                .font(.caption)
                                .foregroundColor(.white)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 2)
                                .background(Color(task.priority.color))
                                .cornerRadius(4)

                            Label(task.dueDate.formatted(date: .abbreviated, time: .shortened), systemImage: "calendar")
                                .font(.caption)
                                .foregroundColor(.gray)

                            Spacer()
                        }
                    }
                    .padding(.vertical, 4)
                }
                .listStyle(.plain)
            }
            .navigationTitle("Lịch")
        }
    }
}

#Preview {
    CalendarView()
        .environmentObject(DataManager())
}
