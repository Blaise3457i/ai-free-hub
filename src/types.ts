export interface AITool {
  id: string;
  name: string;
  description: string;
  category: 'Image' | 'Video' | 'Text' | 'Productivity' | 'Misc';
  isFree: boolean;
  image: string;
  link: string;
}

export interface AIPrompt {
  id: string;
  text: string;
  category: 'Text' | 'Image' | 'Video';
  badge: string;
  outputImage?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'AI Art' | 'AI Writing' | 'AI Automation' | 'Marketing';
  thumbnail: string;
  steps: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  trending?: boolean;
}

export interface AIProvider {
  id: string;
  name: string;
  description: string;
  type: 'Premium' | 'Free/Open';
  logo: string;
  link: string;
}
