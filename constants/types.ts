import { AuthUser } from "@/types/UserType";

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow";
  actor: AuthUser;
  postId?: string;
  read: boolean;
  createdAt: string;
}
