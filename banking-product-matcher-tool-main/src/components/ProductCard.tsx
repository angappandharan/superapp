import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Home, Car, Banknote, Building2 } from "lucide-react";

interface FinancialProduct {
  id: string;
  name: string;
  provider: string;
  type: "credit-card" | "mortgage" | "auto-loan" | "personal-loan" | "checking";
  apr: string;
  features: string[];
  matchScore: number;
  description: string;
}

interface ProductCardProps {
  product: FinancialProduct;
  onApply?: () => void;
}

export const ProductCard = ({ product, onApply }: ProductCardProps) => {
  const getIcon = () => {
    switch (product.type) {
      case "credit-card":
        return <CreditCard className="w-6 h-6" />;
      case "mortgage":
        return <Home className="w-6 h-6" />;
      case "auto-loan":
        return <Car className="w-6 h-6" />;
      case "personal-loan":
        return <Banknote className="w-6 h-6" />;
      case "checking":
        return <Building2 className="w-6 h-6" />;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-success text-success-foreground";
    if (score >= 80) return "bg-secondary text-secondary-foreground";
    if (score >= 70) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const getTypeLabel = () => {
    switch (product.type) {
      case "credit-card":
        return "Credit Card";
      case "mortgage":
        return "Mortgage";
      case "auto-loan":
        return "Auto Loan";
      case "personal-loan":
        return "Personal Loan";
      case "checking":
        return "Checking Account";
      default:
        return "Financial Product";
    }
  };

  return (
    <Card className="shadow-card hover:shadow-float transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {getIcon()}
            </div>
            <div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.provider} • {getTypeLabel()}</CardDescription>
            </div>
          </div>
          <Badge className={getScoreColor(product.matchScore)}>
            {product.matchScore}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {product.type === "checking" ? "APY" : "APR"}:
            </span>
            <span className="text-lg font-bold text-primary">{product.apr}</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Key Features:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="financial" className="flex-1" onClick={onApply}>
            Apply Now
          </Button>
          <Button variant="outline">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};