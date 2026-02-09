export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/register",
  },
  POSTS: {
    LIST: "/posts",
    MINE: "/posts/mine",
    CREATE: "/posts",
    DETAIL: (id: string) => `/posts/${id}`,
    LIKE: (id: string) => `/posts/${id}/like`,
  },
  COMMENTS: {
    LIST: "/comments",
    CREATE: "/comments",
    DELETE: "/comments",
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
