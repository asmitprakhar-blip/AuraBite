import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type InsertReview, type Review } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const MOCK_REVIEWS: Review[] = [
  { id: 1, name: "Sarah J.", rating: 5, comment: "Absolutely delicious! The Aura Classic Burger is my new favorite.", createdAt: new Date() },
  { id: 2, name: "Mike T.", rating: 4, comment: "Fast delivery and great food. Fries could be a bit crispier though.", createdAt: new Date() },
  { id: 3, name: "Emily R.", rating: 5, comment: "The ordering experience was super smooth. Will definitely order again!", createdAt: new Date() },
];

export function useReviews() {
  return useQuery({
    queryKey: ["/api/reviews"],
    queryFn: async () => MOCK_REVIEWS,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertReview) => {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      const newReview: Review = {
        id: MOCK_REVIEWS.length + 1,
        ...data,
        createdAt: new Date(),
      };
      MOCK_REVIEWS.push(newReview);
      return newReview;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not submit review. Please try again.",
        variant: "destructive",
      });
    }
  });
}
