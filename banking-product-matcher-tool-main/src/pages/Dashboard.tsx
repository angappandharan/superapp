import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Home, Car, Banknote, LogOut, User } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

interface UserProfile {
  income: string;
  address: string;
  creditScore: string;
  employmentStatus: string;
}

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

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userName] = useState(localStorage.getItem("userName") || "User");
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FinancialProduct | null>(null);
  const [applicationData, setApplicationData] = useState({
    homePrice: "",
    homeValue: "",
    loanRemaining: "",
    carAmount: "",
    personalLoanAmount: "",
    monthlyIncome: ""
  });

  useEffect(() => {
    // Check if user is authenticated and has completed onboarding
    if (!localStorage.getItem("isAuthenticated") || !localStorage.getItem("onboardingComplete")) {
      window.location.href = "/";
      return;
    }

    const profile = localStorage.getItem("userProfile");
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleApplyNow = (product: FinancialProduct) => {
    setSelectedProduct(product);
    setIsApplicationDialogOpen(true);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the application data to a backend
    console.log("Application submitted:", {
      product: selectedProduct,
      applicationData
    });
    setIsApplicationDialogOpen(false);
    setApplicationData({
      homePrice: "",
      homeValue: "",
      loanRemaining: "",
      carAmount: "",
      personalLoanAmount: "",
      monthlyIncome: ""
    });
  };

  const getDialogContent = () => {
    if (!selectedProduct) return null;

    switch (selectedProduct.type) {
      case "mortgage":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="homePrice">Home Price</Label>
              <Input
                id="homePrice"
                type="number"
                placeholder="$500,000"
                value={applicationData.homePrice}
                onChange={(e) => setApplicationData(prev => ({ ...prev, homePrice: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="homeValue">Current Home Value (if refinancing)</Label>
              <Input
                id="homeValue"
                type="number"
                placeholder="$450,000"
                value={applicationData.homeValue}
                onChange={(e) => setApplicationData(prev => ({ ...prev, homeValue: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="loanRemaining">Remaining Loan Amount (if refinancing)</Label>
              <Input
                id="loanRemaining"
                type="number"
                placeholder="$300,000"
                value={applicationData.loanRemaining}
                onChange={(e) => setApplicationData(prev => ({ ...prev, loanRemaining: e.target.value }))}
              />
            </div>
          </div>
        );
      
      case "auto-loan":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="carAmount">Car Purchase Amount</Label>
              <Input
                id="carAmount"
                type="number"
                placeholder="$35,000"
                value={applicationData.carAmount}
                onChange={(e) => setApplicationData(prev => ({ ...prev, carAmount: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="loanRemaining">Remaining Loan Amount (if refinancing)</Label>
              <Input
                id="loanRemaining"
                type="number"
                placeholder="$20,000"
                value={applicationData.loanRemaining}
                onChange={(e) => setApplicationData(prev => ({ ...prev, loanRemaining: e.target.value }))}
              />
            </div>
          </div>
        );
      
      case "personal-loan":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="personalLoanAmount">How much do you need?</Label>
              <Input
                id="personalLoanAmount"
                type="number"
                placeholder="$15,000"
                value={applicationData.personalLoanAmount}
                onChange={(e) => setApplicationData(prev => ({ ...prev, personalLoanAmount: e.target.value }))}
              />
            </div>
          </div>
        );
      
      case "checking":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyIncome">Monthly Income</Label>
              <Input
                id="monthlyIncome"
                type="number"
                placeholder="$5,000"
                value={applicationData.monthlyIncome}
                onChange={(e) => setApplicationData(prev => ({ ...prev, monthlyIncome: e.target.value }))}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Credit card recommendations based on credit score
  const getCreditCardsByScore = (creditScore: string): FinancialProduct[] => {
    switch (creditScore) {
      case "poor":
        return [
          {
            id: "cc-discover-secured",
            name: "Discover it® Secured",
            provider: "Discover",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 2% cash back (gas & dining)",
              "🔹 1% on everything else",
              "🔹 Matches all cashback Year 1",
              "🔹 Can upgrade to unsecured"
            ],
            matchScore: 95,
            description: "🔴 Best for poor/no credit - Build credit while earning rewards"
          },
          {
            id: "cc-capital-secured",
            name: "Capital One Platinum Secured",
            provider: "Capital One",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 Starts with $49–$200 refundable deposit",
              "🔹 No foreign transaction fees",
              "🔹 Credit line increase review in 6 months"
            ],
            matchScore: 90,
            description: "🔴 Flexible deposit options for building credit"
          },
          {
            id: "cc-opensky",
            name: "OpenSky® Secured Visa",
            provider: "OpenSky",
            type: "credit-card",
            apr: "$35 Annual Fee",
            features: [
              "🔹 No credit check to apply",
              "🔹 Reports to all 3 bureaus",
              "🔹 Build credit with on-time payments"
            ],
            matchScore: 85,
            description: "🔴 No credit check required - Perfect for rebuilding"
          },
          {
            id: "cc-chime",
            name: "Chime Credit Builder Visa®",
            provider: "Chime",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 No interest, no annual fee",
              "🔹 Can't overspend",
              "🔹 Instant reporting + auto-pay tools"
            ],
            matchScore: 80,
            description: "🔴 Unique no-interest credit building option"
          }
        ];

      case "fair":
        return [
          {
            id: "cc-quicksilver",
            name: "Capital One QuicksilverOne",
            provider: "Capital One",
            type: "credit-card",
            apr: "$39 Annual Fee",
            features: [
              "🔹 1.5% cash back on everything",
              "🔹 Limit increases with good history",
              "🔹 No foreign transaction fees"
            ],
            matchScore: 92,
            description: "🟠 Simple cash back for rebuilding credit"
          },
          {
            id: "cc-petal",
            name: "Petal® 1 Visa",
            provider: "Petal",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 Based on income, not just credit score",
              "🔹 Up to 10% back at select merchants",
              "🔹 No late, annual, or foreign fees"
            ],
            matchScore: 88,
            description: "🟠 Innovative underwriting for fair credit"
          },
          {
            id: "cc-mission-lane",
            name: "Mission Lane® Visa",
            provider: "Mission Lane",
            type: "credit-card",
            apr: "Varies ($0–$59)",
            features: [
              "🔹 Easy to get with fair credit",
              "🔹 Reports to all 3 bureaus",
              "🔹 Limit increases with good payment history"
            ],
            matchScore: 85,
            description: "🟠 Focused on credit rebuilding"
          }
        ];

      case "good":
        return [
          {
            id: "cc-freedom-unlimited",
            name: "Chase Freedom Unlimited®",
            provider: "Chase",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 3% back on dining/drugstores",
              "🔹 1.5% everywhere else",
              "🔹 $200 bonus",
              "🔹 0% APR 15 months",
              "🔹 Can be paired with Sapphire for travel boosts"
            ],
            matchScore: 95,
            description: "🟡 Excellent all-around cash back card"
          },
          {
            id: "cc-double-cash",
            name: "Citi® Double Cash",
            provider: "Citi",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 2% total cash back (1% buy + 1% pay)",
              "🔹 Can convert to ThankYou® points",
              "🔹 18-month balance transfer offer"
            ],
            matchScore: 93,
            description: "🟡 Simple 2% cash back on everything"
          },
          {
            id: "cc-wells-active",
            name: "Wells Fargo Active Cash®",
            provider: "Wells Fargo",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 2% flat cash back",
              "🔹 $200 welcome bonus",
              "🔹 Cell phone protection",
              "🔹 15 months 0% APR"
            ],
            matchScore: 90,
            description: "🟡 Flat 2% rewards with welcome bonus"
          },
          {
            id: "cc-discover-cashback",
            name: "Discover it® Cash Back",
            provider: "Discover",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 5% back on rotating categories (e.g., groceries, gas)",
              "🔹 1% everywhere else",
              "🔹 Cashback match in Year 1",
              "🔹 Free FICO score & ID monitoring"
            ],
            matchScore: 87,
            description: "🟡 Rotating categories with first-year match"
          }
        ];

      case "very-good":
      case "excellent":
        return [
          {
            id: "cc-sapphire-preferred",
            name: "Chase Sapphire Preferred®",
            provider: "Chase",
            type: "credit-card",
            apr: "$95 Annual Fee",
            features: [
              "🔹 2x on dining & travel",
              "🔹 5x on Chase travel",
              "🔹 60K points (~$750 travel)",
              "🔹 Travel insurance & point transfer"
            ],
            matchScore: 95,
            description: "🟢 Premium travel rewards with excellent benefits"
          },
          {
            id: "cc-venture-rewards",
            name: "Capital One Venture Rewards",
            provider: "Capital One",
            type: "credit-card",
            apr: "$95 Annual Fee",
            features: [
              "🔹 2x miles on all purchases",
              "🔹 75K miles bonus",
              "🔹 Can \"erase\" travel purchases",
              "🔹 No foreign transaction fees"
            ],
            matchScore: 93,
            description: "🟢 Simple travel rewards with huge bonus"
          },
          {
            id: "cc-amex-gold",
            name: "Amex Gold Card",
            provider: "American Express",
            type: "credit-card",
            apr: "$250 Annual Fee",
            features: [
              "🔹 4x points on dining/groceries",
              "🔹 $120 dining credit",
              "🔹 $120 Uber Cash",
              "🔹 Airport & concierge perks"
            ],
            matchScore: 90,
            description: "🟢 Premium dining and grocery rewards"
          },
          {
            id: "cc-custom-cash",
            name: "Citi® Custom Cash℠",
            provider: "Citi",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 5% on your top category each month (e.g., gas, dining)",
              "🔹 1% on others",
              "🔹 No rotating or activation needed"
            ],
            matchScore: 88,
            description: "🟢 Automatic 5% in your top category"
          }
        ];

      default:
        // For "unsure" credit score, show a mix of options
        return [
          {
            id: "cc-freedom-unlimited",
            name: "Chase Freedom Unlimited®",
            provider: "Chase",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 3% back on dining/drugstores",
              "🔹 1.5% everywhere else",
              "🔹 $200 bonus"
            ],
            matchScore: 85,
            description: "🟡 Good starter card with solid rewards"
          },
          {
            id: "cc-discover-secured",
            name: "Discover it® Secured",
            provider: "Discover",
            type: "credit-card",
            apr: "$0 Annual Fee",
            features: [
              "🔹 2% cash back (gas & dining)",
              "🔹 1% on everything else",
              "🔹 Matches all cashback Year 1"
            ],
            matchScore: 80,
            description: "🔴 Safe option for building credit"
          }
        ];
    }
  };

  // Banking products based on income level
  const getBankingProducts = (): FinancialProduct[] => {
    const income = userProfile?.income || "";
    const creditScore = userProfile?.creditScore || "";
    
    // High income/wealth accounts
    if (income === "over-150k" || income === "100k-150k") {
      return [
        {
          id: "chase-private",
          name: "Chase Private Client Checking",
          provider: "Chase",
          type: "checking",
          apr: "0.01% APY",
          features: ["🔹 Dedicated advisor", "🔹 ATM reimbursement", "🔹 Lending perks", "🔹 Fee waived with ≥$150K"],
          matchScore: 95,
          description: "🟢 Premium banking for high-net-worth clients"
        },
        {
          id: "hsbc-premier",
          name: "HSBC Premier Checking",
          provider: "HSBC",
          type: "checking",
          apr: "0% APY",
          features: ["🔹 Global banking", "🔹 Fee waivers", "🔹 Mortgage discounts", "🔹 Fee waived with ≥$75K"],
          matchScore: 90,
          description: "🟢 International banking with premium perks"
        },
        {
          id: "amex-savings",
          name: "American Express High-Yield Savings",
          provider: "American Express",
          type: "checking",
          apr: "4.25% APY",
          features: ["🔹 No minimums", "🔹 $0 fees", "🔹 Trusted brand", "🔹 Easy access"],
          matchScore: 88,
          description: "🟢 High-yield savings with premium brand trust"
        }
      ];
    }
    
    // Moderate income/good credit
    if (income === "75k-100k" || income === "50k-75k") {
      return [
        {
          id: "axos-savings",
          name: "Axos Bank High-Yield Savings",
          provider: "Axos Bank",
          type: "checking",
          apr: "4.66% APY",
          features: ["🔹 No minimums", "🔹 Mobile deposits", "🔹 FDIC-insured", "🔹 No fees"],
          matchScore: 95,
          description: "🟠 Top-tier savings rates with no requirements"
        },
        {
          id: "bread-savings",
          name: "Bread Savings High-Yield Account",
          provider: "Bread Savings",
          type: "checking",
          apr: "4.30% APY",
          features: ["🔹 Competitive rates", "🔹 No monthly fees", "🔹 $100 min deposit", "🔹 FDIC-insured"],
          matchScore: 90,
          description: "🟠 Solid high-yield option with low minimums"
        },
        {
          id: "newtek-savings",
          name: "Newtek Bank High-Yield Savings",
          provider: "Newtek Bank",
          type: "checking",
          apr: "4.35% APY",
          features: ["🔹 FDIC-insured", "🔹 Strong digital tools", "🔹 No fees", "🔹 No minimums"],
          matchScore: 88,
          description: "🟠 Great technology with competitive rates"
        }
      ];
    }
    
    // Low income/no credit/rebuilding
    return [
      {
        id: "chime-checking",
        name: "Chime Checking + Savings",
        provider: "Chime",
        type: "checking",
        apr: "4.00% APY",
        features: ["🔹 No credit check", "🔹 Early direct deposit", "🔹 $0 overdraft (SpotMe up to $200)", "🔹 Fee-free ATMs"],
        matchScore: 95,
        description: "🔴 Perfect for building financial foundation"
      },
      {
        id: "varo-savings",
        name: "Varo Bank High-Yield Savings",
        provider: "Varo Bank",
        type: "checking",
        apr: "5.00% APY",
        features: ["🔹 No ChexSystems", "🔹 Early-pay features", "🔹 $0 monthly fees", "🔹 No minimum balance"],
        matchScore: 92,
        description: "🔴 Highest APY with no requirements"
      },
      {
        id: "current-debit",
        name: "Current Safe Debit Account",
        provider: "Current",
        type: "checking",
        apr: "4.00% APY",
        features: ["🔹 Earned wage access", "🔹 Built-in debit card", "🔹 Credit-builder card", "🔹 No credit check"],
        matchScore: 88,
        description: "🔴 Modern banking with wage access"
      },
      {
        id: "wells-clear",
        name: "Wells Fargo Clear Access Banking",
        provider: "Wells Fargo",
        type: "checking",
        apr: "0% APY",
        features: ["🔹 No overdraft fees", "🔹 No ChexSystems", "🔹 FDIC-insured", "🔹 $0 monthly fees"],
        matchScore: 85,
        description: "🔴 Traditional bank with second-chance banking"
      }
    ];
  };

  // Generate product recommendations based on user profile
  const getRecommendedProducts = (): FinancialProduct[] => {
    const creditCards = getCreditCardsByScore(userProfile?.creditScore || "unsure");
    const bankingProducts = getBankingProducts();
    
    const products: FinancialProduct[] = [
      // Credit Cards based on credit score
      ...creditCards,
      
      // Banking products based on income
      ...bankingProducts,
      
      // Mortgages
      {
        id: "mortgage-1",
        name: "30-Year Fixed Mortgage",
        provider: "Wells Fargo",
        type: "mortgage",
        apr: "6.89%",
        features: ["Fixed rate for 30 years", "No PMI with 20% down", "First-time buyer programs"],
        matchScore: userProfile?.income === "over-150k" || userProfile?.income === "100k-150k" ? 88 : 65,
        description: "Stable monthly payments with competitive rates"
      },
      
      // Auto Loans
      {
        id: "auto-1",
        name: "New Car Loan",
        provider: "Bank of America",
        type: "auto-loan",
        apr: "5.99% - 8.99%",
        features: ["Up to 72 months", "No prepayment penalty", "Online pre-approval"],
        matchScore: userProfile?.creditScore === "excellent" ? 92 : userProfile?.creditScore === "very-good" ? 85 : 70,
        description: "Competitive rates for new vehicle purchases"
      },
      
      // Personal Loans
      {
        id: "personal-1",
        name: "Personal Loan",
        provider: "SoFi",
        type: "personal-loan",
        apr: "7.99% - 19.99%",
        features: ["No fees", "Unemployment protection", "Rate discount with autopay"],
        matchScore: userProfile?.creditScore === "excellent" || userProfile?.creditScore === "very-good" ? 87 : 65,
        description: "Consolidate debt or fund major purchases"
      }
    ];

    return products.sort((a, b) => b.matchScore - a.matchScore);
  };

  const products = getRecommendedProducts();
  
  const getProductsByType = (type: string) => {
    return products.filter(p => p.type === type);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-success";
    if (score >= 80) return "bg-secondary";
    if (score >= 70) return "bg-warning";
    return "bg-destructive";
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <User className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold">Welcome back, {userName}!</h1>
              <p className="text-sm text-muted-foreground">Here are your personalized recommendations</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Summary */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle>Your Financial Profile</CardTitle>
            <CardDescription>Based on the information you provided</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Income</p>
                <p className="font-medium">{userProfile.income.replace('-', ' - $').replace('k', ',000')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credit Score</p>
                <p className="font-medium capitalize">{userProfile.creditScore.replace('-', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employment</p>
                <p className="font-medium capitalize">{userProfile.employmentStatus.replace('-', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{userProfile.address.split(',').slice(-2).join(',').trim()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Recommendations */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="credit-card">Credit Cards</TabsTrigger>
            <TabsTrigger value="mortgage">Mortgages</TabsTrigger>
            <TabsTrigger value="auto-loan">Auto Loans</TabsTrigger>
            <TabsTrigger value="personal-loan">Personal Loans</TabsTrigger>
            <TabsTrigger value="checking">Banking</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {products.slice(0, 6).map(product => (
                <ProductCard key={product.id} product={product} onApply={() => handleApplyNow(product)} />
              ))}
            </div>
          </TabsContent>

          {["credit-card", "mortgage", "auto-loan", "personal-loan", "checking"].map(type => (
            <TabsContent key={type} value={type} className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {getProductsByType(type).map(product => (
                  <ProductCard key={product.id} product={product} onApply={() => handleApplyNow(product)} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Application Dialog */}
        <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Apply for {selectedProduct?.name}</DialogTitle>
              <DialogDescription>
                Please provide additional information to complete your application.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleApplicationSubmit} className="space-y-4">
              {getDialogContent()}
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsApplicationDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="financial">
                  Submit Application
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Dashboard;