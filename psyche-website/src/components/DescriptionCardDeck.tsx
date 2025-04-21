// cards to the right of the mission timeline
"use client";

import React from "react";

interface DescriptionCardDeckProps {
  currentIndex: number;
  descriptions: string[];
}

const DescriptionCardDeck: React.FC<DescriptionCardDeckProps> = ({ currentIndex, descriptions }) => {
  return (
    <div className="new-card-deck">
      <p>{descriptions[currentIndex]}</p>
    </div>
  );
};

export default DescriptionCardDeck;
