import React from "react";
import styled, { useTheme } from "styled-components";
import { Icon } from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { MONTH_NAMES } from "../utils";
import { defaultDarkTheme } from "../App";

const MenuFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 74px);
  position: relative;
  margin-left: 36px;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 10px;
  width: 53px;
  height: 53px;
  background: #26262c;
  border: 1px solid #000000;
  border-radius: 5px;
  @media (pointer: fine) {
    &:hover {
      background: rgba(76, 18, 47, 1);
    }
  }
  &:active {
    background: rgba(152, 37, 95, 1);
  }
`;

const TextTitle = styled.div`
  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: 20px;
  line-height: 25px;

  flex-grow: 1;
  color: #c4c4c4;
  width: max-content;
  padding-right: 8px;
  flex-shrink: 0;
  flex-grow: 1;
`;
const TextRefreshCaption = styled.div`
  display: flex;
  gap: 3px;
  font-family: ${(props) => props.theme.secondaryFontFamily};
  font-size: 20px;
  line-height: 24px;
  width: max-content;
  flex-shrink: 0;
  color: #c4c4c4;
`;

const TextRefreshSecs = styled.span`
  font-family: ${(props) => props.theme.secondaryFontFamily};
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
`;

const TitleRowFlex = styled.div`
  display: flex;
  flexwrap: wrap;
  width: 100%;
`;

const MonthRowFlex = styled.div`
  display: flex;
  align-content: center,
  flex-wrap: wrap,
`;
const MonthCurrentFlex = styled.div`
  display: flex;
  flex-grow: 1; 
  max-width: 317px;
  height: 53px;
  font-family: ${(props) => props.theme.secondaryFontFamily};
  font-weight: bold;
  font-size: 30px;
  line-height: 37px;
  color: ${(props) => props.theme.color};
  align-self: center;
  flexGrow: 1, maxWidth: 317
`;

const ActionButtonFlex = styled.div`
  display: flex;
  gap: 9px;
  height: 53px;
`;

export type HeaderMenuProps = {
  Month: { month: number; year: number };
  setMonth: React.Dispatch<React.SetStateAction<{ month: number; year: number }>>;
  update: Date;
};

export const HeaderMenu = (props: HeaderMenuProps) => {
  const { setMonth, Month, update } = props;

  const [Time, setTime] = React.useState(new Date());
  const lastUpdateDelayed = (Time.getTime() - update.getTime()) / 1000;

  React.useEffect(() => {
    const onTimer = () => {
      const date = new Date();
      setTime(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        )
      );
    };
    const hTimer = window.setInterval(onTimer, 1000);
    return () => {
      window.clearInterval(hTimer);
    };
  }, []);

  const goNextMonth = React.useCallback(() => {
    setMonth((current) =>
      current.month < 11 ? { month: current.month + 1, year: current.year } : { month: 0, year: current.year + 1 }
    );
  }, [setMonth]);

  const goLastMonth = React.useCallback(() => {
    setMonth((current) =>
      current.month > 0 ? { month: current.month - 1, year: current.year } : { month: 11, year: current.year - 1 }
    );
  }, [setMonth]);

  const theme = useTheme() as typeof defaultDarkTheme;

  return (
    <MenuFlexContainer>
      <TitleRowFlex>
        <TextTitle>Order Dashboard</TextTitle>
        <TextRefreshCaption>
          Refresh in<TextRefreshSecs>{Math.max(60 - lastUpdateDelayed, 0)}</TextRefreshSecs>
        </TextRefreshCaption>
      </TitleRowFlex>
      <MonthRowFlex>
        <MonthCurrentFlex>
          <div style={{ alignSelf: "center" }}>
            {MONTH_NAMES?.[Month.month]} {Month.year}
          </div>
        </MonthCurrentFlex>

        <ActionButtonFlex>
          <Button onClick={goLastMonth}>
            <Icon path={mdiChevronLeft} size={"31px"} color={theme.color}></Icon>
          </Button>
          <Button onClick={goNextMonth}>
            <Icon path={mdiChevronRight} size={"31px"} color={theme.color}></Icon>
          </Button>
        </ActionButtonFlex>
      </MonthRowFlex>
    </MenuFlexContainer>
  );
};
