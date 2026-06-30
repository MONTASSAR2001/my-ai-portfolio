// src/data/portfolio.ts

export const portfolioData = {
  hero: {
    name: "MN.",
    role: "AI & Robotics Engineer",
    heading: "Building intelligent systems that make an",
    highlight: "impact.",
    description: "I'm an AI & Robotics Engineer focused on creating autonomous systems, multi-agent architectures, and intelligent digital products.",
    experienceYears: "5+",
    projectsCompleted: "120+",
  },
  techStack: ["ROS 2", "Python", "Next.js", "Supabase", "Docker", "PyTorch"],
  services: [
    {
      title: "AI & Machine Learning",
      description: "Training models, neural networks, and implementing custom LLMs.",
      icon: "⚡", 
    },
    {
      title: "Robotics & ROS",
      description: "Developing autonomous navigation and hardware integration.",
      icon: "🤖",
    },
    {
      title: "Multi-Agent Systems",
      description: "Orchestrating autonomous AI agents using CrewAI and LangGraph.",
      icon: "🕸️",
    },
    {
      title: "Full-Stack Development",
      description: "Building responsive web interfaces and secure backend APIs.",
      icon: "💻",
    }
  ],
  projects: [
    {
      title: "Autonomous ROS Navigator",
      category: "Robotics, Path Planning",
      imagePlaceholder: "[Autonomous Robot UI/Image]",
    },
    {
      title: "Multi-Agent Job System",
      category: "AI, LangGraph, Next.js",
      imagePlaceholder: "[Multi-Agent Dashboard Image]",
    },
    {
      title: "Vision Quality Inspector",
      category: "Machine Learning, Python",
      imagePlaceholder: "[Computer Vision Model Image]",
    }
  ]
};