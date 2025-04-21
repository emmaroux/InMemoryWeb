export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Team {
  id: number;
  name: string;
  color: string;
  users?: User[];
  votes?: Vote[];
}

export interface Resource {
  id: number;
  title: string;
  content: string;
  date: string;
  location: string;
  status: 'draft' | 'published';
  imageUrl: string | null;
  link: string | null;
  category: {
    id: number;
    name: string;
    description: string;
  };
  votes: Vote[];
}

export interface Vote {
  id: number;
  value: number;
  user: {
    id: number;
    username: string;
  };
  resource: {
    id: number;
    title: string;
  };
  team: {
    id: number;
    name: string;
    color: string;
  };
}

export interface Comment {
  id: number;
  attributes: {
    content: string;
    createdAt: string;
    updatedAt: string;
    resource?: {
      data: StrapiEntity<Resource>;
    };
    team?: {
      data: StrapiEntity<Team>;
    };
    user?: {
      data: StrapiEntity<User>;
    };
  };
}

export interface Category {
  id: number;
  name: string;
  description: string;
  resources?: Resource[];
}

export interface AuthResponse {
  jwt: string;
  user: User;
} 