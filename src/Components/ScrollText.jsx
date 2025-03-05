import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const ScrollText = () => {
  const [velocity, setVelocity] = useState(50);

  const updateVelocity = () => {
    setVelocity(window.innerWidth < 650 ? 50 : 50);
  };

  useEffect(() => {
    updateVelocity();
    window.addEventListener("resize", updateVelocity);
    return () => window.removeEventListener("resize", updateVelocity);
  }, []);

  const arr = ["Heal naturally with the power of Ayurveda!","100% pure herbal products – No side effects!" , "Ayurveda: Ancient wisdom for modern wellness!", "Balance your mind, body, and soul with Ayurveda!", "Detox and rejuvenate with nature’s best remedies!", "Harness the power of herbs for a healthier life!", "Pure. Natural. Ayurvedic – Wellness redefined!", "Discover the secrets of Ayurveda for holistic healing!", "Stay healthy the natural way – Choose Ayurveda!", "Ayurvedic solutions for a healthier tomorrow!"];
  const x="Shipping Above 499 :: New Users Get Extra 5% Off : Use Code Flat5 :: 5% Extra Discount On Prepaid | Free Shipping Above 499 :: New Users Get Extra 5% Off : Use Code Flat5 :: 5% Extra Discount On Prepaid |"

  return (
    <div className="bg-orange-600 py-2
    ">
      <Marquee speed={velocity} gradient={false}>
        <p className="text-white text-[1.2rem] font-medium sliderfont">{x}</p>
      </Marquee>
    </div>
  );
};

export default ScrollText;
