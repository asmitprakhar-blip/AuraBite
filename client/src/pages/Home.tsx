import { Link } from "wouter";
import { ArrowRight, Star, Clock, Truck, ShieldCheck, Quote, Tag, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { useMenu } from "@/hooks/use-menu";
import { MenuCard } from "@/components/MenuCard";

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
    popular: true,
  },
  {
    id: "mega",
    name: "Mega Plan",
    price: 5999,
    period: "30 days",
    meals: ["Breakfast", "Lunch", "Dinner"],
  }
];

const offers = [
  {
    id: 1,
    title: "Free Delivery",
    subtitle: "Above ₹499",
    code: "FREEDEL",
    bgColor: "bg-green-500",
  },
  {
    id: 2,
    title: "₹75 Cashback",
    subtitle: "On first order",
    code: "CASH75",
    bgColor: "bg-orange-500",
  },
  {
    id: 3,
    title: "20% OFF",
    subtitle: "On Subscriptions",
    code: "SUB20",
    bgColor: "bg-purple-500",
  }
];

export default function Home() {
  const { data: menuItems } = useMenu();
  const featuredItems = menuItems?.filter(item => item.popular).slice(0, 3) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide uppercase">Now Delivering in Your City</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight text-slate-900">
              Exquisite <span className="text-primary">Flavors</span> <br />
              Delivered to You
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Experience culinary excellence at your doorstep. Premium ingredients, expert chefs, and swift delivery combine to bring you an unforgettable dining experience.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/menu">
                <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                  Explore Menu <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/reviews">
                <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-sm">
                  Read Reviews
                </button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
               <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" 
                alt="Featured Burger" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Premium Quality</div>
                  <div className="text-xs text-slate-500">Certified Ingredients</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bestsellers You'll Love */}
      <section className="py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4 text-slate-900">Bestsellers You'll Love</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Discover our most loved dishes, crafted with passion and delivered with care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu">
              <button className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300">
                View Full Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold font-display text-slate-900">Subscription Plans</h2>
              <p className="text-slate-500 mt-1">Monthly meal plans tailored for you</p>
            </div>
            <Link href="/subscriptions">
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                See All Plans <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl p-6 border hover:border-primary/50 hover:shadow-lg transition-all relative ${
                  plan.popular ? "border-primary ring-2 ring-primary/20" : "border-slate-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h4 className="font-bold text-slate-900 mb-1 text-lg">{plan.name}</h4>
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
                  <button className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all">
                    View Plan
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-display text-slate-900">Special Offers</h2>
            <p className="text-slate-500 mt-1">Grab these exclusive deals today</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`${offer.bgColor} text-white rounded-2xl p-6 min-w-[220px] shadow-lg`}
              >
                <Tag className="w-8 h-8 mb-3" />
                <div className="font-bold text-xl">{offer.title}</div>
                <div className="text-sm opacity-90">{offer.subtitle}</div>
                <div className="mt-3 text-xs font-mono bg-white/20 px-3 py-1.5 rounded inline-block">
                  Use {offer.code}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Fast Delivery", desc: "Under 30 minutes or it's free." },
              { icon: ShieldCheck, title: "Quality Food", desc: "100% fresh ingredients daily." },
              { icon: Truck, title: "Easy Tracking", desc: "Live GPS tracking for your order." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Customers", value: "50K+" },
              { label: "Menu Items", value: "200+" },
              { label: "Average Rating", value: "4.9" },
              { label: "Avg Delivery", value: "30min" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-3xl font-bold text-slate-900 font-display">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold font-display text-center mb-16 text-slate-900">Customer Love</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Priya S.", role: "Loyal Customer", review: "AuraBite has transformed my meal prep routine! Fresh, delicious, and delivered on time every single day." },
              { name: "Rahul M.", role: "Food Enthusiast", review: "The subscription plan is worth every rupee. Quality ingredients and amazing variety in the menu." },
              { name: "Ananya K.", role: "Working Professional", review: "Best decision I made this year. No more skipping meals or ordering junk food!" }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 mb-6 italic">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{testimonial.name}</h4>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
