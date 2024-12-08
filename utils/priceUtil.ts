export function calculateHouseCleaningPrice(
  area: number,
  totalFreelancers: number,
  duration: number,
  totalWorkDays: number,
): number {
  const R = 75000;
  const H = duration * totalWorkDays;
  const N = totalFreelancers;
  const A = area <= 60 ? 1 : area <= 100 ? 1.1 : 1.2;
  return R * H * N * A;
}

export function calculateBabysittingPrice(
  numOfBaby: number,
  duration: number,
  totalWorkDays: number,
): number {
  const R = 60000;
  const H = duration * totalWorkDays;
  const C =
    numOfBaby == 1 ? 0 : numOfBaby == 2 ? 0.3 : 0.3 + 0.1 * (numOfBaby - 2);
  return R * H * (1 + C);
}
