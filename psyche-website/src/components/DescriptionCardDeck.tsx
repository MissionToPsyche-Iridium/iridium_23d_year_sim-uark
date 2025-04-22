"use client";

import React from "react";

interface DescriptionCardDeckProps {
  currentIndex: number;
  descriptions: string[];
}

const DescriptionCardDeck: React.FC<DescriptionCardDeckProps> = ({ currentIndex, descriptions }) => {
  return (
    <div className="new-card-deck-wrapper">
      <div
        className="new-card-deck"
        dangerouslySetInnerHTML={{ __html: descriptions[currentIndex] }}
      />
    </div>
  );
};

export default DescriptionCardDeck;
