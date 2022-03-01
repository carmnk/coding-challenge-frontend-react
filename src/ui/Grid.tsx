import React from "react";
import styled from "styled-components";
import { numberWithCommas } from "../utils";

const GridScrollableContainer = styled.div<{ minWidth: number }>`
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  flex-basis: ${(props) => props.minWidth};
  flex-grow: 1;
`;

const GridContainer = styled.div<{ minWidth?: React.CSSProperties["minWidth"] }>`
  height: 280px;
  background: #26262c;
  padding-top: 27px;
  padding-left: 23px;
  padding-right: 23px;
  flex-grow: 1;
  min-width: ${(props) =>
    typeof props?.minWidth === "number"
      ? (props.minWidth - 46).toString() + "px"
      : props?.minWidth
      ? props.minWidth
      : "auto"};
  flex-direction: column;
  color: ${(props) => props.theme.color};
`;

const HeaderItem = styled.div`
  text-transform: uppercase;
  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: 20px;
  border-bottom: 2px solid #c4c4c4;
  padding: 0px;
  padding-bottom: 3px;
`;

const Row = styled.div<{ rowIdx: number }>`
  text-transform: uppercase;
  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: 20px;
  padding-top: ${(props) => (props.rowIdx === 0 ? "23px" : "11px")};
  display: flex;
  align-items: center;
`;

const GridCell = styled.div`
  padding-right: 32px;
  width: 211px;
  font-family: ${(props) => props.theme.secondaryFontFamily};
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

const CellBarContainer = styled.div`
  height: 18px;
  border: 1px solid #000;
  font-size: 12px;
`;
const CellBar = styled.div`
  height: 18px;
  background: #2066d2;
  top: 0px;
  text-align: right;
`;

export const FlexGrid = (props: {
  minWidth: number;
  data: { productName: string; totalSales: number }[];
  totalSales: number;
}) => {
  const { minWidth, data, totalSales } = props;

  return (
    <GridScrollableContainer minWidth={minWidth}>
      <GridContainer minWidth={minWidth}>
        <HeaderItem>Top 5 Products</HeaderItem>
        {data.map((row, rIdx) => {
          const cellContent = (
            <React.Fragment>
              <GridCell>{row.productName}</GridCell>
              <GridCell style={{ flexGrow: 1, position: "relative" }}>
                <CellBarContainer>
                  <CellBar
                    style={{
                      width: Math.round((row.totalSales / totalSales) * 100) + "%",
                    }}
                  >
                    {Math.round((row.totalSales / totalSales) * 100) + "%"}
                  </CellBar>
                </CellBarContainer>
              </GridCell>
              <GridCell
                style={{
                  fontWeight: "bold",
                }}
              >
                {numberWithCommas(row.totalSales)} €
              </GridCell>
            </React.Fragment>
          );
          return (
            <Row rowIdx={rIdx} key={`grid-row${rIdx}`}>
              {cellContent}
            </Row>
          );
        })}
      </GridContainer>
    </GridScrollableContainer>
  );
};
