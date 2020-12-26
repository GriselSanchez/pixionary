import styled from "styled-components";

export { Modal } from "./Modal";

const Container = styled.div`
  display: grid;
  grid-gap: 5%;
  position: absolute;
  width: 30%;
  top: 45%;
  left: 35%;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
`;

export { Container, ButtonsContainer };
