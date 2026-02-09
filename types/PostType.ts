import { IComment } from "./CommentType";
import { BaseUser } from "./UserType";

export interface CreatePostRequest {
  content: string;
}

export interface CreatePostResponse {
  message: string;
  post: {
    _id: string;
    userId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IPost {
  _id: string;
  userId: BaseUser;
  content: string;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  comments: IComment[];
  __v: number;
}
export interface GetPostsResponse {
  posts: IPost[];
  total: number;
  page: number;
  limit: number;
}

export interface ToggleLikeResponse {
  message: string;
  liked: boolean;
}
