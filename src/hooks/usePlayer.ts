import { useCallback, useState } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { randomTetromino, TETROMINOS } from '../tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const updatePlayerPosition = ({ x, y, collided }: any) => {
    setPlayer((prev: any) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  function rotate(matrix: any, direction: any) {
    // Make the rows to become cols (transpose)
    const mtrx = matrix.map((_: any, index: any) => matrix.map((column: any) => column[index]));
    // Reverse each row to get a rotaded matrix
    if (direction > 0) return mtrx.map((row: any) => row.reverse());
    return mtrx.reverse();
  }

  function rotatePlayer(stage: any, direction: any) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision({ player: clonedPlayer, stage, x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -direction);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return { player, rotatePlayer, updatePlayerPosition, resetPlayer };
};
