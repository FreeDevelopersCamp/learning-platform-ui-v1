import { fakeAreaChartData } from "./constant";

function calculateAverages() {
  const total = fakeAreaChartData.reduce(
    (acc, curr) => {
      acc.Orders += curr.Orders;
      acc.Users += curr.Users;
      return acc;
    },
    { Orders: 0, Users: 0 }
  );

  const count = fakeAreaChartData.length;

  return {
    averageOrders: total.Orders / count,
    averageUsers: total.Users / count,
  };
}

const averages = calculateAverages();
