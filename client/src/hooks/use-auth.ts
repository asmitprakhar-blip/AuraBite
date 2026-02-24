import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, UpsertUser } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

async function fetchUser(): Promise<User | null> {
  return null;
}

async function login(credentials: Pick<UpsertUser, "username" | "password">): Promise<User> {
  throw new Error("Authentication disabled in this demo");
}

async function register(credentials: Pick<UpsertUser, "username" | "password">): Promise<User> {
  throw new Error("Registration disabled in this demo");
}

async function logout(): Promise<void> {
  // Do nothing
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.username}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login disabled",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Welcome!",
        description: `Account created for ${user.username}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration disabled",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "See you next time!",
      });
      window.location.href = "/";
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    user: null as User | null, // Always unauthenticated
    isLoading: false,
    error: null,
    loginMutation,
    registerMutation,
    logoutMutation,
  };
}
