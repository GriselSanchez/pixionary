import styled from "styled-components";

const PanelContainer = styled.div`
  background-color: white;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5%;

  .nes-container.is-rounded {
    padding: 35px;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const GameContainer = styled.div`
  display: flex;
  place-content: center;
  margin-top: 3%;
`;

export { PanelContainer, ChatContainer, CanvasContainer, GameContainer };
export { CanvasTypeSelect } from "./CanvasTypeSelect";
export { TurnInfo } from "./TurnInfo";
