import { useCart } from "@/hooks/use-cart";
import { useCreateOrder } from "@/hooks/use-orders";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrderSchema } from "@shared/schema";
import { useLocation } from "wouter";
import { Loader2, CreditCard, Banknote, QrCode } from "lucide-react";
import { z } from "zod";

const checkoutFormSchema = insertOrderSchema.pick({
  customerName: true,
  email: true,
  phone: true,
  address: true,
  total: true,
});

type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { mutate, isPending } = useCreateOrder();
  const [, setLocation] = useLocation();

  const deliveryFee = 4900; // ₹49 in paise
  const total = cartTotal + deliveryFee;

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      total,
    }
  });

  const onSubmit = (data: CheckoutFormData) => {
    mutate({
      ...data,
      total,
      items: items.map(i => ({
        menuItemId: i.menuItemId,
        quantity: i.quantity,
        name: i.name,
        price: i.price,
        customizations: i.customizations
      }))
    }, {
      onSuccess: () => {
        clearCart();
        setLocation("/order-success");
      }
    });
  };

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold font-display mb-8 text-slate-900">Checkout</h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Contact Details</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input 
                    {...form.register("customerName")}
                    className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-slate-900"
                    placeholder="Your name"
                  />
                  {form.formState.errors.customerName && <p className="text-red-500 text-xs">{form.formState.errors.customerName.message}</p>}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <input 
                      {...form.register("email")}
                      type="email"
                      className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-slate-900"
                      placeholder="your@email.com"
                    />
                    {form.formState.errors.email && <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone</label>
                    <input 
                      {...form.register("phone")}
                      className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-slate-900"
                      placeholder="+91 9XXXXXXXXX"
                    />
                    {form.formState.errors.phone && <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Delivery Address</h2>
              <div className="space-y-2">
                <textarea 
                  {...form.register("address")}
                  className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px] text-slate-900"
                  placeholder="Enter your full delivery address..."
                />
                {form.formState.errors.address && <p className="text-red-500 text-xs">{form.formState.errors.address.message}</p>}
              </div>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
              <div className="grid grid-cols-3 gap-4">
                <label className="cursor-pointer">
                  <input type="radio" name="payment" className="peer sr-only" defaultChecked />
                  <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all text-slate-600">
                    <CreditCard className="w-6 h-6" />
                    <span className="text-xs font-bold">Card</span>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="payment" className="peer sr-only" />
                  <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all text-slate-600">
                    <QrCode className="w-6 h-6" />
                    <span className="text-xs font-bold">UPI</span>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="payment" className="peer sr-only" />
                  <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all text-slate-600">
                    <Banknote className="w-6 h-6" />
                    <span className="text-xs font-bold">Cash</span>
                  </div>
                </label>
              </div>
            </section>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-slate-200">
            <div>
              <p className="text-slate-500 text-sm">Total Amount</p>
              <p className="text-3xl font-bold text-primary">₹{(total / 100).toFixed(0)}</p>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </div>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
