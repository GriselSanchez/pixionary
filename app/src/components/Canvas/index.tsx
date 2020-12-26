import React from "react";
import styled from "styled-components";

import { useCanvas, useStyles } from "./hooks";
import { TypeEnum } from "./types";

interface Props {
  width?: number;
  height?: number;
}

const StyledCanvas = styled.canvas`
  border: 2px solid black;
`;

const Canvas: React.FC<Props> = ({ width = 500, height = 500 }) => {
  const { style, onChange } = useStyles();
  const { canvasRef, isDrawingMode } = useCanvas(style);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <input
        type="color"
        onChange={onChange(TypeEnum.Color)}
        value={style.color}
        style={{ width: "100%" }}
      />
      <input
        type="range"
        onChange={onChange(TypeEnum.Width)}
        value={style.width}
      />
      <StyledCanvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ pointerEvents: isDrawingMode ? "auto" : "none" }}
      />
    </div>
  );
};

export { Canvas };
