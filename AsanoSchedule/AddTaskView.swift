import SwiftUI

struct AddTaskView: View {
    @EnvironmentObject var dataManager: DataManager
    @Binding var isPresented: Bool

    @State private var title = ""
    @State private var description = ""
    @State private var dueDate = Date()
    @State private var priority: Task.Priority = .medium
    @State private var reminder = false
    @State private var reminderTime = Date()

    var isValid: Bool {
        !title.trimmingCharacters(in: .whitespaces).isEmpty
    }

    var body: some View {
        NavigationStack {
            Form {
                Section("Thông tin công việc") {
                    TextField("Tên công việc", text: $title)

                    TextField("Mô tả", text: $description, axis: .vertical)
                        .lineLimit(3...5)
                }

                Section("Thời gian") {
                    DatePicker(
                        "Ngày hết hạn",
                        selection: $dueDate,
                        displayedComponents: [.date, .hourAndMinute]
                    )
                }

                Section("Ưu tiên") {
                    Picker("Mức ưu tiên", selection: $priority) {
                        ForEach(Task.Priority.allCases, id: \.self) { p in
                            Text(p.rawValue).tag(p)
                        }
                    }
                }

                Section("Nhắc nhở") {
                    Toggle("Bật nhắc nhở", isOn: $reminder)

                    if reminder {
                        DatePicker(
                            "Thời gian nhắc nhở",
                            selection: $reminderTime,
                            displayedComponents: [.date, .hourAndMinute]
                        )
                    }
                }
            }
            .navigationTitle("Thêm công việc")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Hủy") {
                        isPresented = false
                    }
                }

                ToolbarItem(placement: .confirmationAction) {
                    Button("Lưu") {
                        let newTask = Task(
                            title: title,
                            description: description,
                            dueDate: dueDate,
                            priority: priority,
                            reminder: reminder,
                            reminderTime: reminder ? reminderTime : nil
                        )
                        dataManager.addTask(newTask)
                        isPresented = false
                    }
                    .disabled(!isValid)
                }
            }
        }
    }
}

#Preview {
    AddTaskView(isPresented: .constant(true))
        .environmentObject(DataManager())
}
