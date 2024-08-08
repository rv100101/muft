import React from "react";

const FeatureCard = ({
  img,
  title,
  description,
}: {
  img: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      <img src={img} alt="icon" />
      <p className="text-sm font-bold">{title}</p>
      <p className="text-xs">{description}</p>
    </div>
  );
};

export default FeatureCard;
