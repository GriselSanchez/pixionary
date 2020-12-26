import styled from "styled-components";

const PanelContainer = styled.div`
  background-color: white;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5%;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameContainer = styled.div`
  display: flex;
  place-content: center;
`;

export { PanelContainer, ChatContainer, CanvasContainer, GameContainer };
export { CanvasTypeSelect } from "./CanvasTypeSelect";
export { TurnInfo } from "./TurnInfo";
