import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Apple, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Child Health Analytics</h1>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Empowering parents with WHO growth standards and nutrition tracking for optimal child development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/assessment" className="btn">
                Start Growth Assessment
              </Link>
              <Link to="/food-log" className="btn">
                Log Today's Food
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Features</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive tools to monitor and support your child's growth and nutrition
              </p>
            </div>

            <div className="features-grid">
              <div className="card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Growth Assessment</CardTitle>
                  <CardDescription>
                    Analyze your child's growth using WHO standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/assessment" className="btn">
                    Assess Growth
                  </Link>
                </CardContent>
              </div>

              <div className="card">
                <CardHeader>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                    <Apple className="w-6 h-6 text-success" />
                  </div>
                  <CardTitle>Food Logging</CardTitle>
                  <CardDescription>
                    Track daily nutrition intake and eating habits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/food-log" className="btn">
                    Log Food
                  </Link>
                </CardContent>
              </div>

              <div className="card">
                <CardHeader>
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-warning" />
                  </div>
                  <CardTitle>Growth Tracking</CardTitle>
                  <CardDescription>
                    Monitor progress over time with detailed analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <button className="btn" disabled>
                    View Analytics
                  </button>
                </CardContent>
              </div>

              <div className="card">
                <CardHeader>
                  <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-info" />
                  </div>
                  <CardTitle>History & Reports</CardTitle>
                  <CardDescription>
                    Access past assessments and generate reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/history" className="btn">
                    View History
                  </Link>
                </CardContent>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our Platform</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Trusted by parents and healthcare professionals worldwide
              </p>
            </div>

            <div className="features-grid">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">WHO Standards</h3>
                <p className="text-muted-foreground">
                  Based on the World Health Organization's growth standards for accurate assessment
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Apple className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Nutrition Tracking</h3>
                <p className="text-muted-foreground">
                  Comprehensive food logging to ensure your child gets proper nutrition
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-warning" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Detailed Reports</h3>
                <p className="text-muted-foreground">
                  Generate and save detailed growth reports for healthcare consultations
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;