import React, { ReactElement, useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { SocketContext } from "src/contexts";
import { Point } from "src/types";

const StyledTd = styled.td<{ isColored?: boolean }>`
  background-color: ${({ isColored }) => (isColored ? "black" : "")};
`;

type Event = React.MouseEvent<HTMLTableDataCellElement, MouseEvent>;

export const useTable = (height: number, width: number) => {
  const socket = useContext(SocketContext);

  const [isClicked, setIsClicked] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);

  const table: ReactElement[] = [];

  useEffect(() => {
    socket.on("draw-pixel", (point: Point) => {
      setPoints((prev) => [...prev, point]);
    });
  }, []);

  const draw = (event: Event, point: Point) => {
    event.currentTarget.style.backgroundColor = "black";
    socket.emit("draw-pixel", point);
  };

  const onMouseDown = (point: Point) => (event: Event) => {
    setIsClicked(true);
    draw(event, point);
  };

  const onMouseOver = (point: Point) => (event: Event) => {
    if (isClicked) draw(event, point);
  };

  const onMouseUp = () => {
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
