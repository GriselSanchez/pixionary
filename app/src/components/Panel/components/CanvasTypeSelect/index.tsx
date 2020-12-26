import React from "react";

import { CanvasTypeEnum } from "src/types";

interface Props {
  onChange: (type: CanvasTypeEnum) => void;
}

const CanvasTypeSelect: React.FC<Props> = ({ onChange }) => {
  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as CanvasTypeEnum);
  };

  return (
    <div className="nes-select">
      <select name="canvas-type" onChange={onChangeType} id="default_select">
        <option value={CanvasTypeEnum.Normal} selected>
          Normal
        </option>
        <option value={CanvasTypeEnum.PixelArt}>Pixel Art</option>
      </select>
    </div>
  );
};

export { CanvasTypeSelect };
