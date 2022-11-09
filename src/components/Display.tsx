import React from 'react';
import styled from 'styled-components';

interface Props {
  gameOver: boolean;
  text?: string;
}

export const Display = ({ gameOver, text }: Props) => {
  return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>;
};

const StyledDisplay = styled.div<{ gameOver: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${(props) => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`;
