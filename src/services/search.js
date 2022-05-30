export const search = (items, searchParam, q) => {
  return items.filter((item) => {

    return searchParam.some((newItem) => {
      return (
        item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      );
    });
  });
};
