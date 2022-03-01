import React from "react";
import styled from "styled-components";

export const SalesIndicator = styled.div`
  margin-top: 159px;
  margin-left: 36px;
  font-family: ${(props) => props.theme.tertiaryFontFamily};

  font-weight: bold;
  font-size: 192px;
  line-height: 225px;
  /* identical to box height */
  color: ${(props) => props.theme.color};
  position: relative;
  @media only screen and (max-width: 1200px) {
    font-size: 128px;
    line-height: 144px;
  }
  @media only screen and (max-width: 900px) {
    font-size: 96px;
    line-height: 112px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 48px;
    line-height: 64px;
  }
`;
