import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type InsertOrder } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertOrder) => {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { id: 1234, ...data, createdAt: new Date() };
    },
    onSuccess: () => {
      toast({
        title: "Order Placed!",
        description: "Your delicious food is on its way.",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
