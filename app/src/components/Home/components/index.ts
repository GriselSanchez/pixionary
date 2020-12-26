import styled from "styled-components";

export { Modal } from "./Modal";

const Container = styled.div`
  display: grid;
  grid-gap: 15%;
  position: absolute;
  width: 30%;
  height: 23%;
  top: 40%;
  left: 35%;
  background-color: white;
  .nes-input {
    font-size: 1.5em;
  }
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-gap: 5%;
  grid-auto-flow: column;
  font-size: 1.5vh;
`;

const StyledTitle = styled.h1`
  font-size: 5em;
  color: #f7d51d;
  text-align-last: center;
  margin-top: 10%;
  text-shadow: 4px 4px 0px #e59400;
`;

export { Container, ButtonsContainer, StyledTitle };
