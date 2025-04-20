export interface User {
  id: string;
  name: string;
  teams: Team[];
}

export interface Team {
  id: string;
  name: string;
  color: string;
  members: User[];
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  image?: string;
  description: string;
  createdAt: Date;
  author: User;
}

export interface Vote {
  id: string;
  resourceId: string;
  teamId: string;
  userId: string;
  value: number;
}

export interface Comment {
  id: string;
  content: string;
  resourceId: string;
  author: User;
  team: Team;
  createdAt: Date;
} 