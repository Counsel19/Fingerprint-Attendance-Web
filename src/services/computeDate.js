export const getPreviousMonth = (duration) => {
  const date = new Date();
  const firstDayMonth = new Date(date.getFullYear(), date.getMonth() - duration, 1);

  const lastDayMonth = new Date(date.getFullYear(), date.getMonth() - duration, 30);

  return { firstDayMonth: firstDayMonth, lastDayMonth: lastDayMonth, monthNum: date.getMonth() - duration};
};

export const getPreviousWeek = () => {
  const date = new Date();
  const num = date.getTime() - 1000 * 60 * 60 * 24 * 7;

  const numDay = new Date(num).getDay();
  const oneWeekAgo = new Date(
    date.getFullYear(),
    new Date(num).getMonth(),
    new Date(num).getDate()
  );

  const firstDayNum = oneWeekAgo.getTime() - 1000 * 60 * 60 * 24 * numDay;
  const firstDayLastWeek = new Date(
    new Date(firstDayNum).getFullYear(),
    new Date(firstDayNum).getMonth(),
    new Date(firstDayNum).getDate()
  );

  const lastDayNum = firstDayLastWeek.getTime() + 1000 * 60 * 60 * 24 * 6;
  const lastDayLastWeek = new Date(
    new Date(lastDayNum).getFullYear(),
    new Date(lastDayNum).getMonth(),
    new Date(lastDayNum).getDate()
  );
  return {
    firstDayLastWeek: firstDayLastWeek,
    lastDayLastWeek: lastDayLastWeek,
  };
};


export const getCurrentWeek = () => {
    const currentDay = new Date();
    
    const firstDayNum = currentDay.getTime() - 1000 * 60 * 60 * 24 * currentDay.getDay();
    const firstDayCuurentWeek = new Date(
        new Date(firstDayNum).getFullYear(),
        new Date(firstDayNum).getMonth(),
        new Date(firstDayNum).getDate()
      );

      return{
          currentDay: currentDay,
          firstDayCurentWeek: firstDayCuurentWeek
      }
    
}

