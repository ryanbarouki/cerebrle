import styled from "styled-components";

export const Button = styled.button`
  border-radius: 8px;
  border-style: solid;
  border-width: 0px;
  padding: 12px;
  font-size: 0.9rem;

  :active {
    background-color: darkgray;
  }

  @media (prefers-color-scheme: dark) {
    color: #DADADA;
    background-color: #1F2023;  

    :active {
      background-color: #000;
    }
  }
`;

export const HowToButton = styled(Button)`
  padding: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;