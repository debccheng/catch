export const getRandomNumber = (): number => (Math.random() * 300);

export const getRandomColour = (): string => (
  Math.round(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
);
