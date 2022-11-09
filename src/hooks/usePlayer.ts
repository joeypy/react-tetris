import { useCallback, useState } from 'react';
import { STAGE_WIDTH } from '../gameHelpers';
import { randomTetromino } from '../tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    collided: false,
  });

  const updatePlayerPosition = ({ x, y, collided }: any) => {
    setPlayer((prev: any) => ({ ...prev, pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) }, collided }));
  };

  const playerRotate = (stage: any, number: any) => {};

  const resetPlayer = () =>
    useCallback(() => {
      setPlayer({
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
      });
    }, []);

  return { player, playerRotate, updatePlayerPosition, resetPlayer };
};
