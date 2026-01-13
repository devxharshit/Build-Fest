export type ViewState = 'LANDING' | 'PROMPTS' | 'DARE_BOX' | 'FOOD' | 'SUBMIT' | 'RULEBOOK';

export interface Prompt {
  id: string;
  title: string;
  body: string;
  theme: string;
}

export interface Dare {
  id: string;
  text: string;
  intensity: 'Low' | 'Medium' | 'High';
}

export interface TeamSubmission {
  teamName: string;
  projectName: string;
  promptId: string;
  demoLink: string;
  reflection: string;
}

export interface LockedDare {
  dareId: string;
  dareText: string;
  teamName: string;
  timestamp: number;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface FoodOutlet {
  id: string;
  name: string;
  description: string;
  items: FoodItem[];
}

export interface OrderItem {
  item: FoodItem;
  quantity: number;
}