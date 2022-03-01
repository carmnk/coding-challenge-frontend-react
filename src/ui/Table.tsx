import { mdiSortAlphabeticalAscending, mdiSortAlphabeticalDescending } from "@mdi/js";
import { Icon } from "@mdi/react";
import React from "react";
import { useSortBy, useTable } from "react-table";
import styled from "styled-components";

export const columns = [
  {
    Header: "Nr",
    accessor: "nr",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Product Name",
    accessor: "productName",
    grow: true,
  },

  {
    Header: "Order Volume",
    accessor: "orderVolume",
    textAlign: "right" as const,
  },
];

type HeaderCellProps = {
  textAlign?: React.CSSProperties["textAlign"];
  grow?: boolean;
};
const HeaderCell = styled.th<HeaderCellProps>`
  text-transform: uppercase;
  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: 20px;
  border-bottom: 2px solid #c4c4c4;
  padding: 0px;
  padding-bottom: 3px;
  text-align: ${(props) => props.textAlign || "left"};
  width: ${(props) => (props?.grow ? "auto" : "max-content")};
`;

const HeaderCellContentFlex = styled.div<HeaderCellProps>`
  display: flex;
  align-content: center;
  justify-content: ${(props) => (props.textAlign === "right" ? "flex-end" : "flex-start")};
`;

type CellProps = {
  textAlign?: React.CSSProperties["textAlign"];
  grow?: boolean;
  rowIdx?: number;
  fontWeight?: React.CSSProperties["fontWeight"];
};

const Cell = styled.td<CellProps>`
  font-family: ${(props) => props.theme.secondaryFontFamily};
  font-weight: ${(props) => (props?.fontWeight ? props.fontWeight : "normal")};
  font-size: 20px;
  line-height: 24px;
  padding-right: 32px;
  padding-top: ${(props) => (props.rowIdx === 0 ? "23px" : "11px")};
  text-align: ${(props) => props.textAlign || "left"};
  width: ${(props) => (props?.grow ? "auto" : "max-content")};
  color: #e8e8e8;
`;

type TableElementProps = {
  minWidth?: TableProps["minWidth"];
};
const TableElement = styled.table<TableElementProps>`
  color: ${(props) => props.theme.color};
  border: 0;
  width: 100%;
  min-width: ${(props) =>
    typeof props?.minWidth === "number"
      ? (props.minWidth - 46).toString() + "px"
      : props?.minWidth
      ? props.minWidth
      : "auto"};
  border-spacing: 0px;
`;

type TableContainerProps = {
  maxWidth?: TableProps["minWidth"];
};
const TableContainer = styled.div<TableContainerProps>`
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  height: 280px;
  background: #26262c;
  padding-top: 27px;
  padding-left: 23px;
  padding-right: 23px;
  flex-grow: 1;
  flex-basis: ${(props) =>
    typeof props?.maxWidth === "number" ? props?.maxWidth + "px" : props?.maxWidth ? props.maxWidth : "auto"};
`;

export type TableProps = {
  columns: { Header: string; accessor: string; textAlign?: React.CSSProperties["textAlign"]; grow?: boolean }[];
  data: { [key: string]: any }[];
  minWidth?: React.CSSProperties["minWidth"];
};

export const Table = (props: TableProps) => {
  const { columns, data, minWidth } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <TableContainer maxWidth={minWidth}>
      <TableElement minWidth={minWidth} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <HeaderCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  textAlign={column?.textAlign}
                  grow={column?.grow}
                >
                  <HeaderCellContentFlex textAlign={column?.textAlign}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <Icon path={mdiSortAlphabeticalAscending} size={"24px"} color="rgba(152,37,95,1)"></Icon>
                      ) : (
                        <Icon path={mdiSortAlphabeticalDescending} size={"24px"} color="rgba(152,37,95,1)"></Icon>
                      )
                    ) : (
                      ""
                    )}
                  </HeaderCellContentFlex>
                </HeaderCell>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} style={{}}>
          {rows.map((row, ridx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cidx) => {
                  return (
                    <Cell
                      rowIdx={ridx}
                      fontWeight={cidx === row.cells.length - 1 ? "bold" : "normal"}
                      textAlign={columns?.[cidx]?.textAlign}
                      grow={columns?.[cidx]?.grow}
                      key={`r${ridx}-c${cidx}`}
                    >
                      {cell.render("Cell")}
                    </Cell>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </TableElement>
    </TableContainer>
  );
};
