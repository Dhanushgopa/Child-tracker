import { Zap, Shield, Target } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Instant WHO-standard growth calculations with Z-score precision",
      iconColor: "text-primary",
      iconBg: "bg-primary/10"
    },
    {
      icon: Shield,
      title: "Clinical Accuracy",
      description: "Validated against WHO reference standards for reliable results",
      iconColor: "text-success",
      iconBg: "bg-success/10"
    },
    {
      icon: Target,
      title: "Data-driven Insights",
      description: "Comprehensive growth tracking and trend analysis",
      iconColor: "text-warning",
      iconBg: "bg-warning/10"
    }
  ];

  return (
    <section>
      <div className="max-w-7xl mx-auto">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-lg border border-border ${feature.iconBg} flex items-center justify-center`}>
                <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;