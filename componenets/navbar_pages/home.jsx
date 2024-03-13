import React, { useState } from "react";
import "./home.css";
import SWOTcard from "../../homepage_cards/cards";

const Home = () => {
  return (
    <div className="home-container">
      <div className="card-grid">
        <div className="first-row">
          <SWOTcard className="strengths" letter="S" title="Strengths" description=" Our company has a strong brand reputation and loyal customer base, which contributes to high customer retention rates
            and increased sales. Additionally, we have a talented and experienced team that consistently delivers high-quality
            products/services." />
          <SWOTcard className="weakness" letter="W" title="Weaknesses" description="Despite our strengths, we face challenges such as limited market presence in certain regions, which hinders our
            growth potential. Additionally, our reliance on a single supplier for key components poses a risk to our supply chain
            stability." />
        </div>
        <div className="second-row">
          <SWOTcard className="opportunities" letter="O" title="Opportunities" description="There are several opportunities for growth, including expanding into new markets both domestically and
            internationally. Additionally, advancements in technology present opportunities to enhance our products/services and
            streamline operations." /> 
          <SWOTcard className="threats" letter="T" title="Threats" description="External factors such as economic downturns and changes in government regulations pose threats to our business
            operations. Intense competition in the market and the emergence of disruptive technologies could also impact our
            market share and profitability. " />
        </div>
      </div>
    </div>
  );
};

export default Home;
