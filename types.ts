export enum SlideType {
  TITLE = 'TITLE',
  CONTENT_LEFT = 'CONTENT_LEFT', // Text left, Image/Graphic right
  CONTENT_RIGHT = 'CONTENT_RIGHT', // Image/Graphic left, Text right
  CENTERED = 'CENTERED',
  PROCESS = 'PROCESS', // For "How It Works"
  GRID = 'GRID', // For Features
  DEMO_ANALYSIS = 'DEMO_ANALYSIS', // Interactive Gemini Demo
  DEMO_CHAT = 'DEMO_CHAT', // Interactive Chatbot
  CLOSING = 'CLOSING'
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string[];
  icon?: string; // Lucide icon name
  isDark?: boolean; // Special flag for the first slide
}

export interface GeminiAnalysisResult {
  riskLevel: string;
  hazards: string[];
  recommendation: string;
}
