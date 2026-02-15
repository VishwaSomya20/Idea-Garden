
export interface Idea {
  id: string;
  title: string;
  description: string;
  date: string;
  x: number;
  y: number;
  flowerType: string;
  flowerImage?: string; // Base64 or URL
  scale: number;
  isNew?: boolean;
}

export enum FlowerStyle {
  SUNFLOWER = 'sunflower',
  TULIP = 'tulip',
  ROSE = 'rose',
  DAISY = 'daisy',
  CUSTOM = 'custom'
}
