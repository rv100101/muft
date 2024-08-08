
import React, { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-none sm:border-solid sm:border mt-2 py-2 mx-1 rounded-lg">
      <button
        className="flex justify-between items-center w-full p-2 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isOpen && <div className="p-2 text-sm">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
