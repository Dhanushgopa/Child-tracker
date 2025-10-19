import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-wide">WHO Certified Standards</span>
        </div>
        
        <h2 className="text-6xl font-bold mb-4">
          <span className="text-foreground">Child Growth</span>
          <br />
          <span className="text-primary">Analytics Platform</span>
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Advanced pediatric growth assessment system powered by WHO growth standards. 
          Precision analytics for healthcare professionals and medical institutions.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/assessment" className="btn">
            Get Started
          </Link>
          <button className="btn">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;