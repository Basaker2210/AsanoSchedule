import Foundation
import UserNotifications

class DataManager: ObservableObject {
    @Published var tasks: [Task] = []

    private let tasksKey = "AsanoScheduleTasks"

    init() {
        loadTasks()
    }

    // MARK: - Save & Load
    func saveTasks() {
        if let encoded = try? JSONEncoder().encode(tasks) {
            UserDefaults.standard.set(encoded, forKey: tasksKey)
        }
    }

    func loadTasks() {
        if let data = UserDefaults.standard.data(forKey: tasksKey),
           let decoded = try? JSONDecoder().decode([Task].self, from: data) {
            self.tasks = decoded
        }
    }

    // MARK: - CRUD Operations
    func addTask(_ task: Task) {
        var newTask = task
        tasks.append(newTask)
        saveTasks()

        if task.reminder {
            scheduleNotification(for: newTask)
        }
    }

    func updateTask(_ task: Task) {
        if let index = tasks.firstIndex(where: { $0.id == task.id }) {
            tasks[index] = task
            saveTasks()

            if task.reminder {
                scheduleNotification(for: task)
            }
        }
    }

    func deleteTask(_ taskId: UUID) {
        tasks.removeAll { $0.id == taskId }
        saveTasks()
    }

    func toggleCompletion(_ taskId: UUID) {
        if let index = tasks.firstIndex(where: { $0.id == taskId }) {
            tasks[index].isCompleted.toggle()
            saveTasks()
        }
    }

    // MARK: - Statistics
    func getWeeklyStats() -> [WeeklyStats] {
        let calendar = Calendar.current
        var stats: [WeeklyStats] = []

        for dayOffset in 0..<4 {
            let weekStart = calendar.date(byAdding: .weekOfYear, value: -dayOffset, to: Date())!
            let tasksInWeek = tasks.filter { task in
                let taskWeek = calendar.dateComponents([.weekOfYear], from: task.dueDate)
                let weekStartWeek = calendar.dateComponents([.weekOfYear], from: weekStart)
                return taskWeek.weekOfYear == weekStartWeek.weekOfYear
            }

            let completed = tasksInWeek.filter { $0.isCompleted }.count
            stats.append(WeeklyStats(
                weekDate: weekStart,
                totalTasks: tasksInWeek.count,
                completedTasks: completed
            ))
        }

        return stats.sorted { $0.weekDate > $1.weekDate }
    }

    // MARK: - Filtering
    func getTasksForDate(_ date: Date) -> [Task] {
        let calendar = Calendar.current
        return tasks.filter { task in
            calendar.isDate(task.dueDate, inSameDayAs: date)
        }
    }

    func getTasksForWeek(_ date: Date) -> [Task] {
        let calendar = Calendar.current
        let weekStart = calendar.date(from: calendar.dateComponents([.yearForWeekOfYear, .weekOfYear], from: date))!
        let weekEnd = calendar.date(byAdding: .day, value: 7, to: weekStart)!

        return tasks.filter { task in
            task.dueDate >= weekStart && task.dueDate < weekEnd
        }.sorted { $0.dueDate < $1.dueDate }
    }

    func getTasksForMonth(_ date: Date) -> [Task] {
        let calendar = Calendar.current
        let components = calendar.dateComponents([.year, .month], from: date)

        return tasks.filter { task in
            let taskComponents = calendar.dateComponents([.year, .month], from: task.dueDate)
            return components.year == taskComponents.year && components.month == taskComponents.month
        }.sorted { $0.dueDate < $1.dueDate }
    }

    // MARK: - Notifications
    func scheduleNotification(for task: Task) {
        let content = UNMutableNotificationContent()
        content.title = "Nhắc nhở công việc"
        content.body = task.title
        content.sound = .default

        let reminderTime = task.reminderTime ?? task.dueDate
        let components = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: reminderTime)
        let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: false)
        let request = UNNotificationRequest(identifier: task.id.uuidString, content: content, trigger: trigger)

        UNUserNotificationCenter.current().add(request) { error in
            if let error = error {
                print("Lỗi scheduling notification: \(error.localizedDescription)")
            }
        }
    }

    func requestNotificationPermission() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            if granted {
                DispatchQueue.main.async {
                    UIApplication.shared.registerForRemoteNotifications()
                }
            }
        }
    }
}
