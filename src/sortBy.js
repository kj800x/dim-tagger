const sortBy = (...keys) => arr =>
  arr.sort((a, b) => {
    for (const key of keys) {
      if (a[key] !== b[key]) {
        return b[key].localeCompare(a[key]);
      }
    }
    return 0;
  });

export default sortBy;
