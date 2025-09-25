export interface DashboardPage {
  id: string;
  name: string;
  widgets: string[]; // Array of widget IDs
}

export interface DashboardState {
  pages: DashboardPage[];
  currentPageId: string;
}