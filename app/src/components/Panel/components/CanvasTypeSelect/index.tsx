import React, { ReactElement, useState } from "react";

import { CanvasTypeEnum } from "../../../../types";

interface Props {
  onChange: (type: CanvasTypeEnum) => void;
}

const CanvasTypeSelect: React.FC<Props> = ({ onChange }) => {
  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as CanvasTypeEnum);
  };

  return (
    <select name="canvas-type" onChange={onChangeType}>
      <option value={CanvasTypeEnum.Normal} selected>
        Normal
      </option>
      <option value={CanvasTypeEnum.PixelArt}>Pixel Art</option>
    </select>
  );
};

export { CanvasTypeSelect };
