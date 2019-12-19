const not = fn => x => !fn(x);

const StreamView = value => ({
  without: pred => StreamView(value.filter(not(pred))),
  only: pred => StreamView(value.filter(pred)),
  bucketBy: (...keys) => {
    const out = {};
    for (let x of value) {
      const key = keys.map(k => x[k]);
      out[key] = out[key] || [];
      out[key].push(x);
    }
    return StreamView(out);
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
    return StreamView(sortedBuckets);
  },
  tagFirstInGroup: tag => {
    value.forEach(sortedBucket => {
      sortedBucket[0].Tag = tag;
    });
    return StreamView(value);
  },
  tagRestInGroup: tag => {
    value.forEach(sortedBucket => {
      for (let i = 1; i < sortedBucket.length; i++) {
        sortedBucket[i].Tag = tag;
      }
    });
    return StreamView(value);
  },
  tagFirstInGroupIfJunk: tag => {
    value.forEach(sortedBucket => {
      if (sortedBucket[0].Tag === "junk") {
        sortedBucket[0].Tag = tag;
      }
    });
    return StreamView(value);
  },
  tag: tag => {
    value.forEach(sortedBucket => {
      for (let i = 0; i < sortedBucket.length; i++) {
        sortedBucket[i].Tag = tag;
      }
    });
    return StreamView(value);
  },
  tagIf: (tag, fn) => {
    value.forEach(sortedBucket => {
      for (let i = 0; i < sortedBucket.length; i++) {
        if (fn(sortedBucket[i], i, sortedBucket)) {
          sortedBucket[i].Tag = tag;
        }
      }
    });
  },
  buckets: () => {
    return StreamView(value.map(v => [v]));
  },
  value: () => value
});

export default StreamView;
