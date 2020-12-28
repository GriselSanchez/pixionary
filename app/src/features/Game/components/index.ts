import styled from "styled-components";

const GameContainer = styled.div`
  display: flex;
  place-content: center;
  margin-top: 2%;
`;

const PanelContainer = styled.div`
  background-color: white;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5%;
`;

export { GameContainer, PanelContainer };
