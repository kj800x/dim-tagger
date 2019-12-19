const sortBy = (...keys) => arr =>
  arr.sort((a, b) => {
    for (const key of keys) {
      if (!isNaN(a[key])) {
        return parseFloat(b[key]) - parseFloat(a[key]);
      }
      if (a[key] !== b[key]) {
        return b[key].localeCompare(a[key]);
      }
    }
    return 0;
  });

export default sortBy;
