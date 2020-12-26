import React from "react";
import { Style } from "src/types";
import styled from "styled-components";

import { useCanvas } from "./hooks";

const StyledCanvas = styled.canvas<{ isOn: boolean }>`
  pointer-events: ${({ isOn }) => (isOn ? `auto` : `none`)};
  cursor: ${({ isOn }) => (isOn ? `auto` : `not-allowed`)};
`;

interface Props {
  style: Style;
}

const Canvas: React.FC<Props> = ({ style }) => {
  const { canvasRef, isDrawingMode } = useCanvas(style);

  return (
    <div className="nes-container">
      <StyledCanvas
        ref={canvasRef}
        isOn={isDrawingMode}
        width={700}
        height={600}
      />
    </div>
  );
};

export { Canvas };
