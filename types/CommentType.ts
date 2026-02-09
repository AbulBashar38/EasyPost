import { BaseUser } from "./UserType";

export interface IComment {
  _id: string;
  userId: BaseUser; // Can be populated user object or just userId string
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentResponse {
  message: string;
  comment: IComment;
}

export interface GetCommentsResponse {
  comments: IComment[];
}

export interface CreateCommentRequest {
  content: string;
}
