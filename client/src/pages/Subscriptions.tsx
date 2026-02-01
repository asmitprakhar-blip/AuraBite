import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const subscriptionPlans = [
  {
    id: "dinner-only",
    name: "Dinner Plan",
    price: 2499,
    period: "30 days",
    description: "Dinner Only",
    meals: ["Dinner"],
    features: [
      "Daily dinner delivery",
      "Chef-curated menu",
      "Free delivery",
      "Skip/pause anytime"
    ],
    popular: false,
    color: "bg-slate-100"
  },
  {
    id: "lunch-dinner",
    name: "Lunch + Dinner",
    price: 3999,
    period: "30 days",
    description: "Lunch & Dinner",
    meals: ["Lunch", "Dinner"],
    features: [
      "Daily lunch & dinner",
      "Premium ingredients",
      "Free delivery",
      "Skip/pause anytime",
      "Weekly menu variety"
    ],
    popular: true,
    color: "bg-primary/10"
  },
  {
    id: "lunch-only",
    name: "Lunch Plan",
    price: 2299,
    period: "30 days",
    description: "Lunch Only",
    meals: ["Lunch"],
    features: [
      "Daily lunch delivery",
      "Office-friendly packaging",
      "Free delivery",
      "Skip/pause anytime"
    ],
    popular: false,
    color: "bg-slate-100"
  },
  {
    id: "mega-plan",
    name: "Mega Plan",
    price: 5999,
    period: "30 days",
    description: "Breakfast + Lunch + Dinner",
    meals: ["Breakfast", "Lunch", "Dinner"],
    features: [
      "All 3 meals daily",
      "Premium chef menu",
      "Priority delivery",
      "Free delivery",
      "Skip/pause anytime",
      "Exclusive recipes",
      "Nutritionist support"
    ],
    popular: false,
    color: "bg-gradient-to-br from-amber-50 to-orange-50"
  }
];

export default function Subscriptions() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900">
            Subscription Plans
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Choose a meal plan that fits your lifestyle. Fresh, delicious meals delivered daily to your doorstep.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border border-slate-200 overflow-hidden ${plan.color} ${
                plan.popular ? "ring-2 ring-primary shadow-xl" : "shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-xs font-bold uppercase">
                  Most Popular
                </div>
              )}
              
              <div className={`p-6 ${plan.popular ? "pt-10" : ""}`}>
                <h3 className="text-xl font-bold text-slate-900 font-display mb-1">
                  {plan.name}
                </h3>
                
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-primary">₹{plan.price.toLocaleString()}</span>
                  <span className="text-slate-500 text-sm">/{plan.period}</span>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{plan.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {plan.meals.map((meal) => (
                    <span
                      key={meal}
                      className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700 border border-slate-200"
                    >
                      {meal}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/checkout">
                  <button className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                    View Plan <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-orange-50 rounded-2xl p-8 text-center border border-primary/10">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Need a Custom Plan?</h3>
          <p className="text-slate-600 mb-4">
            Contact us for corporate meal plans, special dietary requirements, or custom schedules.
          </p>
          <Link href="/contact">
            <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
