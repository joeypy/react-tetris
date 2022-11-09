import { useState } from 'react';
import styled from 'styled-components';

import { StartButton, Display, Stage } from './';
import bgImage from '../img/bg.png';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

interface Props {}

export const Tetris = (props: Props) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const { player, playerRotate, updatePlayerPosition, resetPlayer } = usePlayer();
  const { stage, setStage, resetStage } = useStage();

  console.log('re-render');

  const movePlayer = (direction: number) => {};
  const startGame = () => {
    // Reset everything
    resetStage();
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPosition({ x: 0, y: 0, collided: false });
  };

  const dropPlayer = () => {
    drop();
  };



  const move = ({ key }: React.KeyboardEvent) => {
    console.log(key);
    if (gameOver) return;
    if (key == 'ArrowLeft') movePlayer(-1);
    if (key == 'ArrowRight') movePlayer(1);
    if (key == 'ArrowUp') playerRotate(stage, 1);
    if (key == 'ArrowDown') dropPlayer();
  };

  return (
    <TetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        {/* @ts-ignore */}
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game OVer" />
          ) : (
            <div>
              <Display text="Score" gameOver={false} />
              <Display text="Rows" gameOver={false} />
              <Display text="Level" gameOver={false} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </TetrisWrapper>
  );
};

const TetrisWrapper = styled.div<{ tabIndex: any }>`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`;

const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
