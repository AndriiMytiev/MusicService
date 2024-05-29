export interface Music {
  id: number;
  user: number;
  title: string;
  fileName: string;
  author: string;
  tags: string[];
}

export interface MusicCreate {
  user: number;
  title: string;
  fileName: string;
  author: string;
  tags: string[];
}
