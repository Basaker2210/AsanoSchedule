import SwiftUI

struct ContentView: View {
    @StateObject private var dataManager = DataManager()
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            // Home Tab
            HomeView()
                .tabItem {
                    Label("Trang chủ", systemImage: "house.fill")
                }
                .tag(0)

            // Calendar Tab
            CalendarView()
                .tabItem {
                    Label("Lịch", systemImage: "calendar")
                }
                .tag(1)

            // Statistics Tab
            StatisticsView()
                .tabItem {
                    Label("Thống kê", systemImage: "chart.bar.fill")
                }
                .tag(2)
        }
        .environmentObject(dataManager)
        .onAppear {
            dataManager.requestNotificationPermission()
        }
    }
}

#Preview {
    ContentView()
}
