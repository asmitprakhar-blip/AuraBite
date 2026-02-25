import { MenuItem } from "@shared/schema";
import { Link } from "wouter";
import { ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";

export function MenuCard({ item }: { item: MenuItem }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white md:bg-card rounded-2xl overflow-hidden border border-slate-100 md:border-border/50 md:hover:border-primary/50 shadow-sm md:shadow-none md:hover:shadow-2xl md:hover:shadow-primary/5 transition-all group w-full flex flex-row md:flex-col p-3 md:p-0 gap-3 md:gap-0 md:aspect-square"
    >
      {/* Content Side (Left on Mobile, Bottom on Desktop) */}
      <div className="flex-1 flex flex-col order-1 md:order-2 md:p-3 md:h-[55%] overflow-hidden">
        {item.popular && (
          <div className="md:hidden flex items-center mb-1.5">
            <span className="text-primary font-bold text-[10px] flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-md">
              <Star className="w-2.5 h-2.5 fill-current" /> Bestseller
            </span>
          </div>
        )}

        <div className="hidden md:flex items-center gap-1 text-primary mb-1">
          <Star className="w-3 h-3 fill-current" />
          <span className="text-[10px] font-bold text-green-950">4.9 (2.3k reviews)</span>
        </div>

        <h3 className="text-[15px] leading-tight md:text-[14px] lg:text-[15px] font-bold font-display text-slate-800 md:text-green-950 md:group-hover:text-primary transition-colors mb-0.5 line-clamp-2">
          {item.name}
        </h3>

        <div className="font-bold text-[14px] md:text-base text-slate-800 mb-1 md:hidden">
          ₹{item.price}
        </div>

        <p className="text-slate-500 text-[11px] md:text-[10px] lg:text-[11px] leading-tight mb-3 md:mb-1.5 line-clamp-2 md:line-clamp-2 pt-0.5 md:pt-0">
          {item.description}
        </p>

        <div className="hidden md:flex items-center justify-between gap-2 mt-auto">
          <Link href={`/menu/${item.id}`} className="flex-1">
            <button className="w-full py-1.5 rounded-xl bg-green-900 text-white font-semibold text-xs hover:bg-green-800 transition-all shadow-lg shadow-stone-200">
              Customise
            </button>
          </Link>
          <button
            onClick={() => addToCart(item, 1)}
            className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Side (Right on Mobile, Top on Desktop) */}
      <div className="relative w-[130px] md:w-full shrink-0 order-2 md:order-1 md:h-[45%]">
        {item.popular && (
          <div className="hidden md:block absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Best Seller
          </div>
        )}
        <div className="hidden md:block absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-slate-100">
          ₹{item.price}
        </div>

        <div className="w-full h-[100px] md:h-full rounded-xl md:rounded-none md:rounded-t-2xl overflow-hidden relative shadow-sm md:shadow-none bg-slate-100 flex items-center justify-center">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">No Image</span>
            </div>
          )}
        </div>

        {/* Mobile ADD Button inside Image Column */}
        <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[85%] flex flex-col items-center">
          <button
            onClick={(e) => { e.preventDefault(); addToCart(item, 1); }}
            className="w-full bg-white text-primary border border-slate-200 shadow-md font-extrabold text-[13px] py-1.5 rounded-xl active:scale-95 transition-all text-center flex items-center justify-center uppercase hover:bg-slate-50 relative overflow-hidden"
          >
            ADD
            <span className="absolute top-0 right-0 p-0.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div></span>
          </button>
          <p className="text-[8px] text-slate-500 mt-0.5 tracking-wider bg-white/70 backdrop-blur-sm px-1 rounded">CUSTOMISABLE</p>
        </div>
      </div>
    </motion.div>
  );
}
