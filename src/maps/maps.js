const formData = (data, limits, dimensions) => {
  const width = limits.maxX - limits.minX;
  const height = limits.maxY - limits.minY;
  const scale = Math.min(dimensions.width / width, dimensions.height / height);
  const r = [];
  data.forEach((element) => {
    r.push({
      x: (element[0] - limits.minX) * scale,
      y: dimensions.height - ((element[1] - limits.minY) * scale),
    });
  });
  return r;
};

const getLimits = (data) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  if (data.length === 1) {
    data[0].forEach((point) => {
      const x = point[0];
      const y = point[1];
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
  } else {
    data.forEach((poly) => {
      poly[0].forEach((point) => {
        const x = point[0];
        const y = point[1];
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
    });
  }
  return {
    minX,
    minY,
    maxX,
    maxY,
  };
};

module.exports = { formData, getLimits };
