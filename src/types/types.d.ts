export interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minWidth: number;
  selectedButton: string;
  selectedSubButton: string;
  textAlignment: 'left' | 'center' | 'right';
  background: string;
  text?: string;
  type: string;
  link?: string;
  layoutImage?: string;
}

export interface User {
  _id: number;
  name: string;
  avatar: string;
  avatarUploaded: boolean;
  bio: string;
  background: string;
  layout: Layout[];
  imageColors: string[];
}
