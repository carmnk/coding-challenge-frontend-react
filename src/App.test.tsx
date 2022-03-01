import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("it initially displays the current month", () => {});
test("it filters by month", () => {});
test("it displays the refresh countdown", () => {});
test("it displays the months's total ordervolumes", () => {});
test("it displays the sales progress (bar)", () => {});
test("it displays the month's target", () => {});
test("it displays the month's 5 latest orders", () => {});
test("it displays the month's top5 products sold", () => {});
