import React from "react";
import BenefitCard from "./BenefitCard";

const Body = () => {
  return (
    <div className="home-body">
      <div className="container">
        <div className="row">
          <div className="mb-4 mt-4 body-title">
            Something benefits something
          </div>
          <div className="col-3">
            {<BenefitCard text={"something innovation"} image={"/bank.png"} />}
          </div>
          <div className="col-3">
            {
              <BenefitCard
                text={"leading corporations work with us"}
                image={"/bank.png"}
              />
            }
          </div>
          <div className="col-3">
            {<BenefitCard text={"something easy to use"} image={"/bank.png"} />}
          </div>
          <div className="col-3">
            {
              <BenefitCard
                text={"customer support amazing"}
                image={"/bank.png"}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
