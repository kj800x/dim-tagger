const not = fn => x => !fn(x);

const ArmorView = value => ({
  without: pred => ArmorView(value.filter(not(pred))),
  only: pred => ArmorView(value.filter(pred)),
  bucketBy: (...keys) => {
    const out = {};
    for (let x of value) {
      const key = keys.map(k => x[k]);
      out[key] = out[key] || [];
      out[key].push(x);
    }
    return ArmorView(out);
  },
  sortBy: (...keys) => {
    const contents = Object.values(value);
    const sortedBuckets = [];
    for (const bucket of contents) {
      sortedBuckets.push(
        bucket.sort((a, b) => {
          for (const key of keys) {
            if (a[key] !== b[key]) {
              return b[key] - a[key];
            }
          }
          return 0;
        })
      );
    }
    return ArmorView(sortedBuckets);
  },
  tagFirstInGroup: tag => {
    value.forEach(sortedBucket => {
      sortedBucket[0].Tag = tag;
    });
    return ArmorView(value);
  },
  tagRestInGroup: tag => {
    value.forEach(sortedBucket => {
      for (let i = 1; i < sortedBucket.length; i++) {
        sortedBucket[i].Tag = tag;
      }
    });
    return ArmorView(value);
  },
  tagFirstInGroupIfJunk: tag => {
    value.forEach(sortedBucket => {
      if (sortedBucket[0].Tag === "junk") {
        sortedBucket[0].Tag = tag;
      }
    });
    return ArmorView(value);
  },
  value: () => value
});

export default ArmorView;
