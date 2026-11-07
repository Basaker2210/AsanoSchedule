import Foundation

// MARK: - Task Model
struct Task: Identifiable, Codable {
    var id: UUID = UUID()
    var title: String
    var description: String
    var dueDate: Date
    var isCompleted: Bool = false
    var priority: Priority = .medium
    var reminder: Bool = false
    var reminderTime: Date?

    enum Priority: String, Codable, CaseIterable {
        case low = "Thấp"
        case medium = "Trung bình"
        case high = "Cao"

        var color: String {
            switch self {
            case .low:
                return "green"
            case .medium:
                return "yellow"
            case .high:
                return "red"
            }
        }
    }
}

// MARK: - Weekly Statistics
struct WeeklyStats: Identifiable, Codable {
    var id: UUID = UUID()
    var weekDate: Date
    var totalTasks: Int
    var completedTasks: Int

    var completionPercentage: Double {
        guard totalTasks > 0 else { return 0 }
        return Double(completedTasks) / Double(totalTasks) * 100
    }
}
