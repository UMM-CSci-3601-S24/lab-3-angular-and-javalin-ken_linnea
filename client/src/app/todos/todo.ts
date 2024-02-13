export interface Todo {
  _id: string;
  owner: string;
  status: boolean;
  body: string;
  category: string;
  avatar?: string;
}

export type SortBy = 'owner' | 'category' | 'body' | 'status';
