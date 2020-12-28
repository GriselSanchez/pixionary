import React from "react";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const StyledDialog = styled.dialog`
  display: ${({ open }) => (open ? `grid` : `none`)};
  grid-gap: 10%;
  position: absolute;
  top: 40%;
  width: 30%;
  height: 23%;
  border-image-repeat: stretch !important;

  .button-container {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 5%;
    font-size: 1.5vh;
  }
  .nes-input {
    font-size: 1.5em;
  }
`;

const RoomCode: React.FC<Props> = ({ isOpen, onOk, onCancel }) => {
  return (
    <StyledDialog
      className="nes-dialog is-rounded"
      id="dialog-rounded"
      open={isOpen}
    >
      <input
        className="nes-input"
        placeholder="Enter room code"
        spellCheck="false"
      />
      <div className="button-container">
        <button className="nes-btn is-error" onClick={onCancel}>
          Cancel
        </button>
        <button className="nes-btn is-warning" onClick={onOk}>
          Join Game
        </button>
      </div>
    </StyledDialog>
  );
};

export { RoomCode };
