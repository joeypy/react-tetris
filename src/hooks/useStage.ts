import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player: any, resetPlayer: any) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  const resetStage = () => setStage(createStage());

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = (newStage: any) =>
      newStage.reduce((ack: any, row: any) => {
        if (row.findIndex((cell: any) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage: any) => {
      // First flush the stage
      const newStage = prevStage.map((row: any) =>
        row.map((cell: any) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Then draw the tetromino
      player.tetromino.forEach((row: any, y: number) => {
        row.forEach((value: any, x: number) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      // the check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    // Here are the updates
    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return {
    stage,
    resetStage,
    rowsCleared,
  };
};
