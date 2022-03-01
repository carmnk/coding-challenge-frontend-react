import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { columns, Table } from "./ui/Table";
import { LayoutBubbles } from "./ui/LayoutBubbles";
import { HeaderMenu } from "./ui/Menu";
import { ProgressBar } from "./ui/ProgressBar";
import { FlexGrid } from "./ui/Grid";
import { fetchSheet, fetchTargets } from "./api/gsheets";
import { numberWithCommas, parseEuroValues } from "./utils";
import uniq from "lodash/uniq";
import { SalesIndicator } from "./ui/SalesIndicator";

export const defaultDarkTheme = {
  background: "#000",
  color: "#fff",
  primaryFontFamily: "Source Serif Pro",
  secondaryFontFamily: "Montserrat",
  tertiaryFontFamily: "Roboto",
};

const FlexBoxContainer = styled.div`
  margin-top: 59px;
  display: flex;
  gap: 17px;
  flex-wrap: wrap;
  width: 100%;
`;

const HorizontalViewportContainer = styled.div`
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const filterByMonth = (
  data: { nr: string; date: Date | null; productName: string; orderVolume: string; dateString: string }[],
  month: { month: number; year: number }
) => {
  return data.filter((row) => {
    return row.date?.getMonth?.() === month.month && row.date?.getFullYear?.() === month.year;
  });
};

export type Dataset = { nr: string; date: Date | null; dateString: string; productName: string; orderVolume: string };
export type FetchData = {
  update: Date;
  data: Dataset[];
};
export type CurrentMonth = { month: number; year: number };
export type MonthlyTarget = { monthName: string; target: number; targetString: string };

function App() {
  const currentDate = new Date();
  const [Data, setData] = React.useState<FetchData>({ data: [], update: new Date(0) });
  const [Month, setMonth] = React.useState<CurrentMonth>({
    month: currentDate?.getMonth(), // remember month is an idx
    year: currentDate?.getFullYear(),
  });
  const [Targets, setTargets] = React.useState<MonthlyTarget[]>([]);

  React.useEffect(() => {
    const onTimer = async () => {
      const fetched = await fetchSheet();
      if (!fetched) return;
      setData(fetched);
    };

    (async () => {
      const targets = await fetchTargets();
      if (!targets) return;
      setTargets(targets);
    })();
    onTimer(); // exec now
    const timer = window.setInterval(onTimer, 60000); // and schedule
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const monthlyData = filterByMonth(Data?.data, Month);
  const monthlySum = monthlyData.reduce<number>((acc, cur) => acc + parseEuroValues(cur?.orderVolume), 0);
  const last5Sales = monthlyData
    .sort((a, b) =>
      !a?.date || !b?.date
        ? 0
        : a.date?.getTime() < b.date?.getTime()
        ? -1
        : a.date?.getTime() > b.date?.getTime()
        ? 1
        : 0
    )
    ?.slice(-5)
    ?.reverse()
    ?.map((val) => {
      return { ...val, date: val.dateString };
    });
  const uniqProductsInMonth = uniq(monthlyData.map((val) => val.productName));
  const salesPerProduct = uniqProductsInMonth
    ?.map((prod) => ({
      productName: prod,
      totalSales: monthlyData
        ?.filter((dat) => dat.productName === prod)
        ?.reduce<number>((acc, cur) => acc + parseEuroValues(cur?.orderVolume), 0),
    }))
    ?.sort((a, b) => (a.totalSales > b.totalSales ? 1 : a.totalSales < b.totalSales ? -1 : 0))
    ?.slice(-5)
    ?.reverse();
  const monthlyTarget = Targets?.[Month.month];
  const progress = !monthlyTarget?.target ? 0 : monthlySum / monthlyTarget?.target;
  return (
    <ThemeProvider theme={defaultDarkTheme}>
      <HorizontalViewportContainer title="h-viewport-container">
        <LayoutBubbles />
        <div style={{ paddingBottom: 35 }}>
          <HeaderMenu Month={Month} setMonth={setMonth} update={Data.update} />
          <SalesIndicator title="sales-indicator">{numberWithCommas(monthlySum)} €</SalesIndicator>
          <ProgressBar progress={progress} target={monthlyTarget?.target ?? 0} />
          <FlexBoxContainer>
            <Table minWidth={748} columns={columns} data={last5Sales}></Table>
            <FlexGrid minWidth={963} data={salesPerProduct} totalSales={monthlySum}></FlexGrid>
          </FlexBoxContainer>
        </div>
      </HorizontalViewportContainer>
    </ThemeProvider>
  );
}

export default App;
