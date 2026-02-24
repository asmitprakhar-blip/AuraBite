import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const deliveryFee = 49; // ₹49
  const total = cartTotal + (items.length > 0 ? deliveryFee : 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 bg-white">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold font-display mb-2 text-slate-900">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/menu">
          <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Browse Menu
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold font-display mb-6 sm:mb-8 text-slate-900">Your Order</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.menuItemId}-${item.customizations?.join('')}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex gap-4"
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-slate-200 shrink-0" />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                        <span className="font-semibold text-primary">₹{(item.price * item.quantity)}</span>
                      </div>
                      {item.customizations && item.customizations.length > 0 && (
                        <p className="text-sm text-slate-500 mt-1">
                          + {item.customizations.join(", ")}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.menuItemId, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-900 font-bold"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-6 text-center text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.menuItemId, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-900 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.menuItemId)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold font-display mb-6 text-slate-900">Order Summary</h3>

              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between text-lg font-bold">
                  <span className="text-slate-900">Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
