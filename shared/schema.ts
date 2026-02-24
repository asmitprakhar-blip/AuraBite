import { z } from "zod";

export * from "./models/auth";

// Menu Items
export const insertMenuItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image: z.string(),
  popular: z.boolean().optional().default(false),
  available: z.boolean().optional().default(true),
});

export type MenuItem = z.infer<typeof insertMenuItemSchema> & { id: number };
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

// Reviews
export const insertReviewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, "Comment is required"),
});

export type Review = z.infer<typeof insertReviewSchema> & { id: number; createdAt: Date | null };
export type InsertReview = z.infer<typeof insertReviewSchema>;

// Orders
export const insertOrderSchema = z.object({
  customerName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  total: z.number(),
  items: z.array(z.object({
    menuItemId: z.number(),
    quantity: z.number(),
    name: z.string(),
    price: z.number(),
    customizations: z.array(z.string()).optional()
  }))
});

export type Order = z.infer<typeof insertOrderSchema> & { id: number; status: string; createdAt: Date | null };
export type InsertOrder = z.infer<typeof insertOrderSchema>;

// Contact Messages
export const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type Message = z.infer<typeof insertMessageSchema> & { id: number; createdAt: Date | null };
export type InsertMessage = z.infer<typeof insertMessageSchema>;
