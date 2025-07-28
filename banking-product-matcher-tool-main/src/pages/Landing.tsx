import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Zap, CreditCard, Home, Car } from "lucide-react";
import { Login } from "@/components/auth/Login";
import { Signup } from "@/components/auth/Signup";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }} />;
  }

  if (showSignup) {
    return <Signup onBack={() => setShowSignup(false)} onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Find Your Perfect
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Financial Match</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get personalized recommendations for credit cards, loans, and banking products 
              based on your unique financial profile. Compare rates and find the best deals.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="financial" size="xl" onClick={() => setShowSignup(true)}>
              Get Started Free
            </Button>
            <Button variant="outline" size="xl" onClick={() => setShowLogin(true)}>
              Sign In
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-card hover:shadow-float transition-all duration-300">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your financial data is encrypted and never shared without permission
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-float transition-all duration-300">
              <CardHeader className="text-center">
                <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  AI-powered algorithm matches you with products you're likely to qualify for
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-float transition-all duration-300">
              <CardHeader className="text-center">
                <Zap className="w-12 h-12 text-warning mx-auto mb-4" />
                <CardTitle>Instant Results</CardTitle>
                <CardDescription>
                  Get personalized recommendations in seconds, not hours
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-6 py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Find the Right Products for You
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <CreditCard className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Credit Cards</h3>
              <p className="text-muted-foreground">Cashback, travel rewards, and low APR options</p>
            </div>

            <div className="text-center p-6">
              <Home className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mortgages</h3>
              <p className="text-muted-foreground">Home loans with competitive rates</p>
            </div>

            <div className="text-center p-6">
              <Car className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Auto Loans</h3>
              <p className="text-muted-foreground">New and used car financing options</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;