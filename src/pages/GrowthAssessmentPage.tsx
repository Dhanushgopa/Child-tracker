import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrowthAssessment from "@/components/GrowthAssessment";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import React, { useState } from "react";

const GrowthAssessmentPage = () => {
  const [childName, setChildName] = useState("");
  const [parentName, setParentName] = useState("");
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">Growth Assessment</h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive WHO growth standard analysis
              </p>
            </div>

            <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-lg p-8 border border-border mb-12">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Child Information</h2>
                  <p className="text-sm text-muted-foreground">Please provide the following details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="childName" className="flex items-center gap-2 text-foreground font-medium">
                    <User className="w-4 h-4 text-primary" />
                    Name of the Child
                  </Label>
                  <Input
                    id="childName"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Enter child's name"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentName" className="flex items-center gap-2 text-foreground font-medium">
                    <User className="w-4 h-4 text-primary" />
                    Parent's Name
                  </Label>
                  <Input
                    id="parentName"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Enter parent's name"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="currentDate" className="flex items-center gap-2 text-foreground font-medium">
                    <User className="w-4 h-4 text-primary" />
                    Current Date
                  </Label>
                  <Input
                    id="currentDate"
                    type="date"
                    value={currentDate}
                    readOnly
                    className="bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <GrowthAssessment />
      </main>
      <Footer />
    </div>
  );
};

export default GrowthAssessmentPage;