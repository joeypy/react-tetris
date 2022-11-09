import styled from 'styled-components';
import Cell from './Cell';

interface Props {
  stage: any[];
}

interface IStyledStage {
  width: number;
  height: number;
}

export const Stage = ({ stage }: Props) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map((row: any[]) =>
        row.map((cell: number[], x: number) => <Cell key={x} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

const StyledStage = styled.div<IStyledStage>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.height}, calc(25vw / ${(props) => props.width}));
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
`;
