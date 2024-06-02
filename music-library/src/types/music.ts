export interface Music {
  id: number;
  user: number;
  title: string;
  filename: string;
  author: string;
  tags: string[];
}

export interface MusicCreate {
  user: number;
  title: string;
  filename: string;
  author: string;
  tags: string[];
}
