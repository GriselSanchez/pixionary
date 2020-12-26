import React from "react";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const StyledDialog = styled.dialog`
  display: ${({ open }) => (open ? `grid` : `none`)};
  grid-gap: 5%;
  position: absolute;
  top: 40%;
  width: 30%;
  height: 25%;
  border-image-repeat: stretch !important;

  .button-container {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 5%;
    font-size: 1.5vh;
  }
`;

const Modal: React.FC<Props> = ({ isOpen, onOk, onCancel }) => {
  return (
    <StyledDialog
      className="nes-dialog is-rounded"
      id="dialog-rounded"
      open={isOpen}
    >
      <input className="nes-input" placeholder="Enter room code" />
      <div className="button-container">
        <button className="nes-btn is-primary" onClick={onOk}>
          Join Game
        </button>
        <button className="nes-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </StyledDialog>
  );
};

export { Modal };
