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
