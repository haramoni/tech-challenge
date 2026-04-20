import { Briefcase, Building, ShoppingCart, TrendingUp, Utensils, Zap } from "lucide-react";

  export const getIcon = (name: string) => {
    const props = { className: "w-5 h-5 text-muted" };

    switch (name) {
      case "shopping":
        return <ShoppingCart {...props} />;
      case "briefcase":
        return <Briefcase {...props} className="w-5 h-5 text-brand" />;
      case "utensils":
        return <Utensils {...props} />;
      case "building":
        return <Building {...props} />;
      case "trending":
        return <TrendingUp {...props} className="w-5 h-5 text-brand" />;
      default:
        return <Zap {...props} />;
    }
  };