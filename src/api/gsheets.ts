import { parseEuroValues } from "../utils";
import { MONTH_NAMES } from "../utils";
import credentials from "./credentials.json";

function parseDate(input: string) {
  const parts = input.match(/(\d+)/g)?.map((val) => parseInt(val));
  if (!parts?.[0] || !parts?.[1] || !parts?.[2]) return null;
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

export const fetchSheet = async () => {
  const request = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${credentials.SHEET_ID}/values/A:D?key=${credentials.API_KEY}`
  );
  const data = await request.json();
  if (!data || !data?.values?.length) return;
  const dateAdjData = (data?.values as string[][])?.slice(1)?.map?.((row) => ({
    nr: row[0],
    date: parseDate(row[1]),
    dateString: row[1],
    productName: row[2],
    orderVolume: row[3],
  }));
  const date = new Date();
  const secAdjDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
  return { update: secAdjDate, data: dateAdjData };
};

export const fetchTargets = async () => {
  const request = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${credentials.SHEET_ID}/values/Targets!A:D?key=${credentials.API_KEY}`
  );
  const data = await request.json();
  if (!data || !data?.values?.length) return;
  const dataObjectified = (data?.values as string[][])?.slice(1)?.map?.((row) => ({
    monthName: row[0],
    monthIdx: MONTH_NAMES?.findIndex((val) => val === row[0].trim()),
    target: parseEuroValues(row[1]),
    targetString: row[1],
  }));

  return dataObjectified;
};
