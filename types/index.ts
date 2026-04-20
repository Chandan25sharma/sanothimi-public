export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  icon: string;
  responsibilities: string[];
  achievement: string;
}

export interface Achievement {
  id: number;
  icon: string;
  year: string;
  title: string;
  description: string;
  metric: string;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  id: number;
  tag: string;
  tagIcon: string;
  title: string;
  description: string;
  bgGradient: string;
  metrics: { value: string; label: string }[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface SoftSkill {
  icon: string;
  name: string;
}

export interface Testimonial {
  id: number;
  initials: string;
  quote: string;
  name: string;
  title: string;
}

export interface BlogPost {
  id: number;
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  bgGradient: string;
}
