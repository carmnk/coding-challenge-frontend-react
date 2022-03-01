import React from "react";
import styled from "styled-components";
import { numberWithCommas } from "../utils";

const ProgressBarContainer = styled.div`
  position: relative;
  width: calc(100% - 74px);
  height: 47px;
  margin-top: 157px;
  margin-left: 36px;
  background: #2f2f2f;
`;

const ProgressBarTargetMarker = styled.div`
  position: absolute;
  width: 6px;
  height: 79px;
  left: 90%;
  top: -16px;
  background: #c4c4c4;
`;

const TextTarget = styled.div`
  position: absolute;
  width: 98px;
  height: 26px;
  top: -56px;
  left: calc(90% - 49px);
  font-family: ${(props) => props.theme.tertiaryFontFamily};
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */

  color: ${(props) => props.theme.color};
`;

type ProgressBarValueProps = Pick<ProgressBarProps, "progress">;
const ProgressBarValue = styled.div<ProgressBarValueProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => Math.round(props.progress * 100)}%;
  height: 47px;
  background: #2066d2;
`;

export type ProgressBarProps = {
  progress: number;
  target: number;
};
export const ProgressBar = (props: ProgressBarProps) => {
  const { progress, target } = props;
  return (
    <ProgressBarContainer>
      <ProgressBarValue progress={progress} />
      <ProgressBarTargetMarker />
      <TextTarget>{numberWithCommas(target, 0)} €</TextTarget>
    </ProgressBarContainer>
  );
};
