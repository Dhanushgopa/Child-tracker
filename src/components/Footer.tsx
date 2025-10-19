import { Activity, Shield, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Child Health Analytics</h3>
                <p className="text-sm text-secondary-foreground/70">WHO Standards Platform</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              Advanced pediatric growth assessment system for healthcare professionals and medical institutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Clinical Standards</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                <span>WHO Growth Standards Compliant</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span>Clinical Grade Accuracy</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-warning"></div>
                <span>Pediatric Assessment Validated</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>WHO Growth Standards Documentation</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>Clinical Guidelines</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>Technical Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-secondary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/70">
          <p>© 2024 Child Health Analytics Platform</p>
          <p>Designed for medical institutions and healthcare professionals</p>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span>Powered by WHO Growth Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;