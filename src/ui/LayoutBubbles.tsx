import React from "react";
import styled from "styled-components";

const DesignBubble1 = styled.div`
  position: absolute;
  width: 795.01px;
  height: 795.01px;
  top: 32.45px;
  left: calc(100% - 641.99px);
  border-radius: 50%;
  transform-origin: top left;
  background: linear-gradient(251.89deg, #98255f 15.71%, rgba(30, 26, 28, 0.52) 80.03%);
  transform: rotate(-17deg);
`;

const DesignBubble2 = styled.div`
  position: absolute;
  width: 795.01px;
  height: 795.01px;
  top: -355.84px;
  left: calc(100% - 401.53px);
  background: linear-gradient(17deg, #98255f 21.65%, rgba(30, 26, 28, 0.52) 70.64%);
  transform-origin: top left;
  transform: rotate(-17deg);
  border-radius: 50%;
`;

const DesignBubble3 = styled.div`
  position: absolute;
  width: 795.01px;
  height: 795.01px;
  left: calc(100% - 165.87px);
  top: 32px;
  background: linear-gradient(156.67deg, #98255f 14.94%, rgba(30, 26, 28, 0.52) 62.89%);
  transform-origin: top left;
  transform: rotate(-17deg);
  border-radius: 50%;
`;

const BackgroundLayer = styled.div`
  position: relative; 
  zIndex: -10;
`;

export const LayoutBubbles = () => {
  return (
    <BackgroundLayer>
      <DesignBubble1 />
      <DesignBubble2 />
      <DesignBubble3 />
    </BackgroundLayer>
  );
};
