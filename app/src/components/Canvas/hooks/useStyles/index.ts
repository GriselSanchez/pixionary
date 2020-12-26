import { useState } from "react";

import { TypeEnum } from "../../types";

export const useStyles = () => {
  const [width, setWidth] = useState("5");
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
    },
    onChange,
  };
};
