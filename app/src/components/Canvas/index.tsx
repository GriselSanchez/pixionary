import styled from "styled-components";

import { useCanvas, useStyles } from "./hooks";
import { TypeEnum } from "./types";

interface Props {
  width?: number;
  height?: number;
}

const StyledCanvas = styled.canvas`
  border: 2px solid red;
`;

const Canvas: React.FC<Props> = ({ width = 500, height = 500 }) => {
  const { style, onChange } = useStyles();
  const { canvasRef, isDrawingMode } = useCanvas(style);

  return (
    <div>
      <input
        type="color"
        onChange={onChange(TypeEnum.Color)}
        value={style.color}
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
