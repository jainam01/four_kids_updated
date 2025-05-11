import React from "react";
import "./WhyChoose.css"; // Import the CSS for styling

const WhyChoose = () => {
  const features = [
    {
      title: "Premium Quality",
      description:
        "Our clothing is crafted with high-quality fabrics for comfort and durability",
      icon: "✔️",
    },
    {
      title: "Competitive Pricing",
      description:
        "Wholesale rates with volume discounts for better profit margins",
      icon: "$",
    },
    {
      title: "Wide Selection",
      description:
        "Extensive range of styles, sizes, and colors to choose from",
      icon: "🛍️",
    },
    {
      title: "Fast Delivery",
      description:
        "Quick shipping across India with tracking information provided",
      icon: "⚡",
    },
  ];

  return (
    <div className="why-choose-container">
      <h2 className="why-choose-title">Why Choose FouKids?</h2>
      <p className="why-choose-subtitle">
        We deliver quality, style, and value to retailers across India
      </p>
      <div className="why-choose-cards">
        {features.map((feature, index) => (
          <div className="why-choose-card" key={index}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
