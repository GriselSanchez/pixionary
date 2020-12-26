import React from "react";
import styled from "styled-components";

import { useTable } from "./hooks";

const StyledTable = styled.div`
  table,
  tr,
  td {
    border: 1px solid #777;
  }

  table {
    border-collapse: collapse;
    margin: 0 auto;
    cursor: pointer;

    tr {
      height: 2vmin;
      td {
        min-width: 2vmin;
        width: 2vmin;
        transition: background 0.15s;
        &:hover {
          background: rgba(40, 40, 40, 0.3);
        }
      }
    }
  }
`;

const PixelArtCanvas = () => {
  const table = useTable(32, 32);

  return (
    <StyledTable>
      <table>
        <tbody>{table}</tbody>
      </table>
    </StyledTable>
  );
};

export { PixelArtCanvas };
