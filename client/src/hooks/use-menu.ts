import { useQuery } from "@tanstack/react-query";
import { type MenuItem } from "@shared/schema";

const MOCK_MENU: MenuItem[] = [
  { id: 1, name: "Aura Classic Burger", description: "Juicy beef patty with signature aura sauce.", price: 1299, category: "Meals", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", popular: true, available: true },
  { id: 2, name: "Spicy Chicken Wrap", description: "Crispy chicken with spicy mayo.", price: 999, category: "Meals", image: "https://images.unsplash.com/photo-1626804475297-41609ea1dcbd", popular: false, available: true },
  { id: 3, name: "Truffle Fries", description: "Crispy fries tossed in truffle oil and parmesan.", price: 699, category: "Snacks", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f", popular: true, available: true },
  { id: 4, name: "Aura Morning Bowl", description: "A healthy mix of grains, eggs, and fresh veggies.", price: 1199, category: "Breakfast", image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2", popular: false, available: true },
  { id: 5, name: "Tropical Smoothie", description: "Mango, pineapple, and passionfruit.", price: 599, category: "Drinks", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625", popular: true, available: true },
  { id: 6, name: "Double Cheese Pizza", description: "Hand-tossed crust with double mozzarella.", price: 1599, category: "Meals", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591", popular: true, available: true },
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
