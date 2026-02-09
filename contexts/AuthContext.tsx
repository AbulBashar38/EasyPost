import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { apiClient } from "@/services/apiConfig";
import { ENDPOINTS } from "@/services/endpoints";
import { getToken, removeToken, setToken } from "@/services/tokenStorage";
import { AuthUser } from "@/types/UserType";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (token: string, user: AuthUser) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      const stored = await getToken();
      setTokenState(stored);
      setTokenLoaded(true);
    })();
  }, []);

  const {
    data: user,
    isLoading: isUserLoading,
    isError,
  } = useQuery<AuthUser>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data } = await apiClient.get<GetUserMeResponse>(
        ENDPOINTS.USERS.ME,
      );
      return data?.user;
    },
    enabled: tokenLoaded && !!token,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError && token) {
      removeToken();
      setTokenState(null);
    }
  }, [isError, token]);

  const signIn = useCallback(
    async (newToken: string, newUser: AuthUser) => {
      await setToken(newToken);
      setTokenState(newToken);
      queryClient.setQueryData(["auth", "me"], newUser);
    },
    [queryClient],
  );

  const signOut = useCallback(async () => {
    await removeToken();
    setTokenState(null);
    queryClient.setQueryData(["auth", "me"], null);
    queryClient.clear();
  }, [queryClient]);

  const isLoading = !tokenLoaded || (!!token && isUserLoading && !isError);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
