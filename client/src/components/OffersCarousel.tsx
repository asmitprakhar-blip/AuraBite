import { useEffect, useState } from "react";
import { ArrowRight, Tag, Truck, Gift } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const offers = [
  {
    id: 1,
    title: "Free Delivery",
    subtitle: "Above ₹499",
    code: "FREEDEL",
    icon: Truck,
    bgColor: "bg-green-500",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "₹75 Cashback",
    subtitle: "On first order",
    code: "CASH75",
    icon: Gift,
    bgColor: "bg-emerald-500",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "20% OFF",
    subtitle: "On Subscriptions",
    code: "SUB20",
    icon: Tag,
    bgColor: "bg-teal-500",
    textColor: "text-white"
  }
];

const subscriptionPlans = [
  {
    id: "lunch",
    name: "Lunch Plan",
    price: 2299,
    period: "30 days",
    meals: ["Lunch Only"],
  },
  {
    id: "dinner",
    name: "Dinner Plan",
    price: 2499,
    period: "30 days",
    meals: ["Dinner Only"],
  },
  {
    id: "lunch-dinner",
    name: "Lunch + Dinner",
    price: 3999,
    period: "30 days",
    meals: ["Lunch", "Dinner"],
  },
  {
    id: "mega",
    name: "Mega Plan",
    price: 5999,
    period: "30 days",
    meals: ["Breakfast", "Lunch", "Dinner"],
  }
];

export function OffersCarousel() {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-secondary border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Offers Carousel */}
        <div className="mb-10">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <AnimatePresence mode="wait">
              {offers.map((offer, idx) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${offer.bgColor} ${offer.textColor} rounded-2xl p-5 min-w-[200px] flex-shrink-0 shadow-lg`}
                >
                  <offer.icon className="w-8 h-8 mb-3" />
                  <div className="font-bold text-lg">{offer.title}</div>
                  <div className="text-sm opacity-90">{offer.subtitle}</div>
                  <div className="mt-2 text-xs font-mono bg-white/20 px-2 py-1 rounded inline-block">
                    Use {offer.code}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Subscription Plans */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold font-display text-slate-900">Subscription Plans</h3>
              <p className="text-slate-500 text-sm">Monthly meal plans for you</p>
            </div>
            <Link href="/subscriptions">
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                See All <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <h4 className="font-bold text-slate-900 mb-1">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-primary">₹{plan.price.toLocaleString()}</span>
                  <span className="text-slate-500 text-sm">/{plan.period}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {plan.meals.map((meal) => (
                    <span
                      key={meal}
                      className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600"
                    >
                      {meal}
                    </span>
                  ))}
                </div>
                <Link href="/subscriptions">
                  <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                    View Plan <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
