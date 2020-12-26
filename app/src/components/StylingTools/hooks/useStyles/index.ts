import { useState } from "react";

import { Style } from "src/types";

import { TypeEnum } from "../../types";

export const useStyles = () => {
  const [width, setWidth] = useState("10");
  const [color, setColor] = useState("#000000");

  const stateMap = {
    [TypeEnum.Width]: setWidth,
    [TypeEnum.Color]: setColor,
  };

  const onChange = (type: TypeEnum) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    stateMap[type](event.target.value);
  };

  return {
    style: {
      width: parseInt(width),
      color,
    } as Style,
    onChange,
  };
};
