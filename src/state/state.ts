export interface StateModel {
  score: number;
  time: number;
}

export const initialGameState: StateModel = {
  score: 0,
  time: 500,
};

export const updateGameState = (prev: StateModel): StateModel => {
  const temp = prev;
  const newState = {
    score: temp.score += 1,
    time: temp.score % 3 === 0 ? temp.time -= 50 : temp.time,
  };
  return newState;
};

export const isGameContinue = (time: number): boolean => (time > 0);
