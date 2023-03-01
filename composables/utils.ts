export const map = (
  value: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
) => {
  return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
};
