import { useQuery } from "@tanstack/react-query";
import { type MenuItem } from "@shared/schema";

const MOCK_MENU: MenuItem[] = [
  { id: 1, name: "Fruit Chaat", description: "A colorful mix of fresh apples, oranges, kiwi, and pomegranate seeds, tossed with warm spices and citrus for a sweet-tangy finish", price: 14900, category: "Snacks", image: "https://plus.unsplash.com/premium_photo-1671379082571-8cd0c149ca6d?auto=format&fit=crop&w=600&q=80", popular: true, available: true },
  { id: 2, name: "Peanut Chaat Mix", description: "Mix of boiled peanuts, chopped onions, tomatoes, green chilies, fresh coriander, and tangy lemon juice", price: 9900, category: "Snacks", image: "https://plus.unsplash.com/premium_photo-1670601439686-393115cdf96c?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 3, name: "Flavoured Makhana Chaat", description: "Mix of crunchy roasted makhana, chopped onions, tomatoes, fresh coriander, and a squeeze of lemon juice", price: 12900, category: "Snacks", image: "https://plus.unsplash.com/premium_photo-1681826559827-18ccd567378d?auto=format&fit=crop&w=600&q=80", popular: true, available: true },
  { id: 4, name: "Sprouts", description: "Mix of sprouted green gram, chickpeas, colorful bell peppers, pomegranate seeds, fresh coriander, and tangy lime wedges", price: 11900, category: "Breakfast", image: "https://plus.unsplash.com/premium_photo-1675660355510-44122d100dcc?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 5, name: "Paneer Veg Mix", description: "Mix of golden-seared paneer cubes, sautéed bell peppers, and onions tossed in a rich, spiced tomato masala and finished with fresh coriander", price: 19900, category: "Meals", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80", popular: true, available: true },
  { id: 6, name: "Sweet Patato Chaat", description: "Mix of boiled sweet potato cubes, tossed with aromatic spices, fresh coriander, and tangy lime juice", price: 13900, category: "Snacks", image: "https://plus.unsplash.com/premium_photo-1711593312388-79ca13a7b054?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 7, name: "Eggs", description: "Classic Boiled, Creamy Scrambled, Signature Omelette, Artisan Poached, Lean Egg Whites", price: 10900, category: "Breakfast", image: "https://plus.unsplash.com/premium_photo-1725619406988-39c07d9c4472?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 8, name: "Sweet Corn", description: "Mix of steamed golden corn kernels, finely chopped onions, tomatoes, and green chilies, finished with fresh coriander and a zesty lemon squeeze", price: 11900, category: "Snacks", image: "https://plus.unsplash.com/premium_photo-1705934838466-819bbd18a0b6?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 9, name: "Soups (Veg & Non-Veg)", description: "Your choice of Vegetable or Chicken, nutrient-rich broth packed with seasonal diced vegetables, sweet corn, and a hint of cracked black pepper", price: 14900, category: "Meals", image: "https://plus.unsplash.com/premium_photo-1734119809424-51121a88d6e6?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 10, name: "Strawberry Chocolate Dip", description: "Fresh, succulent strawberries hand-dipped in rich, velvety melted chocolate for the perfect balance of fruity sweetness and decadent cocoa", price: 19900, category: "Desserts", image: "https://plus.unsplash.com/premium_photo-1667543228378-ec4478ab2845?auto=format&fit=crop&w=600&q=80", popular: true, available: true },
  { id: 11, name: "Juices", description: "A vibrant selection of 100% natural, freshly squeezed juices made from a variety of tropical fruits, chilled to perfection and served without added sugar for a nutrient-packed experience", price: 12900, category: "Drinks", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80", popular: true, available: true },
];

export function useMenu() {
  return useQuery({
    queryKey: ["/api/menu"],
    queryFn: async () => MOCK_MENU,
  });
}

export function useMenuItem(id: number) {
  return useQuery({
    queryKey: ["/api/menu", id],
    queryFn: async () => {
      const item = MOCK_MENU.find(m => m.id === id);
      if (!item) throw new Error("Menu item not found");
      return item;
    },
    enabled: !!id && !isNaN(id),
  });
}
