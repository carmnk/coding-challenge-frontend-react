import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { MONTH_NAMES } from "./utils";

const today = new Date();
const todaysMonth = MONTH_NAMES[today?.getMonth()];
const todaysYear = today?.getFullYear();
const lastMonth = MONTH_NAMES[today?.getMonth() > 0 ? today?.getMonth() - 1 : 11];
const lastMonthsYear = today?.getMonth() > 0 ? todaysYear : todaysYear - 1;
jest.useFakeTimers();
jest.mock("./api/gsheets", () => {
  const localToday = new Date();
  const todaySecPrec = new Date(
    localToday.getFullYear(),
    localToday.getMonth(),
    localToday.getDate(),
    localToday.getHours(),
    localToday.getMinutes(),
    localToday.getSeconds()
  );
  return {
    fetchSheet: () =>
      new Promise((res, rej) => {
        res({
          update: todaySecPrec,
          data: [
            {
              nr: "83",
              date: "2022-02-13T23:00:00.000Z",
              dateString: "13.02.2022",
              productName: "Something",
              orderVolume: "1.000,00 €",
            },
            {
              nr: "84",
              date: "2022-02-19T23:00:00.000Z",
              dateString: "19.02.2022",
              productName: "Stickem",
              orderVolume: "2.000,00 €",
            },
            {
              nr: "85",
              date: "2022-02-20T23:00:00.000Z",
              dateString: "20.02.2022",
              productName: "InstaPress",
              orderVolume: "5.000,00 €",
            },
            {
              nr: "86",
              date: "2022-03-20T23:00:00.000Z",
              dateString: "20.03.2022",
              productName: "Some",
              orderVolume: "8.000,00 €",
            },
            {
              nr: "87",
              date: "2022-03-22T23:00:00.000Z",
              dateString: "22.03.2022",
              productName: "Stuff",
              orderVolume: "4.000,00 €",
            },
          ].map((dat) => ({ ...dat, date: new Date(dat.date) })),
        });
      }),
    fetchTargets: () =>
      new Promise((res, rej) => {
        res(
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((mname, monthIdx) => ({ monthName: mname, monthIdx, target: 100000, targetString: "100.000€" }))
        );
      }),
  };
});

test("it initially displays the current month", () => {
  render(<App />);
  const currentMonthElement = screen.getByTitle("current-month");
  expect(currentMonthElement).toHaveTextContent(`${todaysMonth} ${todaysYear}`);
});

test("it switches the current month on click", () => {
  render(<App />);
  const lastMonthButton = screen.getByTitle("button-last");
  fireEvent.click(lastMonthButton);
  const currentMonthElement = screen.getByTitle("current-month");
  expect(currentMonthElement).toHaveTextContent(`${lastMonth} ${lastMonthsYear}`);
  const nextMonthButton = screen.getByTitle("button-next");
  fireEvent.click(nextMonthButton);
  expect(currentMonthElement).toHaveTextContent(`${todaysMonth} ${todaysYear}`);
});

test("it displays the months's total ordervolumes", async () => {
  await render(<App />);
  const currentTotal = screen.getByTitle("sales-indicator");
  expect(currentTotal).toHaveTextContent(`12.000,00 €`);
});

test("it displays the refresh countdown", async () => {
  await render(<App />);
  const currentRefresh = screen.getByTitle("current-refreshtime");
  expect(currentRefresh).toHaveTextContent(/^[0-9]{1,2}/);
  jest.advanceTimersByTime(10000);
  expect(currentRefresh).toHaveTextContent(`50`);
});

test("it displays the month's target", async () => {
  await render(<App />);
  const currentTargetElement = screen.getByTitle("current-target");
  expect(currentTargetElement).toHaveTextContent(`100.000 €`);
});

test("it displays the month's 5 latest orders", async () => {
  await render(<App />);
  const table = screen.getByTitle("table");
  expect(table?.children).toHaveLength(2);
  const thead = table?.children?.[0];
  const trhead = thead?.children?.[0];
  expect(trhead?.children).toHaveLength(4);
  expect(trhead?.children?.[0]).toHaveTextContent("Nr");
  expect(trhead?.children?.[1]).toHaveTextContent("Date");
  expect(trhead?.children?.[2]).toHaveTextContent("Product Name");
  expect(trhead?.children?.[3]).toHaveTextContent("Order Volume");
  const tbody = table?.children?.[1];
  expect(tbody?.children).toHaveLength(2);
  const trbody = tbody?.children?.[0];
  expect(trbody?.children).toHaveLength(4);
  expect(trbody?.children?.[0]).toHaveTextContent("87");
  expect(trbody?.children?.[1]).toHaveTextContent("22.03.2022");
  expect(trbody?.children?.[2]).toHaveTextContent("Stuff");
  expect(trbody?.children?.[3]).toHaveTextContent("4.000,00 €");
});

test("it displays the month's top5 products sold", async () => {
  await render(<App />);
  const grid = screen.getByTitle("grid");
  expect(grid?.children).toHaveLength(3);
  expect(grid?.children?.[0]).toHaveTextContent("Top 5 Products");
  const contentRow1 = grid?.children?.[1];
  expect(contentRow1?.children?.[0]).toHaveTextContent(`Some`);
  expect(contentRow1?.children?.[2]).toHaveTextContent(`8.000,00 €`);
});
