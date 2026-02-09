export interface User {
  id: string;
  name: string;
  handle: string;
}

export interface Post {
  id: string;
  user: User;
  text: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  text: string;
  createdAt: string;
  parentId: string | null;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow";
  actor: User;
  postId?: string;
  read: boolean;
  createdAt: string;
}
