import React from "react";
import { Style } from "src/types";
import styled from "styled-components";

import { useCanvas } from "./hooks";

const StyledCanvas = styled.canvas<{ isOn: boolean }>`
  border: 2px solid black;
  pointer-events: ${({ isOn }) => (isOn ? "auto" : "none")};
  cursor: ${({ isOn }) => (isOn ? "auto" : "not-allowed")};
  width: 700px;
  height: 600px;
`;

interface Props {
  style: Style;
}

const Canvas: React.FC<Props> = ({ style }) => {
  const { canvasRef, isDrawingMode } = useCanvas(style);

  return <StyledCanvas ref={canvasRef} isOn={isDrawingMode} />;
};

export { Canvas };
