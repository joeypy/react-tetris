import { useState } from 'react';
import styled from 'styled-components';

import { StartButton, Display, Stage } from './';
import bgImage from '../img/bg.png';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { checkCollision } from '../gameHelpers';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';

export const Tetris = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const { player, rotatePlayer, updatePlayerPosition, resetPlayer } = usePlayer();
  const { stage, resetStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared);

  console.log('re-render');

  const startGame = () => {
    // Reset everything
    resetStage();
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const movePlayer = (direction: number) => {
    if (!checkCollision({ player, stage, x: direction, y: 0 })) {
      updatePlayerPosition({ x: direction, y: 0 });
    }
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision({ player, stage, x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ key }: React.KeyboardEvent) => {
    if (gameOver) return;
    if (key == 'ArrowLeft') movePlayer(-1);
    if (key == 'ArrowRight') movePlayer(1);
    if (key == 'ArrowUp') rotatePlayer(stage, 1);
    if (key == 'ArrowDown') dropPlayer();
  };

  const keyUp = ({ key }: React.KeyboardEvent) => {
    if (!gameOver) {
      if (key === 'ArrowDown') {
        setDropTime(1000);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <TetrisWrapper role="button" tabIndex="0" onKeyDown={move} onKeyUp={keyUp}>
      <StyledTetris>
        {/* @ts-ignore */}
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game OVer" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} gameOver={false} />
              <Display text={`Rows: ${rows}`} gameOver={false} />
              <Display text={`Level: ${level}`} gameOver={false} />
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
