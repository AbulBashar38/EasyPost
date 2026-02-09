import {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsResponse,
} from "../types/CommentType";
import { apiClient } from "./apiConfig";
import { ENDPOINTS } from "./endpoints";

export async function createComment(
  postId: string,
  payload: CreateCommentRequest,
): Promise<CreateCommentResponse> {
  const { data } = await apiClient.post<CreateCommentResponse>(
    `${ENDPOINTS.COMMENTS.CREATE}/${postId}`,
    payload,
  );
  return data;
}

export async function getComments(
  postId: string,
): Promise<GetCommentsResponse> {
  const { data } = await apiClient.get<GetCommentsResponse>(
    `${ENDPOINTS.COMMENTS.LIST}/${postId}`,
  );
  return data;
}

export async function deleteComment(
  commentId: string,
): Promise<{ message: string }> {
  const { data } = await apiClient.delete<{ message: string }>(
    `${ENDPOINTS.COMMENTS.DELETE}/${commentId}`,
  );
  return data;
}
