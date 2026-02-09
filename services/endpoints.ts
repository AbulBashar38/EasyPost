export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/register",
  },
  POSTS: {
    LIST: "/posts",
    CREATE: "/posts",
    DETAIL: (id: string) => `/posts/${id}`,
    LIKE: (id: string) => `/posts/${id}/like`,
  },
  COMMENTS: {
    LIST: (postId: string) => `/posts/${postId}/comments`,
    CREATE: (postId: string) => `/posts/${postId}/comments`,
  },
  USERS: {
    PROFILE: (id: string) => `/users/${id}`,
    ME: "/users/me",
  },
  NOTIFICATIONS: {
    LIST: "/notifications",
    READ: (id: string) => `/notifications/${id}/read`,
  },
} as const;
