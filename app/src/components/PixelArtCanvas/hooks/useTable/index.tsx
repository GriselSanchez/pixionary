import React, { ReactElement, useState } from "react";
import styled from "styled-components";

import { Point } from "../../../../types";

const StyledTd = styled.td<{ isColored?: boolean }>`
  background-color: ${({ isColored }) => (isColored ? "black" : "")};
`;

type Event = React.MouseEvent<HTMLTableDataCellElement, MouseEvent>;

export const useTable = (height: number, width: number) => {
  const [isClicked, setIsClicked] = useState(false);
  const table: ReactElement[] = [];

  // TODO: send from server
  const points = [
    { x: 5, y: 6 },
    { x: 8, y: 2 },
  ];

  const draw = (event: Event) => {
    event.currentTarget.style.backgroundColor = "black";
  };

  const onMouseDown = (point: Point) => (event: Event) => {
    setIsClicked(true);
    draw(event);
    // TODO: send point to server
    console.log(point);
  };

  const onMouseOver = (point: Point) => (event: Event) => {
    if (isClicked) {
      draw(event);
      // TODO: send point to server
      console.log(point);
    }
  };

  const onMouseUp = (_: Event) => {
    setIsClicked(false);
  };

  for (let i = 1; i < height; i++) {
    const columns: ReactElement[] = [];

    for (let j = 1; j < width; j++) {
      const point = { x: j, y: i };
      columns.push(
        <StyledTd
          key={j}
          onMouseDown={onMouseDown(point)}
          onMouseOver={onMouseOver(point)}
          onMouseUp={onMouseUp}
          isColored={points.some(({ x, y }) => point.x === x && point.y === y)}
        />
      );
    }

    table.push(<tr key={i}>{columns}</tr>);
  }

  return table;
};
