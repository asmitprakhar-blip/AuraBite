import { useParams, useLocation } from "wouter";
import { useMenuItem } from "@/hooks/use-menu";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { Loader2, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

const ADD_ONS = [
  { id: "chaat-masala", name: "Extra Chaat Masala", price: 20 },  // ₹20
  { id: "pomegranate", name: "Fresh Pomegranate", price: 40 },   // ₹40
  { id: "sev", name: "Crispy Sev Topping", price: 25 },        // ₹25
  { id: "mint-chutney", name: "Mint Chutney", price: 30 },      // ₹30
  { id: "tamarind", name: "Tamarind Chutney", price: 30 },      // ₹30
  { id: "curd", name: "Fresh Curd/Yogurt", price: 35 },         // ₹35
];

export default function CustomizeMeal() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { data: item, isLoading } = useMenuItem(Number(id));
  const { addToCart } = useCart();

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-primary" /></div>;
  if (!item) return <div className="h-screen flex items-center justify-center text-slate-900">Item not found</div>;

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon) ? prev.filter(x => x !== addon) : [...prev, addon]
    );
  };

  const totalPrice = item.price + selectedAddons.reduce((sum, id) => {
    const addon = ADD_ONS.find(a => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);

  const handleAddToCart = () => {
    const customizations = selectedAddons.map(id => ADD_ONS.find(a => a.id === id)?.name || "");
    addToCart(item, quantity, customizations);
    setLocation("/menu");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden aspect-square h-fit sticky top-24 shadow-2xl"
          >
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold font-display mb-2 text-slate-900">{item.name}</h1>
              <p className="text-slate-600 text-lg leading-relaxed">{item.description}</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold font-display text-slate-900">Customize Your Order</h3>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Add-ons</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ADD_ONS.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${selectedAddons.includes(addon.id)
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                    >
                      <span className="font-medium">{addon.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">+₹{addon.price}</span>
                        {selectedAddons.includes(addon.id) && <Check className="w-4 h-4" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">Quantity</span>
                  <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-900 font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold w-4 text-center text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-900 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-2xl font-bold">
                  <span className="text-slate-900">Total</span>
                  <span className="text-primary">₹{(totalPrice * quantity)}</span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all active:scale-[0.98]"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
