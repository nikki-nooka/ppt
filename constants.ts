
import { SlideData, SlideType } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    title: "GeoSick",
    subtitle: "AI Health Assistant",
    content: [
      "N.Nikshith 2311cs020483",
      "N.Rishika 2311cs020466",
      "P.Likhitha Sai 2311cs020492",
      "PV. Sujitha Shree 2311cs020518",
      "P.Karthik Chowdary 2311cs020498"
    ],
    isDark: true,
  },
  {
    id: 2,
    type: SlideType.CONTENT_LEFT,
    title: "Introduction",
    subtitle: "Bridging Environment & Wellness",
    content: [
      "GeoSick is a next-generation AI ecosystem that correlates environmental data with personal health risks.",
      "Utilizing advanced Computer Vision to detect pathogen breeding grounds in real-time.",
      "Empowering users with predictive analytics to prevent disease before it strikes."
    ],
    icon: "Activity"
  },
  {
    id: 3,
    type: SlideType.CONTENT_RIGHT,
    title: "The Invisible Threat",
    subtitle: "Why We Built GeoSick",
    content: [
      "7 Million premature deaths annually due to environmental pollution (WHO).",
      "Vector-borne diseases (Dengue, Malaria) thrive in unmonitored stagnant zones.",
      "Patients struggle to interpret complex medical prescriptions, leading to medication errors.",
      "Lack of hyper-local, real-time disease surveillance for communities."
    ],
    icon: "AlertTriangle"
  },
  {
    id: 4,
    type: SlideType.GRID,
    title: "System Architecture",
    content: [
      "Environmental Vision AI",
      "NLP Prescription Decoder",
      "Affective Computing (Mood)",
      "Epidemiological Modeling",
      "Geospatial Risk Mapping"
    ],
    icon: "LayoutGrid"
  },
  {
    id: 5,
    type: SlideType.PROCESS,
    title: "Operational Workflow",
    content: [
      "Environmental Scanning & Data Ingestion",
      "Component-Based Pathogen Recognition",
      "Risk Stratification & Mitigation Protocols"
    ]
  },
  {
    id: 6,
    type: SlideType.GRID,
    title: "Core Capabilities",
    content: [
      "Area Scan & Hazard Detection",
      "AI Symptom Checker",
      "Smart Script Reader",
      "Multi-lingual Application",
      "Voice Assistant & Page Nav",
      "3D Interactive Globe"
    ],
    icon: "Star"
  },
  {
    id: 7,
    type: SlideType.DEMO_ANALYSIS,
    title: "AI Vision Engine",
    subtitle: "Real-time Environmental Hazard Analysis",
    content: ["Leveraging Google Gemini 2.5 Vision to identify risk factors like stagnant water, waste accumulation, and air quality indicators."],
    icon: "Camera"
  },
  {
    id: 8,
    type: SlideType.CONTENT_LEFT,
    title: "Prescription Simplifier",
    subtitle: "Democratizing Medical Information",
    content: [
      "Transforms unstructured medical jargon into structured, easy-to-read checklists.",
      "Extracts dosage, frequency, and dietary restrictions automatically.",
      "Reduces medication non-adherence rates through clear visual communication."
    ],
    icon: "FileText"
  },
  {
    id: 9,
    type: SlideType.DEMO_CHAT,
    title: "Mental Wellness Companion",
    subtitle: "24/7 Empathetic AI Support",
    content: ["An intelligent conversational agent designed to track mood patterns, provide anxiety relief techniques, and offer non-judgmental support."],
    icon: "MessageCircleHeart"
  },
  {
    id: 10,
    type: SlideType.CENTERED,
    title: "Global Risk Visualization",
    content: [
      "Interactive 3D modeling of disease spread vectors.",
      "Spatiotemporal analysis of health trends across regions.",
      "Early warning system for potential epidemic outbreaks."
    ],
    icon: "Globe"
  },
  {
    id: 11,
    type: SlideType.GRID,
    title: "Community Impact",
    content: [
      "Hyper-local Disease Surveillance",
      "Health Equity & Accessibility",
      "Environmental Accountability",
      "24/7 Crisis Support"
    ],
    icon: "Users"
  },
  {
    id: 12,
    type: SlideType.CONTENT_LEFT,
    title: "Travel Shield & Pharma Connect",
    subtitle: "Smart Protection on the Go",
    content: [
      "Travel Safe Mode: Scan hotel rooms and foreign environments for local pathogen risks.",
      "Location-Based Precautions: Automated alerts for endemic diseases (e.g., Malaria zones).",
      "Pharma Brand Integration: Exclusive partnerships with top pharmacy brands for verified medication delivery anywhere."
    ],
    icon: "Plane"
  },
  {
    id: 13,
    type: SlideType.CONTENT_RIGHT,
    title: "Technology Stack",
    subtitle: "Built on Modern Scalable Infrastructure",
    content: [
      "AI Core: Google Gemini 2.5 Flash (Multimodal)",
      "Frontend: React 19, TypeScript, Tailwind CSS",
      "Visuals: Three.js / React Three Fiber (WebGL)",
      "State & Motion: Framer Motion, Zustand"
    ],
    icon: "Cpu"
  },
  {
    id: 14,
    type: SlideType.CENTERED,
    title: "Real-world Applications",
    content: [
      "Urban Planning & Sanitation Monitoring",
      "Personalized Family Health Shields",
      "Travel Risk Assessment for Tourism",
      "Remote Tele-health Triage"
    ],
    icon: "MapPin"
  },
  {
    id: 15,
    type: SlideType.CONTENT_LEFT,
    title: "Competitive Edge",
    content: [
      "First-mover advantage in combining Vision AI with Geospatial Health Tracking.",
      "Holistic approach: Integrating physical environmental factors with mental well-being.",
      "Superior UX: transforming complex medical data into accessible insights."
    ],
    icon: "TrendingUp"
  },
  {
    id: 16,
    type: SlideType.GRID,
    title: "Business Model",
    content: [
      "Freemium Chatbot Access",
      "Premium Subscription Features",
      "Corporate Health Dashboard",
      "Hospital & NGO Partnerships"
    ],
    icon: "Briefcase"
  },
  {
    id: 17,
    type: SlideType.CONTENT_RIGHT,
    title: "Future Roadmap",
    content: [
      "IoT Wearable Data Synchronization",
      "Augmented Reality (AR) Hazard Overlays",
      "Blockchain for Patient Data Privacy",
      "Hyper-local Weather-Health Correlations"
    ],
    icon: "Zap"
  },
  {
    id: 18,
    type: SlideType.CENTERED,
    title: "Conclusion",
    content: [
      "GeoSick is not just an app; it is a comprehensive health defense system.",
      "Empowering individuals with the intelligence to stay healthy in a changing world."
    ],
    icon: "CheckCircle"
  },
  {
    id: 19,
    type: SlideType.CLOSING,
    title: "Thank You",
    subtitle: "Shaping the Future of Health",
    content: ["contact@geosick.ai", "www.geosick.ai"],
    icon: "Heart"
  }
];
