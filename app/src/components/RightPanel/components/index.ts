import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 3%;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ScoreContainer = styled.div`
  .title {
    color: #4c1f8f;
    margin: -2.3rem 0 1rem !important;
  }
`;

export { Container, ChatContainer, ScoreContainer };
