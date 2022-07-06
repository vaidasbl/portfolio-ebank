import React from "react";

const BenefitCard = ({ text, image }) => {
  return (
    <div>
      <div className="cardtitle">{text}</div>
      <div>
        <img className="card-image" src={image} alt="img" />
      </div>
    </div>
  );
};

export default BenefitCard;
