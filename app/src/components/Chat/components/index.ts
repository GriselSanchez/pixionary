import styled from "styled-components";

const MessagesContainer = styled.div`
  overflow-y: auto;
  max-height: 500px;
`;

const MessageContainer = styled.div`
  width: 300px;
  overflow-wrap: break-word;
`;

const InputContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  margin: 10px 0;
`;

export { MessagesContainer, InputContainer, MessageContainer };
