// import {
//   ApiPost,
//   CreatePostRequest,
//   CreatePostResponse,
//   GetPostsResponse,
//   ToggleLikeResponse,
// } from "../types/PostType";

import {
  CreatePostRequest,
  CreatePostResponse,
  GetPostsResponse,
  IPost,
  ToggleLikeResponse,
} from "@/types/PostType";
import { apiClient } from "./apiConfig";
import { ENDPOINTS } from "./endpoints";

export async function createPost(
  payload: CreatePostRequest,
): Promise<CreatePostResponse> {
  const { data } = await apiClient.post<CreatePostResponse>(
    ENDPOINTS.POSTS.CREATE,
    payload,
  );
  return data;
}

export async function getPosts(
  page: number = 1,
  limit: number = 10,
): Promise<GetPostsResponse> {
  const { data } = await apiClient.get<GetPostsResponse>(
    `${ENDPOINTS.POSTS.LIST}?page=${page}&limit=${limit}`,
  );
  return data;
}

export async function getMyPosts(
  page: number = 1,
  limit: number = 10,
): Promise<GetPostsResponse> {
  const { data } = await apiClient.get<GetPostsResponse>(
    `${ENDPOINTS.POSTS.MINE}?page=${page}&limit=${limit}`,
  );

  return data;
}

export async function getPostById(postId: string): Promise<IPost> {
  const { data } = await apiClient.get<{ post: IPost }>(
    `${ENDPOINTS.POSTS.LIST}/${postId}`,
  );

  return data?.post;
}

export async function toggleLike(postId: string): Promise<ToggleLikeResponse> {
  const { data } = await apiClient.post<ToggleLikeResponse>(`/likes/${postId}`);
  return data;
}
