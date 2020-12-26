import React, { useEffect } from "react";
import styled from "styled-components";

import { Style } from "src/types";

import { useStyles } from "./hooks";
import { TypeEnum } from "./types";

const Container = styled.div`
  display: flex;
`;

interface Props {
  onStyleChange: (style: Style) => void;
}

const StylingTools: React.FC<Props> = ({ onStyleChange }) => {
  const { style, onChange } = useStyles();

  useEffect(() => {
    onStyleChange(style);
  }, [style.color, style.width]);

  return (
    <Container>
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
    </Container>
  );
};

export { StylingTools };
