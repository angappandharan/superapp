import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft } from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    income: "",
    address: "",
    creditScore: "",
    employmentStatus: ""
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!localStorage.getItem("isAuthenticated")) {
      window.location.href = "/";
    }
  }, []);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      localStorage.setItem("userProfile", JSON.stringify(formData));
      localStorage.setItem("onboardingComplete", "true");
      window.location.href = "/dashboard";
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.income && formData.employmentStatus;
      case 2:
        return formData.address;
      case 3:
        return formData.creditScore;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Tell us about yourself</h1>
            <span className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-float">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Income & Employment"}
              {step === 2 && "Address Information"}
              {step === 3 && "Credit Profile"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Help us understand your financial situation"}
              {step === 2 && "We need your location for local offers"}
              {step === 3 && "This helps us find the best matches"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income</Label>
                  <Select value={formData.income} onValueChange={(value) => updateFormData("income", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-25k">Under $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                      <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                      <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                      <SelectItem value="over-150k">Over $150,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employment">Employment Status</Label>
                  <Select value={formData.employmentStatus} onValueChange={(value) => updateFormData("employmentStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time Employee</SelectItem>
                      <SelectItem value="part-time">Part-time Employee</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-2">
                <Label htmlFor="address">Home Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main St, City, State 12345"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  required
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-2">
                <Label htmlFor="creditScore">Estimated Credit Score</Label>
                <Select value={formData.creditScore} onValueChange={(value) => updateFormData("creditScore", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your estimated credit score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor (300-579)</SelectItem>
                    <SelectItem value="fair">Fair (580-669)</SelectItem>
                    <SelectItem value="good">Good (670-739)</SelectItem>
                    <SelectItem value="very-good">Very Good (740-799)</SelectItem>
                    <SelectItem value="excellent">Excellent (800-850)</SelectItem>
                    <SelectItem value="unsure">I'm not sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button 
                variant="financial" 
                onClick={handleNext}
                disabled={!isStepValid()}
                className={step === 1 ? "ml-auto" : ""}
              >
                {step === totalSteps ? "Complete" : "Next"}
                {step < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;