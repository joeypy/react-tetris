import { useState } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = () => {
  const [stage, setStage] = useState(createStage());

  const resetStage = () => setStage(createStage());

  return {
    stage,
    setStage,
    resetStage,
  };
};
